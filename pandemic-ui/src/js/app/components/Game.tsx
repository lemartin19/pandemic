import '../../../css/Game.css';

import { PlayersSidebar } from '../../players/components/PlayersSidebar';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';

export function Game() {
  const currentPlayer = useCurrentPlayer();
  const border = currentPlayer?.color && `3px solid ${currentPlayer.color}`;
  return (
    <div className="Game" style={{ border }}>
      <PlayersSidebar />
    </div>
  );
}
