import { CityCard, EventCard } from '../../types/Card';
import { Color } from '../../types/Disease';
import {
  BASIC_NORTH_AMERICA_EUROPE_CITIES,
  BASIC_SOUTH_AMERICA_AFRICA_CITIES,
  BASIC_MIDDLE_EAST_ASIA_CITIES,
  BASIC_SOUTH_EAST_ASIA_AUSTRALIA_CITIES,
} from './locations';

function makeCityCard(city: string, color: Color): CityCard {
  return {
    type: 'city',
    name: city,
    color,
  };
}

const BASIC_BLUE_CITIES: CityCard[] = BASIC_NORTH_AMERICA_EUROPE_CITIES.map((city) =>
  makeCityCard(city, 'blue')
);

const BASIC_YELLOW_CITIES: CityCard[] = BASIC_SOUTH_AMERICA_AFRICA_CITIES.map((city) =>
  makeCityCard(city, 'yellow')
);

const BASIC_BLACK_CITIES: CityCard[] = BASIC_MIDDLE_EAST_ASIA_CITIES.map((city) =>
  makeCityCard(city, 'black')
);

const BASIC_RED_CITIES: CityCard[] = BASIC_SOUTH_EAST_ASIA_AUSTRALIA_CITIES.map((city) =>
  makeCityCard(city, 'red')
);

export const BASIC_CITIES = [
  ...BASIC_BLUE_CITIES,
  ...BASIC_YELLOW_CITIES,
  ...BASIC_BLACK_CITIES,
  ...BASIC_RED_CITIES,
];

export const BASIC_EVENT_CARDS: EventCard[] = [
  {
    type: 'event',
    name: 'Airlift',
    description: 'Move any player to any city for free at any time.',
  },
  {
    type: 'event',
    name: 'Forecast',
    description:
      'Draw 6 cards from the infection deck, reorder them and replace them on top of the infection deck.',
  },
  {
    type: 'event',
    name: 'Government Grant',
    description: 'Build a research station in any city for free.',
  },
  {
    type: 'event',
    name: 'Resilient Population',
    description:
      'Remove any city from the infection deck discard pile from the game. Must be played between the Increase and Intensify steps of the game.',
  },
  {
    type: 'event',
    name: 'One Quiet Night',
    description: 'Skip the next infection step.',
  },
];
