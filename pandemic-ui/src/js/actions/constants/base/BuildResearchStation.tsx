import { useDecksDispatch } from '../../../app/store/Decks';
import { useMapDispatch } from '../../../app/store/Map';
import { usePlayerDispatch } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { SubmitButton } from '../../components/SubmitButton';

const BUILD_RESEARCH_STATION_NAME = 'Build Research Station';
const BUILD_RESEARCH_STATION_DESCRIPTION =
  'Build a research station in your current city by discarding its city card.';

export const BUILD_RESEARCH_STATION: Action = {
  name: BUILD_RESEARCH_STATION_NAME,
  description: BUILD_RESEARCH_STATION_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const currentPlayer = useCurrentPlayer();
    const mapDispatch = useMapDispatch();
    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();
    const handleSubmit = () => {
      const cityCard = currentPlayer?.hand.find(
        (card) => card.name === currentPlayer?.currentLocation
      );
      if (!cityCard) {
        return;
      }

      mapDispatch({
        type: 'buildResearchStation',
        payload: { location: currentPlayer!.currentLocation },
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
    return <SubmitButton onClick={handleSubmit} />;
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
        name={BUILD_RESEARCH_STATION_NAME}
        description={BUILD_RESEARCH_STATION_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={disabled}
      />
    );
  },
};
