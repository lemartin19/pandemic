import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Location, Map, ResearchStations } from '../../types/Map';

type MapState = {
  map: Map;
  researchStations: ResearchStations;
};

type InitMapAction = {
  type: 'initMap';
  payload: MapState;
};

type BuildResearchStationAction = {
  type: 'buildResearchStation';
  payload: { location: Location };
};

type MapActions = InitMapAction | BuildResearchStationAction;

function mapReducer(state: MapState, action: MapActions): MapState {
  switch (action.type) {
    case 'initMap':
      return action.payload;
    case 'buildResearchStation':
      return {
        ...state,
        researchStations: [...state.researchStations, action.payload.location],
      };
    default:
      return state;
  }
}

const emptyState: MapState = {
  map: [],
  researchStations: [],
};

const MapStateContext = createContext<MapState>(emptyState);
const MapDispatchContext = createContext<Dispatch<MapActions>>(() => {});

export function MapProvider({ children }: PropsWithChildren) {
  const [mapState, dispatch] = useReducer(mapReducer, emptyState);

  return (
    <MapStateContext.Provider value={mapState}>
      <MapDispatchContext.Provider value={dispatch}>{children}</MapDispatchContext.Provider>
    </MapStateContext.Provider>
  );
}

export function useMapState() {
  return useContext(MapStateContext);
}

export function useMapDispatch() {
  return useContext(MapDispatchContext);
}

export function useHasResearchStation(city: Location) {
  const { researchStations } = useMapState();
  return researchStations.includes(city);
}

export function useConnectedCities(location: Location) {
  const { map } = useMapState();
  const city = map.find((l) => l.name === location);
  if (!city) return [];
  return city.connectedCities;
}
