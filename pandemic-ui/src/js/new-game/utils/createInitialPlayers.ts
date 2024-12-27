import { Player } from '../../types/Player';
import { BASIC_ROLES } from '../constants/basicRoles';

export function createInitialPlayers(numberOfPlayers: number): Player[] {
  const roles = [...BASIC_ROLES].sort(() => Math.random() - 0.5);

  return Array.from({ length: numberOfPlayers }, (__, index) => ({
    name: `Player ${index + 1}`,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    hand: [],
    currentLocation: 'Atlanta',
    role: roles.pop()!,
  }));
}
