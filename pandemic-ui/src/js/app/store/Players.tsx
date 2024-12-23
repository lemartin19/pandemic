import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Player } from '../../types/Player';
import { Location } from '../../types/Map';
import { CityCard, EventCard } from '../../types/Card';
import { Deck } from '../../types/Deck';

type PlayerState = {
  players: Player[];
};

type InitPlayersAction = {
  type: 'initPlayers';
  payload: Player[];
};

type RemoveFromHandAction = {
  type: 'removeFromHand';
  payload: { playerName: string; cards: Deck<CityCard | EventCard> };
};

type PlayerActions = InitPlayersAction | RemoveFromHandAction;

function reducer(state: PlayerState, action: PlayerActions): PlayerState {
  switch (action.type) {
    case 'initPlayers':
      return { players: action.payload };
    case 'removeFromHand':
      return {
        ...state,
        players: state.players.map((player) => {
          return player.name === action.payload.playerName
            ? {
                ...player,
                hand: player.hand.filter(
                  (card) => !action.payload.cards.some((c) => c.name === card.name)
                ),
              }
            : player;
        }),
      };
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

export function usePlayersInCity(location: Location) {
  const { players } = usePlayerState();
  return players.filter((player) => player.currentLocation === location);
}

export function usePlayer(playerName: string) {
  const { players } = usePlayerState();
  return players.find((player) => player.name === playerName);
}
