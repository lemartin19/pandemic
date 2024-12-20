import '../../../css/Map.css';

import { useMapState } from '../../app/store/Map';
import { City } from './City';

export function Map() {
  const { map } = useMapState();
  return (
    <div className="Map">
      <div className="Map-image">
        {map.map((city) => (
          <City key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
}
Map.displayName = 'Map';
