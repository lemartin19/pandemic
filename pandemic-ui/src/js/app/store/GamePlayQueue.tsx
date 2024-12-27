import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { GamePlay } from '../../types/GamePlay';

type GamePlayQueueState = {
  queue: GamePlay[];
};

type StartPlayerTurnAction = {
  type: 'queuePlayerTurns';
  payload: {
    playerNames: string[];
  };
};

type RequirePlayerDiscardAction = {
  type: 'requirePlayerDiscard';
  payload: {
    playerName: string;
  };
};

type EpidemicAction = {
  type: 'startEpidemic';
};

type NextGameplayStateAction = {
  type: 'nextGameplayState';
};

type GamePlayQueueActions =
  | StartPlayerTurnAction
  | EpidemicAction
  | NextGameplayStateAction
  | RequirePlayerDiscardAction;

function queuePlayerTurn(queue: GamePlay[], playerName: string): GamePlay[] {
  return queue.concat(
    { type: 'waitingForPlayerAction', playerName },
    { type: 'waitingForPlayerAction', playerName },
    { type: 'waitingForPlayerAction', playerName },
    { type: 'waitingForPlayerAction', playerName },
    { type: 'waitingForPlayerDraw', playerName },
    { type: 'waitingForPlayerDraw', playerName },
    { type: 'infectCities' }
  );
}

function queueEpidemic(queue: GamePlay[]): GamePlay[] {
  return [
    { type: 'startEpidemic' },
    { type: 'increaseInfectionRate' },
    { type: 'intensifyEpidemic' },
    ...queue,
  ];
}

function gamePlayQueueReducer(
  state: GamePlayQueueState,
  action: GamePlayQueueActions
): GamePlayQueueState {
  switch (action.type) {
    case 'queuePlayerTurns':
      return {
        queue: action.payload.playerNames.reduce(
          (acc, playerName) => queuePlayerTurn(acc, playerName),
          state.queue
        ),
      };
    case 'startEpidemic':
      return {
        queue: queueEpidemic(state.queue),
      };
    case 'nextGameplayState':
      return {
        queue: state.queue.slice(1),
      };
    case 'requirePlayerDiscard':
      return {
        queue: [
          { type: 'waitingForPlayerDiscard', playerName: action.payload.playerName },
          ...state.queue,
        ],
      };
    default:
      return state;
  }
}

const emptyState: GamePlayQueueState = {
  queue: [],
};

const GamePlayQueueStateContext = createContext<GamePlayQueueState>(emptyState);
const GamePlayQueueDispatchContext = createContext<Dispatch<GamePlayQueueActions>>(() => {});

export function GamePlayQueueProvider({ children }: PropsWithChildren) {
  const [gamePlayQueueState, dispatch] = useReducer(gamePlayQueueReducer, emptyState);

  return (
    <GamePlayQueueStateContext.Provider value={gamePlayQueueState}>
      <GamePlayQueueDispatchContext.Provider value={dispatch}>
        {children}
      </GamePlayQueueDispatchContext.Provider>
    </GamePlayQueueStateContext.Provider>
  );
}

export function useGamePlayQueueState() {
  return useContext(GamePlayQueueStateContext);
}

export function useGamePlayQueueDispatch() {
  return useContext(GamePlayQueueDispatchContext);
}

export function useCurrentGameplayState(): GamePlay | undefined {
  const { queue } = useGamePlayQueueState();
  return queue[0];
}
