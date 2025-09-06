import { ChangeEvent } from 'react';

export function PlayerInput({
  player,
  onChange,
}: {
  player: {
    name: string;
    color: string;
  };
  onChange: (__event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        id={player.name}
        name="name"
        value={player.name}
        onChange={onChange}
        className={`p-2 border ${!player.name ? 'border-red-500' : 'border-gray-300'} rounded text-base`}
      />
      <input
        type="color"
        id={player.name}
        name="color"
        value={player.color}
        onChange={onChange}
        className="rounded text-base"
      />
    </div>
  );
}
