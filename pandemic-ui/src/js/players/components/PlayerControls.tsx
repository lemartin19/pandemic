import { PropsWithChildren } from 'react';
import { Player } from '../../types/Player';
import { calculateFontColor } from '../../utils/calculateFontColor';
import { Button } from '../../components/Button';
import { isEventCard } from '../../types/Card';
import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { Tooltip } from '../../components/Tooltip';

export function PlayerControls({ player, children }: PropsWithChildren<{ player: Player }>) {
  const gameplay = useCurrentGameplayState();
  const canInterrupt = player.hand.some(
    (card) => gameplay && isEventCard(card) && card.allowedIn.includes(gameplay.type)
  );
  return (
    <div
      className="PlayerControls"
      style={{ backgroundColor: player.color, color: calculateFontColor(player.color) }}
    >
      <div className="PlayerControls-info">
        <div className="PlayerControls-nameRole">
          <Tooltip text={player.role.description} position="left">
            {player.name} ({player.role.name})
          </Tooltip>
        </div>
        <div className="PlayerControls-location">{player.currentLocation}</div>
      </div>
      {children}
      {canInterrupt && (
        <Button variant="secondary" size="small">
          Use Event Card
        </Button>
      )}
    </div>
  );
}
PlayerControls.displayName = 'PlayerControls';
