import { GameState } from '../../game-state/components/GameState';
import { Map } from '../../map/components/Map';
import { PlayersSidebar } from '../../players/components/PlayersSidebar';

export function Game() {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="flex flex-col flex-grow">
        <GameState />
        <Map />
      </div>
      <PlayersSidebar />
    </div>
  );
}
