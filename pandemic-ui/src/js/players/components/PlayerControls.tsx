import { PropsWithChildren } from 'react';
import { Player } from '../../types/Player';
import { calculateFontColor } from '../../utils/calculateFontColor';
import { Button } from '../../components/Button';
import { isEventCard } from '../../types/Card';
import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';

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
      <div className="PlayerControls-name">{player.name}</div>
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
