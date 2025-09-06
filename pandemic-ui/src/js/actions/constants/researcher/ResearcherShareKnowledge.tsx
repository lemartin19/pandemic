import { useState } from 'react';
import { usePlayerDispatch, usePlayersInCity } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { CityCard, isEventCard } from '../../../types/Card';
import { Player } from '../../../types/Player';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { HandLocationForm } from '../../components/HandLocationForm';
import { PlayerSelect } from '../../components/PlayerSelect';
import { RadioGroup } from '../../../components/RadioGroup';
import { SubmitButton } from '../../components/SubmitButton';

const RESEARCHER_SHARE_KNOWLEDGE_NAME = 'Share Knowledge';
const RESEARCHER_SHARE_KNOWLEDGE_DESCRIPTION =
  'Give any city card from your hand to another player in the same city, or take the city card of your current location from another player';

export const RESEARCHER_SHARE_KNOWLEDGE: Action = {
  name: RESEARCHER_SHARE_KNOWLEDGE_NAME,
  description: RESEARCHER_SHARE_KNOWLEDGE_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [playerToShareWith, setPlayerToShareWith] = useState<Player | null>(null);
    const [card, setCard] = useState<CityCard | null>(null);
    const [actionType, setActionType] = useState<'give' | 'take'>('give');
    const currentPlayer = useCurrentPlayer();
    const playersInCity = usePlayersInCity(currentPlayer!.currentLocation);
    const playerDispatch = usePlayerDispatch();

    const otherPlayersInCity = playersInCity.filter(
      (player) => player.name !== currentPlayer!.name
    );

    const canTakeCurrentCityCard = otherPlayersInCity.some((player) =>
      player.hand.some((card) => !isEventCard(card) && card.name === currentPlayer!.currentLocation)
    );

    const hasCityCardsToGive = currentPlayer!.hand.some((card) => !isEventCard(card));

    const handleSubmit = () => {
      if (actionType === 'give' && card && playerToShareWith) {
        playerDispatch({
          type: 'removeFromHand',
          payload: { playerName: currentPlayer!.name, cards: [card] },
        });
        playerDispatch({
          type: 'addToHand',
          payload: { playerName: playerToShareWith.name, cards: [card] },
        });
      } else if (actionType === 'take' && playerToShareWith) {
        const currentCityCard = playerToShareWith.hand.find(
          (card) => !isEventCard(card) && card.name === currentPlayer!.currentLocation
        );

        if (currentCityCard) {
          playerDispatch({
            type: 'removeFromHand',
            payload: { playerName: playerToShareWith.name, cards: [currentCityCard] },
          });
          playerDispatch({
            type: 'addToHand',
            payload: { playerName: currentPlayer!.name, cards: [currentCityCard] },
          });
        }
      }
      onSubmit();
    };

    const isSubmitDisabled = !playerToShareWith || (actionType === 'give' && !card);

    const radioOptions = [
      {
        value: 'give' as const,
        label: 'Give card to player',
        disabled: !hasCityCardsToGive,
      },
      {
        value: 'take' as const,
        label: `Take ${currentPlayer!.currentLocation} card from player`,
        disabled: !canTakeCurrentCityCard,
      },
    ];

    return (
      <>
        <RadioGroup
          name="share-knowledge-action"
          value={actionType}
          onChange={setActionType}
          options={radioOptions}
          orientation="horizontal"
        />
        <PlayerSelect
          value={playerToShareWith}
          onChange={setPlayerToShareWith}
          players={otherPlayersInCity}
        />
        {actionType === 'give' && <HandLocationForm value={card} onChange={setCard} />}
        <SubmitButton disabled={isSubmitDisabled} onClick={handleSubmit} />
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
    if (!currentPlayer) {
      throw new Error('Current player not found');
    }

    const playersInCity = usePlayersInCity(currentPlayer!.currentLocation);
    const otherPlayersInCity = playersInCity.filter(
      (player) => player.name !== currentPlayer!.name
    );

    const hasCityCardsToGive = currentPlayer.hand.some((card) => !isEventCard(card));
    const canTakeCurrentCityCard = otherPlayersInCity.some((player) =>
      player.hand.some((card) => !isEventCard(card) && card.name === currentPlayer.currentLocation)
    );

    const disabled = !otherPlayersInCity.length || (!hasCityCardsToGive && !canTakeCurrentCityCard);

    return (
      <DefaultActionButton
        disabled={disabled}
        name={RESEARCHER_SHARE_KNOWLEDGE_NAME}
        description={RESEARCHER_SHARE_KNOWLEDGE_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  },
};
