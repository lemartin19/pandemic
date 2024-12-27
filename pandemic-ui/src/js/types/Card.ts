import { FC } from 'react';
import { Color } from './Disease';
import { GamePlay } from './GamePlay';

export interface EpidemicCard {
  type: 'epidemic';
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
  EventForm: FC<{ onSubmit: () => void }>;
}

export type Card = EpidemicCard | CityCard | EventCard;

export function isEventCard(card: Card): card is EventCard {
  return card.type === 'event';
}
