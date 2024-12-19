import { FormEvent, useState } from 'react';
import { ChangeEvent } from 'react';
import { DifficultySelect } from './DifficultySelect';
import { PlayersSelect } from './PlayersSelect';

type Difficulty = 'easy' | 'medium' | 'hard';

interface InitialSettings {
  numberOfPlayers: number;
  difficulty: Difficulty;
  version: 'normal';
}

function transformValueBasedKey<Key extends keyof InitialSettings>(
  key: Key,
  value: string
): InitialSettings[Key] {
  if (key === 'numberOfPlayers') {
    return Number(value) as InitialSettings[Key];
  }
  if (key === 'difficulty') {
    return value as InitialSettings[Key];
  }
  throw new Error(`Unknown key: ${key}`);
}

export function InitialSetup({ onSubmit }: { onSubmit: (settings: InitialSettings) => void }) {
  const [gameSettings, setGameSettings] = useState<InitialSettings>({
    numberOfPlayers: 2,
    difficulty: 'medium',
    version: 'normal',
  });

  function handleInputChange(event: ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = event.target;
    const key = name as keyof InitialSettings;
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      [name]: transformValueBasedKey(key, value),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit(gameSettings);
  }

  return (
    <form className="new-game-form" onSubmit={handleSubmit}>
      <PlayersSelect value={gameSettings.numberOfPlayers} onChange={handleInputChange} />
      <DifficultySelect value={gameSettings.difficulty} onChange={handleInputChange} />

      <button type="submit" className="start-button">
        Start Game
      </button>
    </form>
  );
}
InitialSetup.displayName = 'InitialSetup';
