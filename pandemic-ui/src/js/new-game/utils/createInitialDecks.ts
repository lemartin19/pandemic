import { EpidemicCard } from '../../types/Card';
import { Deck } from '../../types/Deck';
import { Player } from '../../types/Player';
import { BASIC_CITIES } from '../constants/basicCards';

/**
 * Gets the number of epidemic cards for a given difficulty
 * @param difficulty - The difficulty of the game
 * @returns The number of epidemic cards to insert into the deck
 */
function getEpidemicCardsForDifficulty(difficulty: 'easy' | 'medium' | 'hard'): number {
  switch (difficulty) {
    case 'hard':
      return 6;
    case 'medium':
      return 5;
    case 'easy':
    default:
      return 4;
  }
}

/**
 * Gets the initial hand size for a given number of players
 * @param players - The number of players
 * @returns The initial hand size of the players
 */
const getInitialPlayerHandSize = (players: Player[]): number => {
  switch (players.length) {
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
    default:
      return 2;
  }
};

/**
 * Creates players with hands
 * @param players - The players to create
 * @param deck - The deck to create the hands from
 * @mutates deck to remove cards that are added to the players' hands
 * @returns The players with hands
 */
function createPlayersWithHands(players: Player[], deck: Deck): Player[] {
  for (const player of players) {
    for (let i = 0; i < getInitialPlayerHandSize(players); i++) {
      const newCard = deck.pop();
      if (!newCard) {
        throw new Error('Not enough cards in deck');
      }
      player.hand.push(newCard);
    }
  }
  return players;
}

/**
 * Shuffles a Deck
 * @param array - The array to shuffle
 * @mutates array to shuffle it
 * @returns The shuffled array
 */
function shuffle(array: Deck): Deck {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * Creates the initial deck for a given type
 * @param type - The type of the deck
 * @returns The initial deck
 */
function createInitialDrawDeckForType(__type: 'normal'): Deck {
  const normalDeck = [...BASIC_CITIES];
  return shuffle(normalDeck);
}

/**
 * Creates the initial infection deck for a given type
 * @param type - The type of the deck
 * @returns The initial infection deck
 */
function createInitialInfectionDeckForType(__type: 'normal'): Deck {
  const normalDeck = [...BASIC_CITIES];
  return shuffle(normalDeck);
}

function createEpidemicCard(): EpidemicCard {
  return {
    type: 'epidemic',
  };
}

/**
 * Inserts epidemic cards into the deck
 * @param deck - The deck to insert the epidemic cards into
 * @param epidemicCards - The number of epidemic cards to insert
 * @returns The deck with the epidemic cards inserted
 */
function insertEpidemicCards(deck: Deck, epidemicCards: number): Deck {
  // Split the deck into equal segments based on number of epidemic cards
  const segmentSize = Math.floor(deck.length / epidemicCards);

  // For each segment, insert an epidemic card at a random position within that segment
  for (let segment = 0; segment < epidemicCards; segment++) {
    const segmentStart = segment * segmentSize;
    const segmentEnd = segment === epidemicCards - 1 ? deck.length : (segment + 1) * segmentSize;
    const insertPosition = segmentStart + Math.floor(Math.random() * (segmentEnd - segmentStart));
    deck.splice(insertPosition, 0, createEpidemicCard());
  }
  return deck;
}

/**
 * Creates the initial deck for a given difficulty and type
 * @param difficulty - The difficulty of the game
 * @param type - The type of the deck
 * @param players - The players to create
 * @returns The initial deck and players with hands
 */
export function createInitialDecks(
  difficulty: 'easy' | 'medium' | 'hard',
  type: 'normal',
  players: Player[]
): { players: Player[]; drawPile: Deck; infectionDeck: Deck } {
  const epidemicCards = getEpidemicCardsForDifficulty(difficulty);
  const drawPile = createInitialDrawDeckForType(type);
  const playersWithHands = createPlayersWithHands(players, drawPile);
  const deckWithEpidemicCards = insertEpidemicCards(drawPile, epidemicCards);
  const infectionDeck = createInitialInfectionDeckForType(type);
  return { players: playersWithHands, drawPile: deckWithEpidemicCards, infectionDeck };
}
