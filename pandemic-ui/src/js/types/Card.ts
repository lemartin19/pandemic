import { Color } from './Disease';
import { GamePlay } from './GamePlay';

export interface EpidemicCard {
  type: 'epidemic';
}

export interface InfectionCard {
  type: 'infection';
}

export interface CityCard {
  type: 'city';
  name: string;
  color: Color;
}

export interface EventCard {
  type: 'event';
  name: string;
  description: string;
  allowedIn: readonly GamePlay['type'][];
}

export type Card = EpidemicCard | InfectionCard | CityCard | EventCard;

export function isEventCard(card: Card): card is EventCard {
  return card.type === 'event';
}
