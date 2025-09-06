import { ChangeEvent } from 'react';

export function PlayersSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (__event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="numberOfPlayers" className="font-bold">
        Number of Players
      </label>
      <select
        id="numberOfPlayers"
        name="numberOfPlayers"
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded text-base"
      >
        <option value={2}>2 Players</option>
        <option value={3}>3 Players</option>
        <option value={4}>4 Players</option>
      </select>
    </div>
  );
}
PlayersSelect.displayName = 'PlayersSelect';
