import { Action } from './Action';

/**
 * Represents a player role with special abilities
 */
export class Role {
  private name: string;
  private description: string;
  private powers: Set<Action>;

  constructor(name: string, description: string, powers: Set<Action>) {
    this.name = name;
    this.description = description;
    this.powers = powers;
  }

  public get getName(): string {
    return this.name;
  }

  public get getDescription(): string {
    return this.description;
  }

  public get getPowers(): Set<Action> {
    return this.powers;
  }
}
