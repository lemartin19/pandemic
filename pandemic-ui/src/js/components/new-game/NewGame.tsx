import { useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import '../../../css/NewGame.css';
import { Deck } from '../../types/Deck';
import { Player } from '../../types/Player';
import { InitialSetup } from './InitialSetup';
import { createInitialPlayers } from './utils/createInitialPlayers';
import { createInitialDeck } from './utils/createInitialDeck';

interface GameSettings {
  players: Player[];
  playerDeck: Deck;
}

export function NewGame() {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    players: [],
    playerDeck: [],
  });

  function handleSubmit(settings: {
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

  return (
    <div className="new-game-container">
      <h2>Start a new game</h2>
      <Routes>
        <Route path="/" element={<InitialSetup onSubmit={handleSubmit} />} />
      </Routes>
    </div>
  );
}
NewGame.displayName = 'NewGame';
