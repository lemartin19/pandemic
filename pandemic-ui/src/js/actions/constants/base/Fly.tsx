import { useState } from 'react';
import { useDecksDispatch } from '../../../app/store/Decks';
import { usePlayerDispatch } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { CityCard, isEventCard } from '../../../types/Card';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { HandLocationForm } from '../../components/HandLocationForm';
import { SubmitButton } from '../../components/SubmitButton';

const FLY_NAME = 'Fly';
const FLY_DESCRIPTION = 'Fly to a city by discarding its city card.';

export const FLY: Action = {
  name: FLY_NAME,
  description: FLY_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [cityCard, setCityCard] = useState<CityCard | null>(null);
    const currentPlayer = useCurrentPlayer();
    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();
    const handleSubmit = () => {
      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: currentPlayer!.name, location: cityCard!.name },
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
        <HandLocationForm value={cityCard} onChange={setCityCard} />
        <SubmitButton disabled={!cityCard} onClick={handleSubmit} />
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
    const hasCityCards = currentPlayer?.hand.some((card) => !isEventCard(card));
    const disabled = !hasCityCards;
    return (
      <DefaultActionButton
        name={FLY_NAME}
        description={FLY_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={disabled}
      />
    );
  },
};
