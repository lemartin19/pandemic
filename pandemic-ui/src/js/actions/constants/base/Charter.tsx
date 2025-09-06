import { useState } from 'react';
import { useDecksDispatch } from '../../../app/store/Decks';
import { useMapState } from '../../../app/store/Map';
import { usePlayerDispatch } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { Location } from '../../../types/Map';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { LocationSelect } from '../../components/LocationSelect';
import { SubmitButton } from '../../components/SubmitButton';

const CHARTER_NAME = 'Charter';
const CHARTER_DESCRIPTION =
  'Charter a flight to any city by discarding the city card for your current location.';

export const CHARTER: Action = {
  name: CHARTER_NAME,
  description: CHARTER_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const currentPlayer = useCurrentPlayer();
    const [location, setLocation] = useState<Location | null>(null);
    const { map } = useMapState();
    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();

    const handleSubmit = () => {
      const cityCard = currentPlayer?.hand.find(
        (card) => card.name === currentPlayer?.currentLocation
      );
      if (!cityCard || !location) {
        return;
      }

      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: currentPlayer!.name, location },
      });
      playerDispatch({
        type: 'removeFromHand',
        payload: { playerName: currentPlayer!.name, cards: [cityCard!] },
      });
      decksDispatch({
        type: 'discard',
        payload: [cityCard!],
      });
      onSubmit();
    };
    return (
      <>
        <LocationSelect
          value={location}
          onChange={setLocation}
          availableLocations={map.map((city) => city.name)}
        />
        <SubmitButton disabled={!location} onClick={handleSubmit} />
      </>
    );
  },
  ActionButton: ({
    isSelected,
    onSelect,
  }: {
    isSelected: boolean;
    onSelect: (newType: Action['name']) => void;
  }) => {
    const currentPlayer = useCurrentPlayer();
    const hasCurrentCityCard = currentPlayer?.hand.some(
      (card) => card.name === currentPlayer?.currentLocation
    );
    const disabled = !hasCurrentCityCard;
    return (
      <DefaultActionButton
        name={CHARTER_NAME}
        description={CHARTER_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={disabled}
      />
    );
  },
};
