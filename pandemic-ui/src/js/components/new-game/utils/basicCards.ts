import { CityCard } from '../../../types/Card';
import { Color } from '../../../types/Disease';

function makeCityCard(city: string, color: Color): CityCard {
  return {
    type: 'city',
    name: city,
    color,
  };
}

const BASIC_BLUE_CITIES: CityCard[] = [
  'San Francisco',
  'Chicago',
  'Toronto',
  'New York',
  'Atlanta',
  'Washington',
  'London',
  'Madrid',
  'Paris',
  'Milan',
  'St Petersburg',
  'Essen',
].map((city) => makeCityCard(city, 'blue'));

const BASIC_YELLOW_CITIES: CityCard[] = [
  'Los Angeles',
  'Mexico City',
  'Miami',
  'Bogota',
  'Lima',
  'Santiago',
  'Buenos Aires',
  'Sao Paulo',
  'Lagos',
  'Kinshasa',
  'Johannesburg',
  'Khartoum',
].map((city) => makeCityCard(city, 'yellow'));

const BASIC_BLACK_CITIES: CityCard[] = [
  'Moscow',
  'Istanbul',
  'Baghdad',
  'Tehran',
  'Algiers',
  'Cairo',
  'Riyadh',
  'Karachi',
  'Delhi',
  'Kolkata',
  'Mumbai',
  'Chennai',
].map((city) => makeCityCard(city, 'black'));

const BASIC_RED_CITIES: CityCard[] = [
  'Seoul',
  'Tokyo',
  'Osaka',
  'Beijing',
  'Shanghai',
  'Taipei',
  'Hong Kong',
  'Manila',
  'Bangkok',
  'Ho Chi Minh City',
  'Jakarta',
  'Sydney',
].map((city) => makeCityCard(city, 'red'));

export const BASIC_CITIES = [
  ...BASIC_BLUE_CITIES,
  ...BASIC_YELLOW_CITIES,
  ...BASIC_BLACK_CITIES,
  ...BASIC_RED_CITIES,
];
