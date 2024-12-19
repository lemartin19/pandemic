import { Action } from './Action';

/**
 * Represents a player role with special abilities
 */
export class Role {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly powers: Set<Action>
  ) {}
}
