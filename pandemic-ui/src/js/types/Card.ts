import { Color } from './Disease';

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
}

export type Card = EpidemicCard | InfectionCard | CityCard | EventCard;
