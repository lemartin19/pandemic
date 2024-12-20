import { Map } from '../../types/Map';
import { BASIC_CITIES } from '../constants/basicCities';

export function createInitialMap(__type: 'basic'): Map {
  return [...BASIC_CITIES];
}
