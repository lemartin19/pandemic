import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { InfectionSaturation } from '../../types/Infections';
import { Infections } from '../../types/Infections';
import { Location } from '../../types/Map';
import { Color } from '../../types/Disease';

type InfectionsState = {
  infections: Infections;
  infectionSaturation: InfectionSaturation;
  outbreaksLeft: number;
  infectionRates: number[];
};

type InitInfectionsAction = {
  type: 'initInfections';
  payload: InfectionsState;
};

type TreatDiseaseAction = {
  type: 'treatDisease';
  payload: { location: Location; color: Color; treatAll?: boolean };
};

type IncreaseInfectionRateAction = {
  type: 'increaseInfectionRate';
};

type InfectionsActions = InitInfectionsAction | IncreaseInfectionRateAction | TreatDiseaseAction;

function reducer(state: InfectionsState, action: InfectionsActions): InfectionsState {
  switch (action.type) {
    case 'initInfections':
      return action.payload;
    case 'increaseInfectionRate':
      return {
        ...state,
        infectionRates: state.infectionRates.slice(1),
      };
    case 'treatDisease': {
      const { location, color, treatAll } = action.payload;
      if (!state.infections[location][color]) return state;

      const newInfections = { ...state.infections };
      const newInfectionSaturation = { ...state.infectionSaturation };
      if (treatAll) {
        newInfectionSaturation[color] += newInfections[location][color];
        newInfections[location][color] = 0;
      } else {
        newInfectionSaturation[color] += 1;
        newInfections[location][color] -= 1;
      }
      return { ...state, infections: newInfections };
    }
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
  outbreaksLeft: 0,
  infectionRates: [],
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

export function useInfectionsInCity(city: Location) {
  const { infections } = useInfectionsState();
  const infection = infections[city];
  if (!infection) {
    throw new Error(`Infection not found for ${city}`);
  }
  return infection;
}
