import { useMapState } from '../../app/store/Map';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { City } from './City';
// @ts-expect-error image is not typed
import MapImage from '../../../images/map.png';

export function Map() {
  const currentPlayer = useCurrentPlayer();
  const border = currentPlayer?.color && `3px solid ${currentPlayer.color}`;
  const { map } = useMapState();

  return (
    <div className="relative" style={{ border }}>
      <div
        className="relative w-full bg-center bg-no-repeat"
        style={{
          aspectRatio: '2/1',
          backgroundSize: '100%',
          backgroundImage: `url(${MapImage})`,
        }}
      >
        {map.map((city) => (
          <City key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
}
Map.displayName = 'Map';
