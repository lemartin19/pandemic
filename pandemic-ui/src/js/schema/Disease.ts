/**
 * Represents the available disease colors
 */
export enum Color {
  BLUE = 'blue',
  YELLOW = 'yellow',
  BLACK = 'black',
  RED = 'red',
}

/**
 * Represents a disease in the game
 */
export class Disease {
  public readonly color: Color;
  public isCured: boolean;
  public isEradicated: boolean;

  constructor(color: Color, isCured: boolean = false, isEradicated: boolean = false) {
    this.color = color;
    this.isCured = isCured;
    this.isEradicated = isEradicated;
  }

  /**
   * Cures the disease
   */
  cure(): void {
    this.isCured = true;
  }

  /**
   * Eradicates the disease
   * @throws {Error} if the disease is not yet cured
   */
  eradicate(): void {
    if (!this.isCured) {
      throw new Error('Disease must be cured before it can be eradicated');
    }
    this.isEradicated = true;
  }
}
