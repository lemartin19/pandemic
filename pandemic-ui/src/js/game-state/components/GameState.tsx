import { GamePlayQueue } from './GamePlayQueue';
import { GameStateButton } from './GameStateButton';
import { InfectionRate } from './InfectionRate';
import { OutbreaksLeft } from './OutbreaksLeft';

export function GameState() {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex gap-4">
        <InfectionRate />
        <OutbreaksLeft />
      </div>
      <div className="flex flex-col gap-2">
        <GameStateButton />
        <GamePlayQueue />
      </div>
    </div>
  );
}
GameState.displayName = 'GameState';
