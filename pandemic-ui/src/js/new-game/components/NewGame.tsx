import '../../../css/NewGame.css';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Deck } from '../../types/Deck';
import { Infections, InfectionSaturation } from '../../types/Infections';
import { Map } from '../../types/Map';
import { Player } from '../../types/Player';
import { createInitialDecks } from '../utils/createInitialDecks';
import { createInitialInfections } from '../utils/createInitialInfections';
import { createInitialMap } from '../utils/createInitialMap';
import { createInitialPlayers } from '../utils/createInitialPlayers';
import { InitialSetup } from './InitialSetup';
import { PlayerSetup } from './PlayerSetup';

interface GameSettings {
  players: Player[];
  drawPile: Deck;
  infectionDeck: Deck;
  map: Map;
  infections: Infections;
  infectionDiscard: Deck;
  infectionSaturation: InfectionSaturation;
}

const initialGameSettings: GameSettings = {
  players: [],
  drawPile: [],
  infectionDeck: [],
  map: [],
  infections: {},
  infectionDiscard: [],
  infectionSaturation: {
    red: 0,
    blue: 0,
    yellow: 0,
    black: 0,
  },
};

export function NewGame() {
  const [gameSettings, setGameSettings] = useState<GameSettings>(initialGameSettings);

  function handleInitialSetup(settings: {
    numberOfPlayers: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }): void {
    const initialPlayers = createInitialPlayers(settings.numberOfPlayers);
    const { players, drawPile, infectionDeck } = createInitialDecks(
      settings.difficulty,
      'basic',
      initialPlayers
    );
    const map = createInitialMap('basic');
    const { infections, infectionDiscard, infectionSaturation } = createInitialInfections(
      map,
      infectionDeck
    );
    setGameSettings({
      players,
      drawPile,
      infectionDeck,
      map,
      infections,
      infectionDiscard,
      infectionSaturation,
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
