import '../../../css/Game.css';
import { GameState } from '../../game-state/components/GameState';
import { Map } from '../../map/components/Map';
import { PlayersSidebar } from '../../players/components/PlayersSidebar';

export function Game() {
  return (
    <div className="Game">
      <div className="Game-vertical">
        <GameState />
        <Map />
      </div>
      <PlayersSidebar />
    </div>
  );
}
