import '../../../css/Map.css';

import { useMapState } from '../../app/store/Map';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { City } from './City';

export function Map() {
  const currentPlayer = useCurrentPlayer();
  const border = currentPlayer?.color && `3px solid ${currentPlayer.color}`;
  const { map } = useMapState();

  return (
    <div className="Map" style={{ border }}>
      <div className="Map-image">
        {map.map((city) => (
          <City key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
}
Map.displayName = 'Map';
