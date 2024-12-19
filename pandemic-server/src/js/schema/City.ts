import { Location } from './Location';
import { Color, COLORS, Disease } from './Disease';
import { Outbreak } from './Action';

/**
 * Represents a city on the game board
 */
export class City {
  private readonly location: Location;
  private infections: Record<Color, number>;
  private researchStation: boolean;
  private connections: Array<City>;

  constructor(
    location: Location,
    connections: Array<City>,
    infections: Record<Color, number> = {
      [COLORS.BLUE]: 0,
      [COLORS.YELLOW]: 0,
      [COLORS.BLACK]: 0,
      [COLORS.RED]: 0,
    },
    researchStation: boolean = false
  ) {
    this.location = location;
    this.connections = connections;
    this.infections = infections;
    this.researchStation = researchStation;
  }

  public infect(isEpidemic: boolean = false, color?: Color): Outbreak | undefined {
    const infectionColor = color || this.location.regionColor;
    const isOutbreak = this.infections[infectionColor] >= 3;
    if (isOutbreak) {
      return new Outbreak(this.connections, [this], infectionColor);
    }

    if (isEpidemic) {
      this.infections[infectionColor] = 3;
    } else {
      this.infections[infectionColor] += 1;
    }
    return undefined;
  }

  public treatDisease(disease: Disease, treatAll: boolean = false): void {
    if (treatAll || disease.isCured) {
      this.infections[disease.color] = 0;
    } else {
      this.infections[disease.color] -= 1;
    }
  }

  public hasResearchStation(): boolean {
    return this.researchStation;
  }

  /**
   * Build a research station in the city.
   */
  public buildResearchStation(): void {
    if (this.researchStation) {
      throw new Error('City already has a research station');
    }
    this.researchStation = true;
  }

  /**
   * Remove the research station from the city.
   * @throws {Error} if the city does not have a research station
   */
  public destroyResearchStation(): void {
    if (!this.researchStation) {
      throw new Error('City does not have a research station');
    }
    this.researchStation = false;
  }

  public isInCity(location: Location): boolean {
    return this.location.equals(location);
  }

  public isConnectedTo(city: City): boolean {
    return this.connections.some((c) => c.equals(city));
  }

  public equals(city: City): boolean {
    return this.location.equals(city.location);
  }
}
