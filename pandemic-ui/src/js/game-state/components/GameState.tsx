import '../../../css/GameState.css';

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
      <GameStateButton />
    </div>
  );
}
GameState.displayName = 'GameState';
