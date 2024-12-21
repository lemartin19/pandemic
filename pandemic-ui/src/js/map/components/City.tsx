import { useInfectionsInCity } from '../../app/store/Infections';
import { useHasResearchStation } from '../../app/store/Map';
import { City as CityType } from '../../types/Map';
import { CITY_POSITIONS } from '../constants/cityPositions';

export function City({ city }: { city: CityType }) {
  const hasResearchStation = useHasResearchStation(city.name);
  const infections = useInfectionsInCity(city.name);
  const cityPosition = CITY_POSITIONS[city.name as keyof typeof CITY_POSITIONS];
  if (!cityPosition) {
    throw new Error(`City position not found for ${city.name}`);
  }

  const cityStyling = hasResearchStation
    ? {
        backgroundColor: 'white',
        border: `4px solid ${city.color}`,
        boxSizing: 'border-box' as const,
      }
    : {
        backgroundColor: city.color,
      };

  return (
    <div
      className="City"
      style={{
        left: `${cityPosition.x}%`,
        top: `${cityPosition.y}%`,
        ...cityStyling,
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
