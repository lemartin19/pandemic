import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { CityCard, isEventCard } from '../../types/Card';
import { LocationSelect } from './LocationSelect';

export function HandLocationForm({
  value,
  onChange,
}: {
  value: CityCard | null;
  onChange: (newCityCard: CityCard) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  if (!currentPlayer) {
    return null;
  }
  const availableLocations = currentPlayer.hand
    .filter((card) => !isEventCard(card))
    .map((card) => card.name);
  return (
    <LocationSelect
      value={value?.name ?? null}
      label="To"
      onChange={(newCity) =>
        onChange(currentPlayer.hand.find((card) => card.name === newCity) as CityCard)
      }
      availableLocations={availableLocations}
    />
  );
}
HandLocationForm.displayName = 'HandLocationForm';
