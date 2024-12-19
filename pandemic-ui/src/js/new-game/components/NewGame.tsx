import '../../../css/NewGame.css';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Deck } from '../../types/Deck';
import { Player } from '../../types/Player';
import { createInitialDeck } from '../utils/createInitialDeck';
import { createInitialPlayers } from '../utils/createInitialPlayers';
import { InitialSetup } from './InitialSetup';
import { PlayerSetup } from './PlayerSetup';

interface GameSettings {
  players: Player[];
  playerDeck: Deck;
}

export function NewGame() {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    players: [],
    playerDeck: [],
  });

  function handleInitialSetup(settings: {
    numberOfPlayers: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }): void {
    const players = createInitialPlayers(settings.numberOfPlayers);
    const playerDeck = createInitialDeck(settings.difficulty, 'normal');
    setGameSettings({
      players,
      playerDeck,
    });
  }

  function handlePlayerSetup(players: Player[]): void {
    setGameSettings((prevSettings) => ({
      ...prevSettings,
      players,
    }));
  }

  return (
    <div className="new-game-container">
      <h2>Start a new game</h2>
      <Routes>
        <Route path="/" element={<InitialSetup onSubmit={handleInitialSetup} />} />
        <Route
          path="/player-setup"
          element={<PlayerSetup initialValue={gameSettings.players} onSubmit={handlePlayerSetup} />}
        />
      </Routes>
    </div>
  );
}
NewGame.displayName = 'NewGame';
