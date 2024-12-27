import { useState } from 'react';
import { Action } from '../../types/Action';
import { SubmitButton } from '../components/SubmitButton';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { usePlayerDispatch } from '../../app/store/Players';
import { ResearchStationForm } from '../components/ResearchStationForm';
import { Location } from '../../types/Map';
import { DefaultActionButton } from '../components/DefaultActionButton';
import { useMapState } from '../../app/store/Map';

const SHUTTLE_NAME = 'Shuttle';
const SHUTTLE_DESCRIPTION = 'Move your player between research stations.';

export const SHUTTLE: Action = {
  name: SHUTTLE_NAME,
  description: SHUTTLE_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const currentPlayer = useCurrentPlayer();
    const playerDispatch = usePlayerDispatch();
    const handleSubmit = () => {
      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: currentPlayer!.name, location: location! },
      });
      onSubmit();
    };
    return (
      <>
        <ResearchStationForm value={location} onChange={setLocation} />
        <SubmitButton disabled={!location} onClick={handleSubmit} />
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
    const disabled =
      !currentPlayer?.currentLocation || !researchStations.includes(currentPlayer.currentLocation);
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
