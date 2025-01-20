import { useState } from 'react';
import { useDecksDispatch } from '../../../app/store/Decks';
import { useInfectionsDispatch } from '../../../app/store/Infections';
import { useMapState } from '../../../app/store/Map';
import { usePlayerDispatch } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { CityCard, isEventCard } from '../../../types/Card';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { HandCureForm } from '../../components/HandCureForm';
import { SubmitButton } from '../../components/SubmitButton';

const SCIENTIST_CURE_NAME = 'Cure';
const SCIENTIST_CURE_DESCRIPTION = 'Cure a disease by discarding 4 city cards of the same color.';

export const SCIENTIST_CURE: Action = {
  name: SCIENTIST_CURE_NAME,
  description: SCIENTIST_CURE_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [cards, setCards] = useState<CityCard[]>([]);
    const currentPlayer = useCurrentPlayer();
    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();
    const infectionsDispatch = useInfectionsDispatch();

    const disabled =
      cards.length !== 4 || !cards.every((card: CityCard) => cards[0].color === card.color);
    const handleSubmit = () => {
      playerDispatch({
        type: 'removeFromHand',
        payload: { playerName: currentPlayer!.name, cards: cards! },
      });
      decksDispatch({
        type: 'discard',
        payload: cards!,
      });
      infectionsDispatch({
        type: 'cureDisease',
        payload: { color: cards[0].color },
      });
      onSubmit();
    };
    return (
      <>
        <HandCureForm value={cards} onChange={setCards} />
        <SubmitButton disabled={disabled} onClick={handleSubmit} />
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
    const { researchStations } = useMapState();
    if (!currentPlayer) {
      return null;
    }

    const currentCity = currentPlayer?.currentLocation;
    const isInResearchStation = researchStations.includes(currentCity);
    const colorCount = currentPlayer?.hand.reduce(
      (acc, card) => {
        if (!isEventCard(card)) {
          acc[card.color] += 1;
        }
        return acc;
      },
      { red: 0, blue: 0, yellow: 0, black: 0 }
    );
    const hasCure = Object.values(colorCount).some((count) => count >= 5);
    const disabled = !hasCure || !isInResearchStation;
    return (
      <DefaultActionButton
        name={SCIENTIST_CURE_NAME}
        description={SCIENTIST_CURE_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={disabled}
      />
    );
  },
};
