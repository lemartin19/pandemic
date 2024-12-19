import { Action, Discard, Draw } from './Action';
import { Card } from './Card';
import { Game } from './Game';
import { Player } from './Player';

export interface GameplayState {
  execute(game: Game): void;
}

export class PlayerAction implements GameplayState {
  private player: Player;
  private action?: Action;

  constructor(player: Player, action?: Action) {
    this.player = player;
    this.action = action;
  }

  /**
   * Execute the action for the player
   * @throws {Error} If no action is selected to execute
   */
  public execute(game: Game) {
    if (this.action) {
      this.action.execute(game);
    } else {
      throw new Error('No action selected to execute');
    }
  }

  public isPlayerTurn(player: Player): boolean {
    return this.player === player;
  }

  public setAction(action: Action): void {
    this.action = action;
  }
}

export class PlayerDraw implements GameplayState {
  private player: Player;
  private count: number;

  constructor(player: Player, count: number) {
    this.player = player;
    this.count = count;
  }

  public execute(game: Game) {
    let drawAction: Draw = new Draw(this.player);
    for (let i = 1; i < this.count; i++) {
      drawAction.doAfter(new Draw(this.player));
    }
    drawAction.execute(game);
  }
}

export class PlayerDiscard implements GameplayState {
  private player: Player;
  private card?: Card;

  constructor(player: Player, card?: Card) {
    this.player = player;
    this.card = card;
  }

  public execute(game: Game) {
    if (this.card) {
      const discard = new Discard(this.player, this.card);
      discard.execute(game);
    } else {
      throw new Error('No card selected to discard');
    }
  }
}

export class Increase implements GameplayState {
  public execute(game: Game) {
    game.intensify();
  }
}

export class Intensify implements GameplayState {
  public execute(game: Game) {
    game.intensify();
  }
}

export class Infect implements GameplayState {
  public execute(game: Game) {
    game.infect();
  }
}
