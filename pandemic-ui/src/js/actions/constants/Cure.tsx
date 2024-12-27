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

const CHARTER_NAME = 'Charter';
const CHARTER_DESCRIPTION =
  'Charter a flight to any city by discarding the city card for your current location.';

export const CHARTER: Action = {
  name: CHARTER_NAME,
  description: CHARTER_DESCRIPTION,
  ActionForm: () => {
    const [cards, setCards] = useState<CityCard[]>([]);
    const currentPlayer = useCurrentPlayer();
    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();
    const infectionsDispatch = useInfectionsDispatch();

    const disabled =
      cards.length !== 5 || !cards.every((card: CityCard) => cards[0].color === card.color);
    const onSubmit = () => {
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
    };
    return (
      <>
        <HandCureForm value={cards} onChange={setCards} />
        <SubmitButton disabled={disabled} onClick={onSubmit} />
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
        name={CHARTER_NAME}
        description={CHARTER_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={disabled}
      />
    );
  },
};
