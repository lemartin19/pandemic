import { createContext, Dispatch, PropsWithChildren, useContext, useMemo, useReducer } from 'react';
import { InfectionSaturation } from '../../types/Infections';
import { Infections } from '../../types/Infections';
import { Location } from '../../types/Map';
import { Color } from '../../types/Disease';

type InfectionsState = {
  infections: Infections;
  infectionSaturation: InfectionSaturation;
  outbreaksLeft: number;
  infectionRates: number[];
  cured: { [key in Color]: boolean };
  eradicated: { [key in Color]: boolean };
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

type CureDiseaseAction = {
  type: 'cureDisease';
  payload: { color: Color };
};

type InfectionsActions =
  | InitInfectionsAction
  | IncreaseInfectionRateAction
  | TreatDiseaseAction
  | CureDiseaseAction;

function calculateEradicated(infections: Infections, color: Color) {
  return Object.values(infections).every((cityInfections) => cityInfections[color] === 0);
}

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
      if (!state.infections[location][color]) {
        return state;
      }

      const newInfectionsInCity = { ...state.infections[location] };
      const newInfectionSaturation = { ...state.infectionSaturation };
      if (treatAll) {
        newInfectionSaturation[color] += newInfectionsInCity[color];
        newInfectionsInCity[color] = 0;
      } else if (newInfectionsInCity[color] > 0) {
        newInfectionSaturation[color] += 1;
        newInfectionsInCity[color] -= 1;
      }
      const isCured = state.cured[color];
      const newInfections = { ...state.infections, [location]: newInfectionsInCity };
      const isEradicated = isCured && calculateEradicated(newInfections, color);
      const newEradicated = { ...state.eradicated, [color]: isEradicated };
      return { ...state, infections: newInfections, eradicated: newEradicated };
    }
    case 'cureDisease': {
      const { color } = action.payload;
      const newCured = { ...state.cured, [color]: true };
      const isEradicated = calculateEradicated(state.infections, color);
      const newEradicated = { ...state.eradicated, [color]: isEradicated };
      return { ...state, cured: newCured, eradicated: newEradicated };
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
  cured: {
    blue: false,
    yellow: false,
    black: false,
    red: false,
  },
  eradicated: {
    blue: false,
    yellow: false,
    black: false,
    red: false,
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

export function useInfectionsInCity(city: Location) {
  const { infections } = useInfectionsState();
  const infection = infections[city];
  if (!infection) {
    throw new Error(`Infection not found for ${city}`);
  }
  return infection;
}
