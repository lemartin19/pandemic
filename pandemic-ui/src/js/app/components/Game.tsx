import '../../../css/Game.css';
import { Map } from '../../map/components/Map';

import { PlayersSidebar } from '../../players/components/PlayersSidebar';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';

export function Game() {
  const currentPlayer = useCurrentPlayer();
  const border = currentPlayer?.color && `3px solid ${currentPlayer.color}`;
  return (
    <div className="Game" style={{ border }}>
      <div className="GameMapContainer">
        <Map />
      </div>
      <PlayersSidebar />
    </div>
  );
}
