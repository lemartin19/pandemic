import { Location } from './Location';
import { Action } from './Action';
import { City } from './City';
import { Color, Disease } from './Disease';

/**
 * Base card interface
 */
export abstract class Card {
  public abstract equals(__card: Card): boolean;
}

/**
 * Represents an event card
 */
export class EventCard extends Card {
  public readonly name: string;
  public readonly description: string;
  public readonly action: Action;

  constructor(name: string, description: string, action: Action) {
    super();
    this.name = name;
    this.description = description;
    this.action = action;
  }

  public equals(card: Card): boolean {
    return card instanceof EventCard && this.name === card.name;
  }
}

/**
 * Represents an epidemic card
 */
export class EpidemicCard extends Card {
  constructor() {
    super();
  }

  public equals(card: Card): boolean {
    return card instanceof EpidemicCard;
  }
}

/**
 * Represents a city card
 */
export class CityCard extends Card {
  private location: Location;
  private color: Color;

  constructor(location: Location, color: Color) {
    super();
    this.location = location;
    this.color = color;
  }

  public matchesCity(city: City): boolean {
    return city.isInCity(this.location);
  }

  public sameColor(disease: Disease): boolean {
    return disease.color === this.color;
  }

  public equals(card: Card): boolean {
    return card instanceof CityCard && this.location === card.location;
  }
}
