import { ChangeEvent, FormEvent, useState } from 'react';
import { PlayerInput } from './PlayerInput';

export type PlayerSettings = Array<{
  name: string;
  color: string;
}>;

export function PlayerSetup({
  initialValue,
  onSubmit,
}: {
  initialValue: PlayerSettings;
  onSubmit: (__players: PlayerSettings) => void;
}) {
  const [playerSettings, setPlayerSettings] = useState<PlayerSettings>(initialValue);

  function handleInputChange(index: number, event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setPlayerSettings((prevSettings) => {
      const updatedPlayer = {
        ...prevSettings[index],
        [name]: value,
      };
      const updatedPlayers = [...prevSettings];
      updatedPlayers[index] = updatedPlayer;
      return updatedPlayers;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit(playerSettings);
  }

  return (
    <form className="player-setup-form" onSubmit={handleSubmit}>
      {playerSettings.map((player, index) => (
        <PlayerInput
          key={index}
          id={`Player ${index}`}
          player={player}
          onChange={(newPlayer) => handleInputChange(index, newPlayer)}
        />
      ))}

      <button type="submit" className="start-button">
        Start Game
      </button>
    </form>
  );
}
PlayerSetup.displayName = 'PlayerSetup';
