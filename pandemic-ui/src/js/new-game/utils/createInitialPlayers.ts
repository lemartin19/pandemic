import { Player } from '../../types/Player';

export function createInitialPlayers(numberOfPlayers: number): Player[] {
  return Array.from({ length: numberOfPlayers }, (__, index) => ({
    name: `Player ${index + 1}`,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    hand: [],
  }));
}
