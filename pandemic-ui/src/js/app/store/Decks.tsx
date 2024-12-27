import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Deck } from '../../types/Deck';
import { CityCard, EventCard } from '../../types/Card';

type DecksState = {
  drawPile: Deck;
  discardPile: Deck;
  infectionDeck: Deck<CityCard>;
  infectionDiscard: Deck<CityCard>;
};

type InitDecksAction = {
  type: 'initDecks';
  payload: DecksState;
};

type PlayerDrawAction = {
  type: 'playerDraw';
};

type InfectionDrawAction = {
  type: 'infectionDraw';
  fromBottom?: boolean;
};

type DiscardAction = {
  type: 'discard';
  payload: Deck<CityCard | EventCard>;
};

type DecksActions = InitDecksAction | PlayerDrawAction | InfectionDrawAction | DiscardAction;

function decksReducer(state: DecksState, action: DecksActions): DecksState {
  switch (action.type) {
    case 'initDecks':
      return action.payload;
    case 'playerDraw':
      return {
        ...state,
        drawPile: state.drawPile.slice(1),
      };
    case 'infectionDraw':
      const newInfectionDeck = [...state.infectionDeck];
      const drawnCard = action.fromBottom ? newInfectionDeck.pop() : newInfectionDeck.shift();
      if (!drawnCard) {
        throw new Error('Infection deck is empty');
      }
      return {
        ...state,
        infectionDeck: newInfectionDeck,
        infectionDiscard: [drawnCard, ...state.infectionDiscard],
      };
    case 'discard':
      return {
        ...state,
        discardPile: [...state.discardPile, ...action.payload],
      };
    default:
      return state;
  }
}

const emptyState: DecksState = {
  drawPile: [],
  discardPile: [],
  infectionDeck: [],
  infectionDiscard: [],
};

const DecksStateContext = createContext<DecksState>(emptyState);
const DecksDispatchContext = createContext<Dispatch<DecksActions>>(() => {});

export function DecksProvider({ children }: PropsWithChildren) {
  const [decksState, dispatch] = useReducer(decksReducer, emptyState);

  return (
    <DecksStateContext.Provider value={decksState}>
      <DecksDispatchContext.Provider value={dispatch}>{children}</DecksDispatchContext.Provider>
    </DecksStateContext.Provider>
  );
}

export function useDecksState() {
  return useContext(DecksStateContext);
}

export function useDecksDispatch() {
  return useContext(DecksDispatchContext);
}
