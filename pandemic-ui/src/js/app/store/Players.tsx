import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Player } from '../../types/Player';

type PlayerState = {
  players: Player[];
  currentPlayer: Player['name'];
};

type InitPlayersAction = {
  type: 'initPlayers';
  payload: Player[];
};

type NextPlayerAction = {
  type: 'nextPlayer';
};

type PlayerActions = InitPlayersAction | NextPlayerAction;

function reducer(state: PlayerState, action: PlayerActions): PlayerState {
  switch (action.type) {
    case 'initPlayers':
      return { players: action.payload, currentPlayer: action.payload[0].name };
    case 'nextPlayer':
      return { ...state, currentPlayer: state.players[0].name };
    default:
      return state;
  }
}

const emptyState: PlayerState = {
  players: [],
  currentPlayer: '',
};
const PlayerStateContext = createContext<PlayerState>(emptyState);

const PlayerDispatchContext = createContext<Dispatch<PlayerActions>>(() => {});

export function PlayerProvider({ children }: PropsWithChildren) {
  const [playerState, dispatch] = useReducer(reducer, emptyState);
  return (
    <PlayerStateContext.Provider value={playerState}>
      <PlayerDispatchContext.Provider value={dispatch}>{children}</PlayerDispatchContext.Provider>
    </PlayerStateContext.Provider>
  );
}

export function usePlayerState() {
  return useContext(PlayerStateContext);
}

export function usePlayerDispatch() {
  return useContext(PlayerDispatchContext);
}
