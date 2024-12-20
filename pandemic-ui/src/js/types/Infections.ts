import { Color } from './Disease';
import { Location } from './Map';

export type Infections = Record<Location, Record<Color, number>>;

export type InfectionSaturation = Record<Color, number>;
