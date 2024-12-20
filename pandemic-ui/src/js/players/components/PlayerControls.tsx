import { PropsWithChildren } from 'react';
import { Player } from '../../types/Player';

export function PlayerControls({ player, children }: PropsWithChildren<{ player: Player }>) {
  return (
    <div className="player-controls" style={{ backgroundColor: player.color }}>
      <span className="player-name">{player.name}</span>
      {children}
    </div>
  );
}
PlayerControls.displayName = 'PlayerControls';
