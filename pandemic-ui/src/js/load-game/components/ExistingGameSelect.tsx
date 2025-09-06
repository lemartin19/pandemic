import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useLoadGame } from '../hooks/useLoadGame';
import { getSavedGames } from '../utils/savedGamesLocalStorage';

export function ExistingGameSelect() {
  const savedGames = getSavedGames(true);
  const { loadGame } = useLoadGame();
  const navigate = useNavigate();

  const gameNames = Object.keys(savedGames);
  const [selectedGameName, setSelectedGameName] = useState<string | undefined>(gameNames[0]);
  const selectedGame = selectedGameName && savedGames[selectedGameName];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="gameName" className="font-bold">
        Game Name
      </label>
      <select
        id="gameName"
        name="gameName"
        value={selectedGameName}
        onChange={(e) => setSelectedGameName(e.target.value)}
        className="p-2 border border-gray-300 rounded text-base"
      >
        {gameNames.map((gameName) => (
          <option key={gameName} value={gameName}>
            {gameName}
          </option>
        ))}
      </select>
      <Button
        disabled={!selectedGame}
        onClick={() => {
          if (selectedGame) {
            loadGame(selectedGame);
            navigate('/game');
          }
        }}
      >
        Load Game
      </Button>
    </div>
  );
}
ExistingGameSelect.displayName = 'ExistingGameSelect';
