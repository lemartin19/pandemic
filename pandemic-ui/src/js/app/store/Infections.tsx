import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { InfectionSaturation } from '../../types/Infections';
import { Infections } from '../../types/Infections';

type InfectionsState = {
  infections: Infections;
  infectionSaturation: InfectionSaturation;
};

type InitInfectionsAction = {
  type: 'initInfections';
  payload: InfectionsState;
};

type InfectionsActions = InitInfectionsAction;

function reducer(state: InfectionsState, action: InfectionsActions): InfectionsState {
  switch (action.type) {
    case 'initInfections':
      return action.payload;
    default:
      return state;
  }
}

const emptyState: InfectionsState = {
  infections: {},
  infectionSaturation: {
    blue: 0,
    yellow: 0,
    black: 0,
    red: 0,
  },
};
const InfectionsStateContext = createContext<InfectionsState>(emptyState);

const InfectionsDispatchContext = createContext<Dispatch<InfectionsActions>>(() => {});

export function InfectionsProvider({ children }: PropsWithChildren) {
  const [infectionsState, dispatch] = useReducer(reducer, emptyState);
  return (
    <InfectionsStateContext.Provider value={infectionsState}>
      <InfectionsDispatchContext.Provider value={dispatch}>
        {children}
      </InfectionsDispatchContext.Provider>
    </InfectionsStateContext.Provider>
  );
}

export function useInfectionsState() {
  return useContext(InfectionsStateContext);
}

export function useInfectionsDispatch() {
  return useContext(InfectionsDispatchContext);
}
