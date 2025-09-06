import { useState } from 'react';
import { useDecksDispatch } from '../../../app/store/Decks';
import { usePlayerDispatch, usePlayerState } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { PlayerSelect } from '../../components/PlayerSelect';
import { SubmitButton } from '../../components/SubmitButton';
import { Player } from '../../../types/Player';
import { LocationSelect } from '../../components/LocationSelect';
import { useMapState } from '../../../app/store/Map';
import { Location } from '../../../types/Map';

const CHARTER_NAME = 'Charter';
const CHARTER_DESCRIPTION =
  'Charter a flight to any city for a player on the board by discarding the city card for their current location.';

export const DISPATCHER_CHARTER: Action = {
  name: CHARTER_NAME,
  description: CHARTER_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const currentPlayer = useCurrentPlayer();
    const { players } = usePlayerState();
    const { map } = useMapState();
    const [player, setPlayer] = useState<Player | null>(currentPlayer);
    const [location, setLocation] = useState<Location | null>(null);

    const playerDispatch = usePlayerDispatch();
    const decksDispatch = useDecksDispatch();

    const handleSubmit = () => {
      const cityCard = currentPlayer?.hand.find((card) => card.name === player?.currentLocation);
      if (!cityCard || !location) {
        return;
      }

      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: player!.name, location },
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
        <PlayerSelect value={player} onChange={setPlayer} players={players} />
        <LocationSelect
          value={location}
          onChange={setLocation}
          availableLocations={map.map((city) => city.name)}
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
