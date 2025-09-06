import { useState } from 'react';
import { usePlayerDispatch, usePlayerState } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { useConnectedCities } from '../../../app/store/Map';
import { Action } from '../../../types/Action';
import { Location } from '../../../types/Map';
import { Player } from '../../../types/Player';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { LocationSelect } from '../../components/LocationSelect';
import { PlayerSelect } from '../../components/PlayerSelect';
import { SubmitButton } from '../../components/SubmitButton';

const DRIVE_FERRY_NAME = 'Drive/Ferry';
const DRIVE_FERRY_DESCRIPTION = 'Move a player to an adjacent city by driving or ferry.';

export const DRIVE_FERRY: Action = {
  name: DRIVE_FERRY_NAME,
  description: DRIVE_FERRY_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const currentPlayer = useCurrentPlayer();
    const { players } = usePlayerState();
    const [player, setPlayer] = useState<Player | null>(currentPlayer);
    const playerDispatch = usePlayerDispatch();
    const connectedCities = useConnectedCities(player?.currentLocation ?? '');

    const handleSubmit = () => {
      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: player!.name, location: location! },
      });
      onSubmit();
    };
    return (
      <>
        <PlayerSelect value={player} onChange={setPlayer} players={players} />
        <LocationSelect
          value={location}
          label="To"
          onChange={setLocation}
          availableLocations={connectedCities}
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
    return (
      <DefaultActionButton
        name={DRIVE_FERRY_NAME}
        description={DRIVE_FERRY_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  },
};
