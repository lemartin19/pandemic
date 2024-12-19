import { ChangeEvent } from 'react';

export function PlayerInput({
  id,
  player,
  onChange,
}: {
  id: string;
  player: {
    name: string;
    color: string;
  };
  onChange: (__event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id}>{id}</label>
      <input type="text" id={id} value={player.name} onChange={onChange} />
      <input type="color" id={id} value={player.color} onChange={onChange} />
    </div>
  );
}
