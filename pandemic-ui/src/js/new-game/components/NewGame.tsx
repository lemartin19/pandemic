import '../../../css/NewGame.css';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Deck } from '../../types/Deck';
import { Player } from '../../types/Player';
import { createInitialDecks } from '../utils/createInitialDecks';
import { createInitialPlayers } from '../utils/createInitialPlayers';
import { InitialSetup } from './InitialSetup';
import { PlayerSetup } from './PlayerSetup';

interface GameSettings {
  players: Player[];
  drawPile: Deck;
  infectionDeck: Deck;
}

export function NewGame() {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    players: [],
    drawPile: [],
    infectionDeck: [],
  });

  function handleInitialSetup(settings: {
    numberOfPlayers: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }): void {
    const initialPlayers = createInitialPlayers(settings.numberOfPlayers);
    const { players, drawPile, infectionDeck } = createInitialDecks(
      settings.difficulty,
      'normal',
      initialPlayers
    );
    setGameSettings({
      players,
      drawPile,
      infectionDeck,
    });
  }

  function handlePlayerSetup(playerSettings: { name: string; color: string }[]): void {
    const players = playerSettings.map((player) => ({
      ...player,
      hand: [],
    }));
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
