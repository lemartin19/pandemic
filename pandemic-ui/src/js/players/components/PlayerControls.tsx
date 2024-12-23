import { PropsWithChildren } from 'react';
import { Player } from '../../types/Player';
import { calculateFontColor } from '../../utils/calculateFontColor';

export function PlayerControls({ player, children }: PropsWithChildren<{ player: Player }>) {
  return (
    <div
      className="PlayerControls"
      style={{ backgroundColor: player.color, color: calculateFontColor(player.color) }}
    >
      <div className="PlayerControls-name">{player.name}</div>
      {children}
    </div>
  );
}
PlayerControls.displayName = 'PlayerControls';
