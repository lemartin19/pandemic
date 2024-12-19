import '../../css/NewGame.css';
import { ChangeEvent, FormEvent, useState } from 'react';

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
    console.log('Starting game with settings:', gameSettings);
  }

  return (
    <div className="new-game-container">
      <h2>Start a new game</h2>
      <form className="new-game-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players</label>
          <select
            id="numberOfPlayers"
            name="numberOfPlayers"
            value={gameSettings.numberOfPlayers}
            onChange={handleInputChange}
          >
            <option value={2}>2 Players</option>
            <option value={3}>3 Players</option>
            <option value={4}>4 Players</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={gameSettings.difficulty}
            onChange={handleInputChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button type="submit" className="start-button">
          Start Game
        </button>
      </form>
    </div>
  );
}
NewGame.displayName = 'NewGame';
