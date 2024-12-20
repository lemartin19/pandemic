import { City as CityType } from '../../types/Map';
import { CITY_POSITIONS } from '../constants/cityPositions';

export function City({ city }: { city: CityType }) {
  const cityPosition = CITY_POSITIONS[city.name as keyof typeof CITY_POSITIONS];
  if (!cityPosition) {
    throw new Error(`City position not found for ${city.name}`);
  }

  return (
    <>
      <div
        className="City"
        style={{
          left: `${cityPosition[0]}%`,
          top: `${cityPosition[1]}%`,
          backgroundColor: city.color,
        }}
      >
        <div className="City-label">{city.name}</div>
      </div>
    </>
  );
}
City.displayName = 'City';
