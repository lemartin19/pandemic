import { Card, CityCard } from './Card';

export class Deck<C extends Card> {
  protected cards: Array<C>;

  constructor(cards: Array<C>) {
    this.cards = cards;
  }

  public draw(): C {
    const card = this.cards.pop();
    if (!card) {
      throw new Error('Deck is empty');
    }
    return card;
  }

  public add(...cards: Array<C>): void {
    this.cards.push(...cards);
  }

  public remove(card: C): void {
    this.cards = this.cards.filter((c) => !c.equals(card));
  }

  public isEmpty(): boolean {
    return this.cards.length === 0;
  }
}

/**
 * Represents the infection deck that contains city cards for infection
 */
export class InfectionDeck extends Deck<CityCard> {
  constructor(cards: Array<CityCard>) {
    super(cards);
  }

  /**
   * Draws a card from the infection deck
   * @returns {Card} The drawn card
   */
  public draw(fromBottom: boolean = false): CityCard {
    const card = fromBottom ? this.cards.shift() : this.cards.pop();
    if (!card) {
      throw new Error('Infection deck is empty');
    }
    return card;
  }
}

/**
 * Represents the infected cards deck (discard pile for infection cards)
 */
export class InfectedDeck extends Deck<CityCard> {
  constructor(cards: Array<CityCard>) {
    super(cards);
  }

  public intensify(infectionDeck: InfectionDeck): void {
    this.cards.sort(() => Math.random() - 0.5);
    infectionDeck.add(...this.cards);
    this.cards = [];
  }
}

/**
 * Represents the draw pile for player cards
 * @private
 */
export class DrawPile extends Deck<Card> {
  constructor(cards: Array<Card>) {
    super(cards);
  }
}

/**
 * Represents the discard pile for player cards
 */
export class DiscardPile extends Deck<Card> {
  constructor(cards: Array<Card>) {
    super(cards);
  }
}

/**
 * Represents a player's hand of cards
 */
export class PlayerHand extends Deck<Card> {
  constructor(cards: Array<Card>) {
    super(cards);
  }

  public getCards(): Array<Card> {
    return this.cards;
  }

  public isHandFull(): boolean {
    return this.cards.length >= 7;
  }
}
