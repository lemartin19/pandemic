import { useState } from 'react';
import { useInfectionsInCity } from '../../app/store/Infections';
import { useHasResearchStation } from '../../app/store/Map';
import { usePlayersInCity } from '../../app/store/Players';
import { City as CityType } from '../../types/Map';
import { CITY_POSITIONS } from '../constants/cityPositions';
import { Connections } from './Connections';
import { Infection } from './Infection';
import { Player } from './Player';

export function City({ city }: { city: CityType }) {
  const [isHovered, setIsHovered] = useState(false);
  const hasResearchStation = useHasResearchStation(city.name);
  const infections = useInfectionsInCity(city.name);
  const players = usePlayersInCity(city.name);
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
    <>
      <div
        className="City"
        style={{
          left: `${cityPosition.x}%`,
          top: `${cityPosition.y}%`,
          ...cityStyling,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`City-label ${cityPosition.labelPosition}`}>
          <div>{city.name}</div>
          <div>
            {Object.entries(infections).map(([color, count]) => (
              <Infection key={color} color={color} count={count} />
            ))}
          </div>
          <div className="City-players">
            {players.map((player) => (
              <Player key={player.name} player={player} />
            ))}
          </div>
        </div>
      </div>
      <Connections city={city} highlight={isHovered} />
    </>
  );
}
City.displayName = 'City';
