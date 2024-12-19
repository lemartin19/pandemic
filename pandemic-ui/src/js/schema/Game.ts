import { InfectCity } from './Action';
import { DiscardPile, DrawPile, InfectedDeck, InfectionDeck } from './Deck';
import {
  Infect,
  GameplayState,
  Increase,
  Intensify,
  PlayerAction,
  PlayerDraw,
  PlayerDiscard,
} from './GameplayState';
import { WorldMap } from './WorldMap';
import { Player } from './Player';
import { Card } from './Card';
/**
 * Represents the main game state and logic controller for Pandemic
 */
export class Game {
  private map: WorldMap;
  private playerDrawDeck: DrawPile;
  private discardPile: DiscardPile;
  private infectionDeck: InfectionDeck;
  private infectedCities: InfectedDeck;
  private gameplay: Array<GameplayState>;
  private players: Array<Player>;
  private infectionRate: number;
  private outbreaksLeft: number;

  constructor(
    map: WorldMap,
    playerDrawDeck: DrawPile,
    discardPile: DiscardPile,
    infectionDeck: InfectionDeck,
    infectedCities: InfectedDeck,
    players: Array<Player>,
    gameplay: Array<GameplayState> = [],
    infectionRate: number = 2,
    outbreaksLeft: number = 8
  ) {
    this.map = map;
    this.playerDrawDeck = playerDrawDeck;
    this.discardPile = discardPile;
    this.infectionDeck = infectionDeck;
    this.infectedCities = infectedCities;
    this.players = players;
    this.gameplay = gameplay;
    this.infectionRate = infectionRate;
    this.outbreaksLeft = outbreaksLeft;
  }

  public nextTurn(): void {
    const player = this.players.shift();
    if (!player) {
      throw new Error('No players in the game');
    }

    this.gameplay.push(
      new PlayerAction(player),
      new PlayerAction(player),
      new PlayerAction(player),
      new PlayerAction(player),
      new PlayerDraw(player, 2),
      new Infect()
    );
    this.players.push(player);
  }

  public startEpidemic(): void {
    const cityCard = this.infectionDeck.draw(true);
    const city = this.map.findCity(cityCard);
    city.infect(true);
    this.gameplay.unshift(new Increase(), new Intensify());
  }

  public increaseInfectionRate(): void {
    this.infectionRate++;
  }

  public trackOutbreak(): void {
    this.infectionRate--;
  }

  public intensify(): void {
    this.infectedCities.intensify(this.infectionDeck);
  }

  public infect(isEpidemic: boolean = false): void {
    if (isEpidemic) {
      this.drawAndInfect(true);
    } else {
      for (let i = 0; i < this.infectionRate; i++) {
        this.drawAndInfect();
      }
    }
  }

  private drawAndInfect(isEpidemic: boolean = false): void {
    const cityCard = this.infectionDeck.draw(isEpidemic);
    const city = this.map.findCity(cityCard);
    const infectAction = new InfectCity(city, isEpidemic);
    infectAction.execute(this);
  }

  public drawPlayerCard(): Card {
    return this.playerDrawDeck.draw();
  }

  public discardPlayerCard(player: Player, card: Card): void {
    player.discardFromHand(card);
    this.discardPile.add(card);
  }

  public queueDiscard(player: Player): void {
    this.gameplay.unshift(new PlayerDiscard(player));
  }

  public isGameOver(): boolean {
    return this.outbreaksLeft === 0 || this.playerDrawDeck.isEmpty();
  }
}
