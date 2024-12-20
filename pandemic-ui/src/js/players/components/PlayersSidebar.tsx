import '../../../css/PlayersSidebar.css';

import { usePlayerState } from '../../app/store/Players';
import { PlayerControls } from './PlayerControls';
import { PlayerEvents } from './PlayerEvents';

export function PlayersSidebar() {
  const { players } = usePlayerState();
  return (
    <div className="players-sidebar">
      {players.map((player) => (
        <PlayerControls key={player.name} player={player}>
          <PlayerEvents player={player} />
        </PlayerControls>
      ))}
    </div>
  );
}
PlayersSidebar.displayName = 'PlayersSidebar';
