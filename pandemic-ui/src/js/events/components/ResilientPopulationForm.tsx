import { useState } from 'react';
import { LocationSelect } from '../../actions/components/LocationSelect';
import { SubmitButton } from '../../actions/components/SubmitButton';
import { useDecksDispatch, useDecksState } from '../../app/store/Decks';
import { Location } from '../../types/Map';

export function ResilientPopulationForm({ onSubmit }: { onSubmit: () => void }) {
  const [location, setLocation] = useState<Location | null>(null);
  const { infectionDiscard } = useDecksState();
  const decksDispatch = useDecksDispatch();

  const onClick = () => {
    if (!location) return;
    decksDispatch({
      type: 'removeCardFromDeck',
      payload: { cardName: location, deck: 'infectionDiscard' },
    });
    onSubmit();
  };

  const disabled = !location;
  return (
    <>
      <LocationSelect
        availableLocations={infectionDiscard.map((card) => card.name)}
        value={location}
        onChange={(location) => setLocation(location)}
      />
      <SubmitButton disabled={disabled} onClick={onClick} />
    </>
  );
}
ResilientPopulationForm.displayName = 'ResilientPopulationForm';
