import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { GamePlay } from '../../types/GamePlay';

type GamePlayQueueState = {
  queue: GamePlay[];
};

type StartPlayerTurnAction = {
  type: 'startPlayerTurn';
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

type GamePlayQueueActions = StartPlayerTurnAction | EpidemicAction | NextGameplayStateAction;

function queuePlayerTurn(queue: GamePlay[], playerName: string): GamePlay[] {
  return [
    ...queue,
    { type: 'waitingForPlayerAction', playerName },
    { type: 'waitingForPlayerAction', playerName },
    { type: 'waitingForPlayerAction', playerName },
    { type: 'waitingForPlayerAction', playerName },
    { type: 'waitingForPlayerDraw', playerName },
    { type: 'infectCities' },
  ];
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
    case 'startPlayerTurn':
      return {
        queue: queuePlayerTurn(state.queue, action.payload.playerName),
      };
    case 'startEpidemic':
      return {
        queue: queueEpidemic(state.queue),
      };
    case 'nextGameplayState':
      return {
        queue: state.queue.slice(1),
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
