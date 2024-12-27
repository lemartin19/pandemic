import { usePlayerDispatch } from '../../app/store/Players';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { Action } from '../../types/Action';
import { DefaultActionButton } from '../components/DefaultActionButton';
import { SubmitButton } from '../components/SubmitButton';
import { useDecksDispatch } from '../../app/store/Decks';
import { CityCard, isEventCard } from '../../types/Card';
import { useState } from 'react';
import { useMapState } from '../../app/store/Map';
import { useInfectionsDispatch } from '../../app/store/Infections';
import { HandCureForm } from '../components/HandCureForm';

const CURE_NAME = 'Cure';
const CURE_DESCRIPTION = 'Cure a disease by discarding 5 city cards of the same color.';

export const CURE: Action = {
  name: CURE_NAME,
  description: CURE_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [cards, setCards] = useState<CityCard[]>([]);
    const currentPlayer = useCurrentPlayer();
    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();
    const infectionsDispatch = useInfectionsDispatch();

    const disabled =
      cards.length !== 5 || !cards.every((card: CityCard) => cards[0].color === card.color);
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
        name={CURE_NAME}
        description={CURE_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={disabled}
      />
    );
  },
};
