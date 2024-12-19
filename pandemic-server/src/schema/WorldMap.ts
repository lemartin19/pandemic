import { CityCard } from './Card';
import { City } from './City';

/**
 * Represents the game board map
 */
export class WorldMap {
  private readonly cities: Array<City>;

  constructor(cities: Array<City>) {
    this.cities = cities;
  }

  public findCity(cityCard: CityCard): City {
    const city = this.cities.find((city) => cityCard.matchesCity(city));
    if (!city) {
      throw new Error('City not found');
    }
    return city;
  }
}
