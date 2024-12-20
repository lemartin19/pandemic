import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Deck } from '../../types/Deck';
import { CityCard } from '../../types/Card';

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

type DecksActions = InitDecksAction;

function decksReducer(state: DecksState, action: DecksActions): DecksState {
  switch (action.type) {
    case 'initDecks':
      return action.payload;
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
