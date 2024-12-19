import { Color } from './Disease';

/**
 * Represents a location on the game board
 */
export class Location {
  name: string;
  regionColor: Color;

  constructor(name: string, regionColor: Color) {
    this.name = name;
    this.regionColor = regionColor;
  }

  public equals(location: Location): boolean {
    return this.name === location.name;
  }
}
