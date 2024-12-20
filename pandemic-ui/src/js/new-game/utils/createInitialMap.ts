import { Map, ResearchStations } from '../../types/Map';
import { BASIC_CITIES } from '../constants/basicCities';

export function createInitialMap(__type: 'basic'): {
  map: Map;
  researchStations: ResearchStations;
} {
  return { map: [...BASIC_CITIES], researchStations: ['Atlanta'] };
}
