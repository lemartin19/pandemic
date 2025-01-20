import { Deck } from '../../types/Deck';
import { Player } from '../../types/Player';
import { TEST_GAME_1 } from '../constants/testGame1';
import { SavedGame } from '../types/SavedGame';

const SAVED_GAMES_KEY = 'Pandemic:SaveGames';

const isSavedDeck = (deck: unknown): deck is Deck => {
  return (
    deck !== null &&
    Array.isArray(deck) &&
    deck.every(
      (card) =>
        typeof card === 'object' &&
        card !== null &&
        ['city', 'event', 'epidemic'].includes(card.type)
    )
  );
};

const isSavedPlayers = (players: unknown): players is Player[] => {
  return (
    Array.isArray(players) &&
    players.every(
      (player) =>
        typeof player === 'object' &&
        typeof player.name === 'string' &&
        typeof player.color === 'string' &&
        isSavedDeck(player.hand) &&
        typeof player.currentLocation === 'string'
    )
  );
};

const isSavedInfections = (infections: unknown): infections is SavedGame['infections'] => {
  const typedInfections = infections as SavedGame['infections'];
  return (
    typeof infections === 'object' &&
    infections !== null &&
    Object.values(typedInfections.infections).every((cityInfections) =>
      Object.values(cityInfections).every((infectionCount) => typeof infectionCount === 'number')
    ) &&
    typeof typedInfections.outbreaksLeft === 'number' &&
    typedInfections.outbreaksLeft >= 0 &&
    Object.values(typedInfections.cured).every((cured) => typeof cured === 'boolean') &&
    Object.values(typedInfections.eradicated).every((eradicated) => typeof eradicated === 'boolean')
  );
};

const isSavedDecks = (decks: unknown): decks is SavedGame['decks'] => {
  const typedDecks = decks as SavedGame['decks'];
  return (
    typeof decks === 'object' &&
    decks !== null &&
    isSavedDeck(typedDecks.drawPile) &&
    isSavedDeck(typedDecks.discardPile) &&
    isSavedDeck(typedDecks.infectionDeck) &&
    isSavedDeck(typedDecks.infectionDiscard)
  );
};

const isSavedMap = (map: unknown): map is SavedGame['map'] => {
  const typedMap = map as SavedGame['map'];
  return (
    typeof map === 'object' &&
    map !== null &&
    Array.isArray(typedMap.map) &&
    typedMap.map.every(
      (city) =>
        typeof city === 'object' &&
        typeof city.name === 'string' &&
        Array.isArray(city.connectedCities)
    ) &&
    Array.isArray(typedMap.researchStations) &&
    typedMap.researchStations.every((station) => typeof station === 'string')
  );
};

const isSavedGame = (game: unknown): game is SavedGame => {
  if (!game || typeof game !== 'object') return false;

  const typedGame = game as SavedGame;
  return (
    typeof typedGame.name === 'string' &&
    isSavedPlayers(typedGame.players) &&
    isSavedInfections(typedGame.infections) &&
    isSavedDecks(typedGame.decks) &&
    isSavedMap(typedGame.map) &&
    Array.isArray(typedGame.gamePlayQueue)
  );
};

/**
 * Parses and validates saved games from localStorage
 * @param savedGames - JSON string containing saved games
 * @returns Record of validated SavedGame objects keyed by game name
 * @throws Error if saved games data is invalid
 */
const parseSavedGames = (savedGames: string): Record<string, SavedGame> => {
  const parsed = JSON.parse(savedGames);

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Saved games must be an object');
  }

  const validatedGames: Record<string, SavedGame> = {};

  for (const [key, game] of Object.entries(parsed)) {
    if (!isSavedGame(game)) {
      throw new Error(`Invalid saved game format for game: ${key}`);
    }
    if (key !== game.name) {
      throw new Error(`Game key "${key}" does not match game name "${game.name}"`);
    }
    validatedGames[key] = game;
  }

  return validatedGames;
};

export const getSavedGames = (includeTestGames?: boolean) => {
  try {
    const savedGames = localStorage.getItem(SAVED_GAMES_KEY);
    const parsedGames = savedGames ? parseSavedGames(savedGames) : {};

    if (includeTestGames) {
      parsedGames[TEST_GAME_1.name] = TEST_GAME_1;
    }

    return parsedGames;
  } catch (error) {
    console.error('Error getting saved games from localStorage', error);
    return {};
  }
};
