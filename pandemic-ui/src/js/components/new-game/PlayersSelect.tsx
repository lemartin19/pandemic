import { ChangeEvent } from 'react';

export function PlayersSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="form-group">
      <label htmlFor="numberOfPlayers">Number of Players</label>
      <select id="numberOfPlayers" name="numberOfPlayers" value={value} onChange={onChange}>
        <option value={2}>2 Players</option>
        <option value={3}>3 Players</option>
        <option value={4}>4 Players</option>
      </select>
    </div>
  );
}
PlayersSelect.displayName = 'PlayersSelect';
