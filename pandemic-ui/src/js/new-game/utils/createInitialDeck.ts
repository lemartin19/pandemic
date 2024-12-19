import { EpidemicCard } from '../../types/Card';
import { Deck } from '../../types/Deck';
import { BASIC_CITIES } from './basicCards';

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

function createInitialDeckForType(__type: 'normal'): Deck {
  return [...BASIC_CITIES];
}

function createEpidemicCard(): EpidemicCard {
  return {
    type: 'epidemic',
  };
}

export function createInitialDeck(difficulty: 'easy' | 'medium' | 'hard', type: 'normal'): Deck {
  const epidemicCards = getEpidemicCardsForDifficulty(difficulty);
  const deck = createInitialDeckForType(type);

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
