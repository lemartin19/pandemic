import { Card, CityCard, EpidemicCard } from './Card';
import { City } from './City';
import { Player } from './Player';
import { Color, Disease } from './Disease';
import { Game } from './Game';

/**
 * Base action interface
 */
export class Action {
  name: string;
  description: string;
  next?: Action;

  constructor(name: string, description: string, next?: Action) {
    this.name = name;
    this.description = description;
    this.next = next;
  }

  execute(game: Game): void {
    this.next?.execute(game);
  }

  /**
   * Interrupts the action flow and does the given action next, continuing the action flow after the given action and its chain.
   */
  interrupt(action: Action): void {
    if (this.next) {
      action.doAfter(action);
    }
    this.next = action;
  }

  /**
   * Does the given action following all pending actions in the chain.
   */
  doAfter(action: Action): void {
    if (this.next) {
      this.next.doAfter(action);
    } else {
      this.next = action;
    }
  }
}

/**
 * Base move action
 */
export abstract class Move extends Action {
  player: Player;
  to: City;

  constructor(name: string, description: string, player: Player, to: City, next?: Action) {
    super(name, description, next);
    this.player = player;
    this.to = to;
  }
}

/**
 * Move a player from its current city to any connected city.
 */
export class DriveFerry extends Move {
  constructor(player: Player, to: City) {
    super('Drive', 'Drive to a city', player, to);
  }

  /**
   * Move the player to the destination city
   * @throws {Error} if the destination is not connected to the origin
   */
  execute(game: Game): void {
    const from = this.player.getCurrentCity();
    if (!from.isConnectedTo(this.to)) {
      throw new Error('Destination cannot be reached from the origin by car or ferry.');
    }
    this.player.move(this.to);
    super.execute(game);
  }
}

/**
 * Discard a city card to move a player to that city.
 */
export class Fly extends Move {
  private cityCard: CityCard;

  constructor(player: Player, to: City, cityCard: CityCard) {
    super('Fly', 'Discard a city card to fly to that city', player, to);
    this.cityCard = cityCard;
  }

  /**
   * Move the player to the destination city and discard the city card.
   * @throws {Error} if the city card does not match the destination city
   */
  execute(game: Game): void {
    if (!this.cityCard.matchesCity(this.to)) {
      throw new Error('City card cannot be used to fly to the destination city');
    }
    this.player.move(this.to);
    const discard = new Discard(this.player, this.cityCard);
    this.interrupt(discard);
    super.execute(game);
  }
}

/**
 * Discard the current player's city to move that player to any other city.
 */
export class Charter extends Move {
  private cityCard: CityCard;

  constructor(player: Player, to: City, cityCard: CityCard) {
    super(
      'Charter',
      'Discard the city card of the city you are in to charter a flight to any city',
      player,
      to
    );
    this.cityCard = cityCard;
  }

  /**
   * Move the player to the destination city and discard the city card.
   * @throws {Error} if the city card does not match the player's current city
   */
  execute(game: Game): void {
    const from = this.player.getCurrentCity();
    if (!this.cityCard.matchesCity(from)) {
      throw new Error('Destination cannot be reached from the origin by car or ferry.');
    }
    this.player.move(this.to);
    const discard = new Discard(this.player, this.cityCard);
    this.interrupt(discard);
    super.execute(game);
  }
}

/**
 * Move between any two cities with research stations.
 */
export class Shuttle extends Move {
  constructor(player: Player, to: City) {
    super(
      'Shuttle',
      'Shuttle from a city with a research station to any other city with a research station',
      player,
      to
    );
  }

  /**
   * Move the player to the destination city if it has a research station.
   * @throws {Error} if the destination city does not have a research station
   * @throws {Error} if the player does not have a research station in their current city
   */
  execute(game: Game): void {
    if (!this.to.hasResearchStation()) {
      throw new Error('Destination city does not have a research station');
    }
    if (!this.player.getCurrentCity().hasResearchStation()) {
      throw new Error('Player does not have a research station in their current city');
    }
    this.player.move(this.to);
    super.execute(game);
  }
}

/**
 * Build research station in the current city.
 */
export class Build extends Action {
  private player: Player;
  private cityCard: CityCard;

  constructor(player: Player, cityCard: CityCard) {
    super(
      'Build',
      "Build a research station in your current city by discarding that city's card",
      undefined
    );
    this.player = player;
    this.cityCard = cityCard;
  }

  /**
   * Build a research station in the current city and discard the city card.
   * @throws {Error} if the city already has a research station
   * @throws {Error} if the player is not in the current city
   */
  execute(game: Game): void {
    const city = this.player.getCurrentCity();
    if (!this.cityCard.matchesCity(city)) {
      throw new Error('Player is not in the current city');
    }
    city.buildResearchStation();
    const discard = new Discard(this.player, this.cityCard);
    this.interrupt(discard);
    super.execute(game);
  }
}

/**
 * Destroy a different research station and build a new one in the current city.
 */
export class DestroyAndBuild extends Build {
  private destroyCity: City;

