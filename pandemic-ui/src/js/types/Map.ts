import { Color } from './Disease';

export type Location = string;

export type City = {
  name: Location;
  color: Color;
  connectedCities: Location[];
};

export type Map = Array<City>;

export type ResearchStations = Array<Location>;
