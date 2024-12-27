import {
  OUTBREAK_LIMIT,
  useInfectionsDispatch,
  useInfectionsState,
} from '../../app/store/Infections';
import { useMapState } from '../../app/store/Map';
import { Color } from '../../types/Disease';
import { Location } from '../../types/Map';

export function useInfectCity() {
  const { infections } = useInfectionsState();
  const infectionsDispatch = useInfectionsDispatch();
  const { map } = useMapState();

  const handleInfection = ({
    cityName,
    color,
    isEpidemic,
    seenCities,
  }: {
    cityName: Location;
    color: Color;
    isEpidemic?: boolean;
    seenCities: Set<Location>;
  }) => {
    const infectionCity = map.find((city) => cityName === city.name);
    if (!infectionCity) {
      throw new Error(`City ${location} not found in map.`);
    }
    if (seenCities.has(cityName)) {
      return;
    }

    const isOutbreak = infections[cityName][color] >= OUTBREAK_LIMIT;
    if (isOutbreak) {
      const newSeenCities = infectionCity.connectedCities.reduce(
        (acc, city) => acc.add(city),
        seenCities
      );
      infectionsDispatch({ type: 'outbreak' });
      for (const outbreakCityName of infectionCity.connectedCities) {
        handleInfection({ cityName: outbreakCityName, color, seenCities: newSeenCities });
      }
    } else {
      infectionsDispatch({
        type: 'infect',
        payload: { location: cityName, color, isEpidemic },
      });
    }
  };

  return ({ location, isEpidemic = false }: { location: Location; isEpidemic?: boolean }) => {
    const infectionCity = map.find((city) => city.name === location);
    if (!infectionCity) {
      throw new Error(`City ${location} not found in map.`);
    }
    const infectionColor = infectionCity.color;
    handleInfection({
      cityName: location,
      color: infectionColor,
      isEpidemic,
      seenCities: new Set(),
    });
  };
}
