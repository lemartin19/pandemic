import { CityCard, EventCard } from './Card';
import { Deck } from './Deck';
import { Location } from './Map';

export interface Player {
  name: string;
  color: string;
  hand: Deck<CityCard | EventCard>;
  currentLocation: Location;
}
