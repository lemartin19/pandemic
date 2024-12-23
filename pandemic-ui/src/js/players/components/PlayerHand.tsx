import { CityCard, EventCard, isEventCard } from '../../types/Card';
import { Deck } from '../../types/Deck';

function Card({
  card,
  selected,
  onSelect,
}: {
  card: CityCard | EventCard;
  selected?: boolean;
  onSelect?: (card: CityCard | EventCard) => void;
}) {
  const backgroundColor = isEventCard(card) ? 'green' : card.color;
  return (
    <div
      className="PlayerHand-card"
      style={{ backgroundColor, border: selected ? '2px solid #59e9ff' : 'none' }}
      onClick={() => onSelect?.(card)}
    >
      {card.name}
    </div>
  );
}
Card.displayName = 'Card';

export function PlayerHand({
  hand,
  selected,
  onSelect,
}: {
  hand: Deck<CityCard | EventCard>;
  selected?: Deck<CityCard | EventCard>;
  onSelect?: (card: CityCard | EventCard) => void;
}) {
  return (
    <div className="PlayerHand">
      {hand.map((card) => (
        <Card key={card.name} card={card} selected={selected?.includes(card)} onSelect={onSelect} />
      ))}
    </div>
  );
}
PlayerHand.displayName = 'PlayerHand';
