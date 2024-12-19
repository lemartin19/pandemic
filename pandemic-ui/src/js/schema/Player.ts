import { Discard } from './Action';
import { Card } from './Card';
import { City } from './City';
import { PlayerHand } from './Deck';
import { Role } from './Role';

/**
 * Represents a player in the game.
 */
export class Player {
  private city: City;
  private readonly hand: PlayerHand;
  private readonly role: Role;

  constructor(city: City, hand: PlayerHand, role: Role) {
    this.city = city;
    this.hand = hand;
    this.role = role;
  }

  public isHandFull(): boolean {
    return this.hand.isHandFull();
  }

  public discardFromHand(card: Card): void {
    this.hand.remove(card);
  }

  public addToHand(card: Card) {
    this.hand.add(card);
  }

  public getCurrentCity(): City {
    return this.city;
  }

  public move(to: City): void {
    this.city = to;
  }
}
