import { GamePlayQueue } from './GamePlayQueue';
import { GameStateButton } from './GameStateButton';
import { InfectionRate } from './InfectionRate';
import { OutbreaksLeft } from './OutbreaksLeft';

export function GameState() {
  return (
    <div className="flex items-center px-10 py-2 flex-row gap-8">
      <div className="flex flex-col items-center gap-4">
        <InfectionRate />
        <OutbreaksLeft />
      </div>
      <div className="flex gap-2 p-2">
        <GameStateButton />
        <GamePlayQueue />
      </div>
    </div>
  );
}
GameState.displayName = 'GameState';
