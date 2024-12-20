import { Color } from '../../types/Disease';
import { City, Location } from '../../types/Map';
import {
  BASIC_MIDDLE_EAST_ASIA_CITIES,
  BASIC_NORTH_AMERICA_EUROPE_CITIES,
  BASIC_SOUTH_AMERICA_AFRICA_CITIES,
  BASIC_SOUTH_EAST_ASIA_AUSTRALIA_CITIES,
} from './locations';

const CONNECTIONS: Record<Location, Location[]> = {
  'San Francisco': ['Chicago', 'Los Angeles', 'Tokyo', 'Manila'],
  Chicago: ['San Francisco', 'Atlanta', 'Montreal/Toronto'],
  Atlanta: ['Chicago', 'Washington', 'Miami'],
  Washington: ['Atlanta', 'New York', 'Montreal/Toronto', 'Miami'],
  'New York': ['Montreal/Toronto', 'London', 'Madrid', 'Washington'],
  'Montreal/Toronto': ['Chicago', 'New York', 'Washington'],
  London: ['New York', 'Madrid', 'Paris', 'Essen'],
  Madrid: ['New York', 'London', 'Paris', 'São Paulo', 'Algiers'],
  Paris: ['London', 'Madrid', 'Milan', 'Essen', 'Algiers'],
  Essen: ['London', 'Paris', 'Milan', 'St Petersburg'],
  Milan: ['Paris', 'Essen', 'Istanbul'],
  'St Petersburg': ['Essen', 'Moscow', 'Istanbul'],
  'Los Angeles': ['San Francisco', 'Mexico City', 'Sydney', 'Chicago'],
  'Mexico City': ['Los Angeles', 'Miami', 'Bogota', 'Lima'],
  Miami: ['Atlanta', 'Washington', 'Mexico City', 'Bogota'],
  Bogota: ['Miami', 'Mexico City', 'Lima', 'São Paulo', 'Buenos Aires'],
  Lima: ['Mexico City', 'Bogota', 'Santiago'],
  Santiago: ['Lima'],
  'São Paulo': ['Madrid', 'Lagos', 'Bogota', 'Buenos Aires'],
  'Buenos Aires': ['Bogota', 'São Paulo'],
  Lagos: ['São Paulo', 'Khartoum', 'Kinshasa'],
  Kinshasa: ['Lagos', 'Khartoum', 'Johannesburg'],
  Johannesburg: ['Kinshasa', 'Khartoum'],
  Khartoum: ['Cairo', 'Lagos', 'Kinshasa', 'Johannesburg'],
  Moscow: ['St Petersburg', 'Istanbul', 'Tehran'],
  Istanbul: ['Milan', 'St Petersburg', 'Moscow', 'Baghdad', 'Cairo', 'Algiers'],
  Baghdad: ['Istanbul', 'Tehran', 'Karachi', 'Riyadh', 'Cairo'],
  Tehran: ['Moscow', 'Baghdad', 'Karachi', 'Delhi'],
  Algiers: ['Madrid', 'Paris', 'Istanbul', 'Cairo'],
  Cairo: ['Algiers', 'Istanbul', 'Baghdad', 'Riyadh'],
  Riyadh: ['Cairo', 'Baghdad', 'Karachi'],
  Karachi: ['Baghdad', 'Tehran', 'Delhi', 'Mumbai', 'Riyadh'],
  Delhi: ['Tehran', 'Karachi', 'Mumbai', 'Chennai', 'Kolkata'],
  Mumbai: ['Karachi', 'Delhi', 'Chennai'],
  Chennai: ['Mumbai', 'Delhi', 'Kolkata', 'Bangkok', 'Jakarta'],
  Kolkata: ['Delhi', 'Chennai', 'Bangkok', 'Hong Kong'],
  Bangkok: ['Chennai', 'Kolkata', 'Hong Kong', 'Ho Chi Minh City', 'Jakarta'],
  Jakarta: ['Chennai', 'Bangkok', 'Ho Chi Minh City', 'Sydney'],
  Beijing: ['Seoul', 'Shanghai'],
  Seoul: ['Beijing', 'Shanghai', 'Tokyo'],
  Shanghai: ['Beijing', 'Seoul', 'Tokyo', 'Taipei', 'Hong Kong'],
  Tokyo: ['Seoul', 'Shanghai', 'San Francisco', 'Osaka'],
  Osaka: ['Tokyo', 'Taipei'],
  Taipei: ['Shanghai', 'Hong Kong', 'Manila', 'Osaka'],
  'Hong Kong': ['Shanghai', 'Taipei', 'Manila', 'Ho Chi Minh City', 'Bangkok', 'Kolkata'],
  'Ho Chi Minh City': ['Bangkok', 'Hong Kong', 'Manila', 'Jakarta'],
  Manila: ['Taipei', 'Hong Kong', 'Ho Chi Minh City', 'San Francisco', 'Sydney'],
  Sydney: ['Jakarta', 'Manila', 'Los Angeles'],
};

function makeCity(city: Location, color: Color): City {
  return {
    name: city,
    color,
    connectedCities: CONNECTIONS[city],
  };
}

const BASIC_BLUE_CITIES: City[] = BASIC_NORTH_AMERICA_EUROPE_CITIES.map((city) =>
  makeCity(city, 'blue')
);

const BASIC_YELLOW_CITIES: City[] = BASIC_SOUTH_AMERICA_AFRICA_CITIES.map((city) =>
  makeCity(city, 'yellow')
);

const BASIC_BLACK_CITIES: City[] = BASIC_MIDDLE_EAST_ASIA_CITIES.map((city) =>
  makeCity(city, 'black')
);

const BASIC_RED_CITIES: City[] = BASIC_SOUTH_EAST_ASIA_AUSTRALIA_CITIES.map((city) =>
  makeCity(city, 'red')
);

export const BASIC_CITIES = [
  ...BASIC_BLUE_CITIES,
  ...BASIC_YELLOW_CITIES,
  ...BASIC_BLACK_CITIES,
  ...BASIC_RED_CITIES,
];
