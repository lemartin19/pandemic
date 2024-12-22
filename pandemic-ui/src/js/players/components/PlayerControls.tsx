import { PropsWithChildren } from 'react';
import { Player } from '../../types/Player';

export function PlayerControls({ player, children }: PropsWithChildren<{ player: Player }>) {
  return (
    <div className="player-controls" style={{ backgroundColor: player.color }}>
      <div className="player-name">{player.name}</div>
      {children}
    </div>
  );
}
PlayerControls.displayName = 'PlayerControls';
