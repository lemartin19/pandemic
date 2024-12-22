import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { CityCard, EventCard, isEventCard } from '../../types/Card';
import { Deck } from '../../types/Deck';

function Card({ card }: { card: CityCard | EventCard }) {
  const backgroundColor = isEventCard(card) ? 'green' : card.color;
  return (
    <div className="PlayerHand-card" style={{ backgroundColor }}>
      {card.name}
    </div>
  );
}
Card.displayName = 'Card';

export function PlayerHand({ hand }: { hand: Deck<CityCard | EventCard> }) {
  const gameplay = useCurrentGameplayState();
  const canInterrupt = hand.some(
    (card) => isEventCard(card) && card.allowedIn.includes(gameplay.type)
  );
  return (
    <div className="PlayerHand">
      {hand.map((card) => (
        <Card key={card.name} card={card} />
      ))}
      {canInterrupt && <button className="PlayerHand-interrupt">Use Event Card</button>}
    </div>
  );
}
PlayerHand.displayName = 'PlayerHand';
