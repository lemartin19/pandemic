import { CityCard } from './Card';
import { Location } from './Map';

export type DriveFerry = {
  type: 'driveFerry';
  to: Location;
};

export type Shuttle = {
  type: 'shuttle';
  to: Location;
};

export type Fly = {
  type: 'fly';
  cityCard: CityCard;
};

export type Charter = {
  type: 'charter';
  cityCard: CityCard;
  to: Location;
};

export type BuildResearchStation = {
  type: 'buildResearchStation';
  cityCard: CityCard;
};

export type ShareKnowledge = {
  type: 'shareKnowledge';
  cityCard: CityCard;
  playerName: string;
};

export type TreatDisease = {
  type: 'treatDisease';
};

export type Action =
  | DriveFerry
  | Shuttle
  | Fly
  | Charter
  | BuildResearchStation
  | ShareKnowledge
  | TreatDisease;
