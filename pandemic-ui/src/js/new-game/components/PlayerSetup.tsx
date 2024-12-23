import { ChangeEvent, FormEvent, useState } from 'react';
import { Player } from '../../types/Player';
import { PlayerInput } from './PlayerInput';
import { Button } from '../../components/Button';

export type PlayerSettings = Array<Pick<Player, 'name' | 'color'>>;

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
          player={player}
          onChange={(newPlayer) => handleInputChange(index, newPlayer)}
        />
      ))}

      <Button type="submit" className="start-button">
        Start Game
      </Button>
    </form>
  );
}
PlayerSetup.displayName = 'PlayerSetup';
