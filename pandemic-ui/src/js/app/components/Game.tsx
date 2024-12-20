import '../../../css/Game.css';
import { Map } from '../../map/components/Map';

import { PlayersSidebar } from '../../players/components/PlayersSidebar';

export function Game() {
  return (
    <div className="Game">
      <Map />
      <PlayersSidebar />
    </div>
  );
}
