import { useState } from 'react';
import { useDecksDispatch } from '../../../app/store/Decks';
import { usePlayerDispatch, usePlayerState } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { isEventCard } from '../../../types/Card';
import { Location } from '../../../types/Map';
import { Player } from '../../../types/Player';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { LocationSelect } from '../../components/LocationSelect';
import { PlayerSelect } from '../../components/PlayerSelect';
import { SubmitButton } from '../../components/SubmitButton';

const FLY_NAME = 'Fly';
const FLY_DESCRIPTION = 'Move a player to a city by discarding its city card from their hand.';

export const FLY: Action = {
  name: FLY_NAME,
  description: FLY_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const currentPlayer = useCurrentPlayer();
    const { players } = usePlayerState();
    const [player, setPlayer] = useState<Player | null>(currentPlayer);
    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();

    const handleSubmit = () => {
      const cityCard = currentPlayer?.hand.find(
        (card) => !isEventCard(card) && card.name === location
      );
      if (!cityCard || !player) return;

      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: player.name, location: cityCard.name },
      });
      playerDispatch({
        type: 'removeFromHand',
        payload: { playerName: currentPlayer!.name, cards: [cityCard] },
      });
      decksDispatch({
        type: 'discard',
        payload: [cityCard],
      });
      onSubmit();
    };

    const availableLocations =
      currentPlayer?.hand.filter((card) => !isEventCard(card)).map((card) => card.name) || [];

    return (
      <>
        <PlayerSelect value={player} onChange={setPlayer} players={players} />
        <LocationSelect
          value={location}
          label="To"
          onChange={setLocation}
          availableLocations={availableLocations}
        />
        <SubmitButton disabled={!player || !location} onClick={handleSubmit} />
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
    return (
      <DefaultActionButton
        name={FLY_NAME}
        description={FLY_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={!hasCityCards}
      />
    );
  },
};
