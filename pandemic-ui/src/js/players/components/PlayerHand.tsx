import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { CityCard, EventCard, isEventCard } from '../../types/Card';
import { Deck } from '../../types/Deck';

export function PlayerHand({ hand }: { hand: Deck<CityCard | EventCard> }) {
  const gameplay = useCurrentGameplayState();
  const canInterrupt = hand.some(
    (card) => isEventCard(card) && card.allowedIn.includes(gameplay.type)
  );
  return (
    <div className="player-hand">
      {hand.map((card) => (
        <div key={card.name} className="player-hand-card">
          {card.name}
        </div>
      ))}
      {canInterrupt && <button className="player-events-interrupt">Use Event Card</button>}
    </div>
  );
}
PlayerHand.displayName = 'PlayerHand';
