import { useState } from 'react';
import { usePlayerDispatch } from '../../app/store/Players';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { Action } from '../../types/Action';
import { Location } from '../../types/Map';
import { AdjacentLocationForm } from '../components/AdjacentLocationForm';
import { DefaultActionButton } from '../components/DefaultActionButton';
import { SubmitButton } from '../components/SubmitButton';

const DRIVE_FERRY_NAME = 'Drive/Ferry';
const DRIVE_FERRY_DESCRIPTION = 'Drive or ferry to an adjacent city';

export const DRIVE_FERRY: Action = {
  name: DRIVE_FERRY_NAME,
  description: DRIVE_FERRY_DESCRIPTION,
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
        <AdjacentLocationForm value={location} onChange={setLocation} />
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
