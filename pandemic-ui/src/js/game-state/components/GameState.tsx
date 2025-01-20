import { GamePlayQueue } from './GamePlayQueue';
import { GameStateButton } from './GameStateButton';
import { InfectionRate } from './InfectionRate';
import { OutbreaksLeft } from './OutbreaksLeft';

export function GameState() {
  return (
    <div className="GameState">
      <div className="GameState-status">
        <InfectionRate />
        <OutbreaksLeft />
      </div>
      <div className="GameState-queue">
        <GameStateButton />
        <GamePlayQueue />
      </div>
    </div>
  );
}
GameState.displayName = 'GameState';
