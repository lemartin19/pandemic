import '../../../css/NewGame.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { PlayersSelect } from './PlayersSelect';
import { DifficultySelect } from './DifficultySelect';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GameSettings {
  numberOfPlayers: number;
  difficulty: Difficulty;
}

function transformValueBasedKey<Key extends keyof GameSettings>(
  key: Key,
  value: string
): GameSettings[Key] {
  if (key === 'numberOfPlayers') {
    return Number(value) as GameSettings[Key];
  }
  if (key === 'difficulty') {
    return value as GameSettings[Key];
  }
  throw new Error(`Unknown key: ${key}`);
}

export function NewGame() {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    numberOfPlayers: 2,
    difficulty: 'medium',
  });

  function handleInputChange(event: ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = event.target;
    const key = name as keyof GameSettings;
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      [name]: transformValueBasedKey(key, value),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // TODO: Add logic to start the game with the selected settings
  }

  return (
    <div className="new-game-container">
      <h2>Start a new game</h2>
      <form className="new-game-form" onSubmit={handleSubmit}>
        <PlayersSelect value={gameSettings.numberOfPlayers} onChange={handleInputChange} />
        <DifficultySelect value={gameSettings.difficulty} onChange={handleInputChange} />

        <button type="submit" className="start-button">
          Start Game
        </button>
      </form>
    </div>
  );
}
NewGame.displayName = 'NewGame';
