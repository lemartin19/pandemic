import { useState } from 'react';
import { useInfectionsInCity } from '../../app/store/Infections';
import { useHasResearchStation } from '../../app/store/Map';
import { usePlayersInCity } from '../../app/store/Players';
import { City as CityType } from '../../types/Map';
import { CITY_POSITIONS } from '../constants/cityPositions';
import { Connections } from './Connections';
import { Infection } from './Infection';
import { Player } from './Player';

const getLabelPositionClass = (labelPosition: 'top' | 'bottom' | 'left' | 'right') => {
  switch (labelPosition) {
    case 'top':
      return '-top-6 left-1/2 -translate-x-1/2';
    case 'bottom':
      return '-bottom-6 left-1/2 -translate-x-1/2';
    case 'left':
      return 'top-1/2 -translate-y-1/2 -left-2 -translate-x-full';
    case 'right':
      return 'top-1/2 -translate-y-1/2 -right-1 translate-x-full';
    default:
      return 'top-1/2 -translate-y-1/2 -translate-x-1/2';
  }
};

export function City({ city }: { city: CityType }) {
  const [isHovered, setIsHovered] = useState(false);
  const hasResearchStation = useHasResearchStation(city.name);
  const infections = useInfectionsInCity(city.name);
  const players = usePlayersInCity(city.name);
  const cityPosition = CITY_POSITIONS[city.name as keyof typeof CITY_POSITIONS];
  if (!cityPosition) {
    throw new Error(`City position not found for ${city.name}`);
  }

  const cityClasses = hasResearchStation ? 'bg-white border-4 box-border' : '';

  const cityStyle = hasResearchStation
    ? { borderColor: city.color }
    : { backgroundColor: city.color };

  return (
    <>
      <Connections city={city} highlight={isHovered} />
      <div
        className={`absolute w-4 h-4 rounded-full cursor-pointer ${cityClasses} -translate-y-1/2 -translate-x-1/2`}
        style={{
          left: `${cityPosition.x}%`,
          top: `${cityPosition.y}%`,
          zIndex: 1,
          ...cityStyle,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex flex-col items-center absolute text-xs font-semibold px-1 py-0.5 rounded whitespace-nowrap ${getLabelPositionClass(
            cityPosition.labelPosition
          )}`}
        >
          <div>{city.name}</div>
          <div>
            {Object.entries(infections).map(([color, count]) => (
              <Infection key={color} color={color} count={count} />
            ))}
          </div>
          <div className="flex gap-1">
            {players.map((player) => (
              <Player key={player.name} player={player} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
City.displayName = 'City';
