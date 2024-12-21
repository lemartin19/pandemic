import { Player as PlayerType } from '../../types/Player';

export function Player({ player }: { player: PlayerType }) {
  return (
    <svg width="10" height="10">
      <polygon points="5,0 0,10 10,10" fill={player.color} />
    </svg>
  );
}
Player.displayName = 'Player';
