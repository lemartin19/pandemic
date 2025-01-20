import { CityCard, EventCard } from '../../types/Card';
import { Deck } from '../../types/Deck';
import { GamePlay } from '../../types/GamePlay';
import { Infections, InfectionSaturation } from '../../types/Infections';
import { Map, ResearchStations } from '../../types/Map';
import { Player } from '../../types/Player';

export type SavedGame = {
  name: string;
  players: Player[];
  infections: {
    infections: Infections;
    infectionSaturation: InfectionSaturation;
    infectionRates: number[];
    outbreaksLeft: number;
    cured: {
      blue: boolean;
      yellow: boolean;
      black: boolean;
      red: boolean;
    };
    eradicated: {
      blue: boolean;
      yellow: boolean;
      black: boolean;
      red: boolean;
    };
  };
  decks: {
    drawPile: Deck;
    infectionDeck: Deck<CityCard>;
    infectionDiscard: Deck<CityCard>;
    discardPile: Deck<CityCard | EventCard>;
  };
  map: {
    map: Map;
    researchStations: ResearchStations;
  };
  gamePlayQueue: GamePlay[];
};
