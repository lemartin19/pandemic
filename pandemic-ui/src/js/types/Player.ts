import { Deck } from './Deck';
import { Location } from './Map';

export interface Player {
  name: string;
  color: string;
  hand: Deck;
  currentLocation: Location;
}
