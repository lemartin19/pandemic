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
    <div className="PlayerInput">
      <label htmlFor={player.name}>{player.name}</label>
      <input type="text" id={player.name} name="name" value={player.name} onChange={onChange} />
      <input type="color" id={player.name} name="color" value={player.color} onChange={onChange} />
    </div>
  );
}
