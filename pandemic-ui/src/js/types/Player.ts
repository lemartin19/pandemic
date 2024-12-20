import { Deck } from './Deck';

export interface Player {
  name: string;
  color: string;
  hand: Deck;
}