  constructor(player: Player, cityCard: CityCard, destroyCity: City) {
    super(player, cityCard);
    this.destroyCity = destroyCity;
  }

  /**
   * Destroy the research station in the destroy city and build a new one in the current city by discarding the current city's card.
   * @throws {Error} if the destroyed city does not have a research station
   */
  execute(game: Game): void {
    this.destroyCity.destroyResearchStation();
    super.execute(game);
  }
}

/**
 * Treat the given disease in the current city.
 */
export class Treat extends Action {
  private disease: Disease;
  private city: City;

  constructor(disease: Disease, city: City) {
    super('Treat', 'Treat a disease in the current city', undefined);
    this.disease = disease;
    this.city = city;
  }

  /**
   * Treat the disease in the current city.
   */
  execute(game: Game): void {
    this.city.treatDisease(this.disease);
    super.execute(game);
  }
}

/**
 * Discard a card to the discard pile.
 */
export class Discard extends Action {
  private player: Player;
  private card: Card;

  constructor(player: Player, card: Card) {
    super('Discard', 'Discard a card', undefined);
    this.player = player;
    this.card = card;
  }

  execute(game: Game): void {
    this.player.discardFromHand(this.card);
    super.execute(game);
  }
}

/**
 * Draw a random card into the player's hand.
 */
export class Draw extends Action {
  private player: Player;

  constructor(player: Player) {
    super('Draw', 'Draw a card from the draw pile', undefined);
    this.player = player;
  }

  execute(game: Game): void {
    const card = game.drawPlayerCard();
    this.player.addToHand(card);

    if (card instanceof EpidemicCard) {
      game.startEpidemic();
    }
    if (this.player.isHandFull()) {
      game.queueDiscard(this.player);
    }

    super.execute(game);
  }
}

/**
 * Create a cure for the given disease.
 */
export class Cure extends Action {
  private disease: Disease;
  private cityCards: CityCard[];

  constructor(disease: Disease, cityCards: CityCard[]) {
    super(
      'Cure',
      'Create a cure for the disease by discarding 5 city cards of the same color',
      undefined
    );
    this.disease = disease;
    this.cityCards = cityCards;
  }

  /**
   * Create a cure for the disease by discarding 5 city cards of the same color.
   * @throws {Error} if there are not 5 city cards of the same color
   */
  execute(game: Game): void {
    if (this.cityCards.length !== 5) {
      throw new Error('There must be 5 city cards of the same color to create a cure');
    }
    this.cityCards.forEach((card) => {
      if (!card.sameColor(this.disease)) {
        throw new Error('City cards must be of the same color to create a cure');
      }
    });
    this.disease.cure();
    super.execute(game);
  }
}

/**
 * Share a city card between two players.
 */
export class ShareKnowledge extends Action {
  private givingPlayer: Player;
  private receivingPlayer: Player;
  private card: CityCard;

  constructor(givingPlayer: Player, receivingPlayer: Player, card: CityCard) {
    super('ShareKnowledge', 'Share knowledge with the current player', undefined);
    this.givingPlayer = givingPlayer;
    this.receivingPlayer = receivingPlayer;
    this.card = card;
  }

  /**
   * Share a city card between two players.
   * @throws {Error} if the giving player does not have the city card
   * @throws {Error} if the players are not in the city card's city
   */
  execute(game: Game): void {
    const givingPlayerCity = this.givingPlayer.getCurrentCity();
    const receivingPlayerCity = this.receivingPlayer.getCurrentCity();
    if (!this.card.matchesCity(givingPlayerCity)) {
      throw new Error('Giving player is not in the city of the city card');
    }
    if (!this.card.matchesCity(receivingPlayerCity)) {
      throw new Error('Receiving player is not in the city of the city card');
    }

    this.receivingPlayer.addToHand(this.card);
    this.interrupt(new Discard(this.givingPlayer, this.card));

    if (this.receivingPlayer.isHandFull()) {
      game.queueDiscard(this.receivingPlayer);
    }
    super.execute(game);
  }
}

/**
 * Infect a city with a disease.
 */
export class InfectCity extends Action {
  private city: City;
  private isEpidemic: boolean;
  private color?: Color;

  constructor(city: City, isEpidemic: boolean, color?: Color) {
    super('Infect', 'Infect the given city', undefined);
    this.city = city;
    this.isEpidemic = isEpidemic;
    this.color = color;
  }

  execute(game: Game): void {
    const maybeOutbreak = this.city.infect(this.isEpidemic, this.color);
    if (maybeOutbreak) {
      this.interrupt(maybeOutbreak);
    }
    super.execute(game);
  }
}

/**
 * Cause an outbreak in the connected cities.
 */
export class Outbreak extends Action {
  private cities: City[];
  private seenCities: City[];
  private color: Color;

  constructor(cities: City[], seenCities: City[], color: Color) {
    super('Outbreak', 'Outbreak of disease in the city', undefined);
    this.cities = cities;
    this.seenCities = seenCities;
    this.color = color;
  }

  execute(game: Game): void {
    game.trackOutbreak();
    for (const city of this.cities) {
      city.infect(false, this.color);
    }
    super.execute(game);
  }
}
