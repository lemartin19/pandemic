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
        left: `${cityPosition.x}%`,
        top: `${cityPosition.y}%`,
        backgroundColor: city.color,
      }}
    >
      <div className={`City-label ${cityPosition.labelPosition}`}>
        <div>{city.name}</div>
        <div>
          {Object.entries(infections).map(([color, count]) =>
            count ? (
              <span key={color} className="City-infections" style={{ backgroundColor: color }}>
                {count}
              </span>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
City.displayName = 'City';
