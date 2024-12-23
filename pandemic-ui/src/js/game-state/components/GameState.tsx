import '../../../css/GameState.css';

import { useState } from 'react';
import { DoTurnButton } from './DoTurnButton';
import { InfectionRate } from './InfectionRate';
import { OutbreaksLeft } from './OutbreaksLeft';

export function GameState() {
  const [__isActionModalOpen, setIsActionModalOpen] = useState(false);
  return (
    <div className="GameState">
      <div className="GameState-status">
        <InfectionRate />
        <OutbreaksLeft />
      </div>
      <DoTurnButton
        onClick={() => {
          setIsActionModalOpen(true);
        }}
      />
    </div>
  );
}
GameState.displayName = 'GameState';
