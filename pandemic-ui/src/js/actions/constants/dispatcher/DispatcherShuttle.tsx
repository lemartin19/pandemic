import { useState } from 'react';
import { useMapState } from '../../../app/store/Map';
import { usePlayerDispatch, usePlayerState } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { Location } from '../../../types/Map';
import { Player } from '../../../types/Player';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { PlayerSelect } from '../../components/PlayerSelect';
import { ResearchStationForm } from '../../components/ResearchStationForm';
import { SubmitButton } from '../../components/SubmitButton';

const SHUTTLE_NAME = 'Shuttle';
const SHUTTLE_DESCRIPTION = 'Move a player between research stations.';

export const DISPATCHER_SHUTTLE: Action = {
  name: SHUTTLE_NAME,
  description: SHUTTLE_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const currentPlayer = useCurrentPlayer();
    const { players } = usePlayerState();
    const { researchStations } = useMapState();
    const [player, setPlayer] = useState<Player | null>(currentPlayer);
    const playerDispatch = usePlayerDispatch();

    const playersAtResearchStations = players.filter(
      (p) => p.currentLocation && researchStations.includes(p.currentLocation)
    );

    const handleSubmit = () => {
      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: player!.name, location: location! },
      });
      onSubmit();
    };
    return (
      <>
        <PlayerSelect value={player} onChange={setPlayer} players={playersAtResearchStations} />
        <ResearchStationForm value={location} onChange={setLocation} />
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
    const { players } = usePlayerState();
    const { researchStations } = useMapState();
    const disabled = !players.some(
      (player) => player.currentLocation && researchStations.includes(player.currentLocation)
    );
    return (
      <DefaultActionButton
        name={SHUTTLE_NAME}
        description={SHUTTLE_DESCRIPTION}
        disabled={disabled}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  },
};
