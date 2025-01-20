import { useState } from 'react';
import { useMapState } from '../../../app/store/Map';
import { usePlayerDispatch } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { Location } from '../../../types/Map';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { ResearchStationForm } from '../../components/ResearchStationForm';
import { SubmitButton } from '../../components/SubmitButton';

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
