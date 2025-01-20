import { usePlayerState } from '../../app/store/Players';
import { PlayerControls } from './PlayerControls';
import { PlayerHand } from './PlayerHand';

export function PlayersSidebar() {
  const { players } = usePlayerState();
  return (
    <div className="PlayersSidebar">
      {players.map((player) => (
        <PlayerControls key={player.name} player={player}>
          <PlayerHand hand={player.hand} />
        </PlayerControls>
      ))}
    </div>
  );
}
PlayersSidebar.displayName = 'PlayersSidebar';
