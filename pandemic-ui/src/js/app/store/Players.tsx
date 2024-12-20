import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Player } from '../../types/Player';

type PlayerState = {
  players: Player[];
};

type InitPlayersAction = {
  type: 'initPlayers';
  payload: Player[];
};

type PlayerActions = InitPlayersAction;

function reducer(state: PlayerState, action: PlayerActions): PlayerState {
  switch (action.type) {
    case 'initPlayers':
      return { players: action.payload };
    default:
      return state;
  }
}

const emptyState: PlayerState = {
  players: [],
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
