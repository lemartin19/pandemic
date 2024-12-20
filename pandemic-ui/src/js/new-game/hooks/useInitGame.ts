import { useState } from 'react';
import { useDecksDispatch } from '../../app/store/Decks';
import { useInfectionsDispatch } from '../../app/store/Infections';
import { useMapDispatch } from '../../app/store/Map';
import { usePlayerDispatch } from '../../app/store/Players';
import { CityCard } from '../../types/Card';
import { Deck } from '../../types/Deck';
import { Infections, InfectionSaturation } from '../../types/Infections';
import { Map, ResearchStations } from '../../types/Map';
import { Player } from '../../types/Player';

type GameSettings = {
  players: Player[];
  drawPile: Deck;
  infectionDeck: Deck<CityCard>;
  map: Map;
  infections: Infections;
  infectionDiscard: Deck<CityCard>;
  infectionSaturation: InfectionSaturation;
  researchStations: ResearchStations;
};

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
  researchStations: [],
};

export function useInitGame() {
  const [gameSettings, setGameSettings] = useState<GameSettings>(initialGameSettings);
  const playerDispatch = usePlayerDispatch();
  const infectionsDispatch = useInfectionsDispatch();
  const decksDispatch = useDecksDispatch();
  const mapDispatch = useMapDispatch();

  function initGame(settingOverrides: Partial<GameSettings>) {
    const finalGameSettings = {
      ...gameSettings,
      ...settingOverrides,
    };

    playerDispatch({ type: 'initPlayers', payload: finalGameSettings.players });
    infectionsDispatch({
      type: 'initInfections',
      payload: {
        infections: finalGameSettings.infections,
        infectionSaturation: finalGameSettings.infectionSaturation,
      },
    });
    decksDispatch({
      type: 'initDecks',
      payload: {
        drawPile: finalGameSettings.drawPile,
        infectionDeck: finalGameSettings.infectionDeck,
        infectionDiscard: finalGameSettings.infectionDiscard,
        discardPile: [],
      },
    });
    mapDispatch({
      type: 'initMap',
      payload: { map: finalGameSettings.map, researchStations: finalGameSettings.researchStations },
    });
  }

  return { gameSettings, setGameSettings, initGame };
}
