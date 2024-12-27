import { usePlayerDispatch } from '../../app/store/Players';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { Action } from '../../types/Action';
import { DefaultActionButton } from '../components/DefaultActionButton';
import { SubmitButton } from '../components/SubmitButton';
import { useDecksDispatch } from '../../app/store/Decks';

const CHARTER_NAME = 'Charter';
const CHARTER_DESCRIPTION =
  'Charter a flight to any city by discarding the city card for your current location.';

export const CHARTER: Action = {
  name: CHARTER_NAME,
  description: CHARTER_DESCRIPTION,
  ActionForm: () => {
    const currentPlayer = useCurrentPlayer();
    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();
    const onSubmit = () => {
      const cityCard = currentPlayer?.hand.find(
        (card) => card.name === currentPlayer?.currentLocation
      );
      if (!cityCard) {
        return;
      }

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
    };
    return <SubmitButton onClick={onSubmit} />;
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
