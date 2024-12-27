import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { CityCard, isEventCard } from '../../types/Card';
import { ColorButton } from './ColorButton';

export function HandCureForm({
  value,
  onChange,
}: {
  value: CityCard[];
  onChange: (newCityCards: CityCard[]) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  if (!currentPlayer) {
    return null;
  }
  const cityCards = currentPlayer.hand.filter((card) => !isEventCard(card)) as CityCard[];

  return (
    <div className="CardSelect">
      <div className="CardSelect-label">Cure</div>
      <div className="CardSelect-options">
        {cityCards.map((card) => {
          const isCardSelected = value.some((c) => c.name === card.name);
          return (
            <ColorButton
              key={card.name}
              color={card.color}
              isSelected={isCardSelected}
              onClick={() => {
                onChange(
                  isCardSelected ? value.filter((c) => c.name !== card.name) : [...value, card]
                );
              }}
            >
              {card.name}
            </ColorButton>
          );
        })}
      </div>
    </div>
  );
}
HandCureForm.displayName = 'HandCureForm';
