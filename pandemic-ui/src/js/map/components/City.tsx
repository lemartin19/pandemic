import { useInfectionsState } from '../../app/store/Infections';
import { City as CityType, Location } from '../../types/Map';
import { CITY_POSITIONS } from '../constants/cityPositions';

function useInfectionsInCity(city: Location) {
  const { infections } = useInfectionsState();
  const infection = infections[city];
  if (!infection) {
    throw new Error(`Infection not found for ${city}`);
  }
  return infection;
}

export function City({ city }: { city: CityType }) {
  const infections = useInfectionsInCity(city.name);
  const cityPosition = CITY_POSITIONS[city.name as keyof typeof CITY_POSITIONS];
  if (!cityPosition) {
    throw new Error(`City position not found for ${city.name}`);
  }

  return (
    <div
      className="City"
      style={{
        left: `${cityPosition[0]}%`,
        top: `${cityPosition[1]}%`,
        backgroundColor: city.color,
      }}
    >
      <div className="City-label">{city.name}</div>
      {Object.entries(infections).map(([color, count]) =>
        count ? (
          <div key={color} className="City-infection" style={{ backgroundColor: color }}>
            {count}
          </div>
        ) : null
      )}
    </div>
  );
}
City.displayName = 'City';
