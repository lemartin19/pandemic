import { useState } from 'react';
import { usePlayersInCity } from '../../../app/store/Players';
import { RadioGroup } from '../../../components/RadioGroup';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { isEventCard } from '../../../types/Card';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { ResearchGiveForm } from './ResearchGiveForm';
import { TakeForm } from './TakeForm';

const RESEARCHER_SHARE_KNOWLEDGE_NAME = 'Share Knowledge';
const RESEARCHER_SHARE_KNOWLEDGE_DESCRIPTION =
  'Give any city card from your hand to another player in the same city, or take the city card of your current location from another player';

export const RESEARCHER_SHARE_KNOWLEDGE: Action = {
  name: RESEARCHER_SHARE_KNOWLEDGE_NAME,
  description: RESEARCHER_SHARE_KNOWLEDGE_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [actionType, setActionType] = useState<'give' | 'take'>('give');
    const currentPlayer = useCurrentPlayer();
    const playersInCity = usePlayersInCity(currentPlayer!.currentLocation);

    const otherPlayersInCity = playersInCity.filter(
      (player) => player.name !== currentPlayer!.name
    );

    const canTakeCurrentCityCard = otherPlayersInCity.some((player) =>
      player.hand.some((card) => !isEventCard(card) && card.name === currentPlayer!.currentLocation)
    );

    const hasCityCardsToGive = currentPlayer!.hand.some((card) => !isEventCard(card));

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
        {actionType === 'give' && (
          <ResearchGiveForm otherPlayersInCity={otherPlayersInCity} onSubmit={onSubmit} />
        )}

        {actionType === 'take' && (
          <TakeForm otherPlayersInCity={otherPlayersInCity} onSubmit={onSubmit} />
        )}
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
