import { Button } from '../../components/Button';
import { Player } from '../../types/Player';

export function PlayerSelect({
  value,
  onChange,
  players,
}: {
  value: Player | null;
  onChange: (player: Player | null) => void;
  players: Player[];
}) {
  return (
    <div className="PlayerSelect">
      {players.map((player) => (
        <Button
          key={player.name}
          variant={value === player ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onChange(player)}
        >
          {player.name}
        </Button>
      ))}
    </div>
  );
}
PlayerSelect.displayName = 'PlayerSelect';
