import { PropsWithChildren } from 'react';
import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { Tooltip } from '../../components/Tooltip';
import { EventCard, isEventCard } from '../../types/Card';
import { Deck } from '../../types/Deck';
import { Player } from '../../types/Player';
import { calculateFontColor } from '../../utils/calculateFontColor';
import { EventCardButton } from './EventCardButton';

export function PlayerControls({ player, children }: PropsWithChildren<{ player: Player }>) {
  const gameplay = useCurrentGameplayState();
  const allowedEventCards = player.hand.filter(
    (card) => gameplay && isEventCard(card) && card.allowedIn.includes(gameplay.type)
  ) as Deck<EventCard>;
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
      {allowedEventCards.length ? <EventCardButton eventCards={allowedEventCards} /> : null}
    </div>
  );
}
PlayerControls.displayName = 'PlayerControls';
