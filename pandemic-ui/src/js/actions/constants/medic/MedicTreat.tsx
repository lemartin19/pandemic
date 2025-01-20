import { useState } from 'react';
import { useInfectionsDispatch, useInfectionsState } from '../../../app/store/Infections';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { Action } from '../../../types/Action';
import { Color } from '../../../types/Disease';
import { ColorSelect } from '../../components/ColorSelect';
import { DefaultActionButton } from '../../components/DefaultActionButton';
import { SubmitButton } from '../../components/SubmitButton';

const MEDIC_TREAT_DISEASE_NAME = 'Treat';
const MEDIC_TREAT_DISEASE_DESCRIPTION = 'Treat all diseases of the same color in a city';

export const MEDIC_TREAT_DISEASE: Action = {
  name: MEDIC_TREAT_DISEASE_NAME,
  description: MEDIC_TREAT_DISEASE_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [color, setColor] = useState<Color | null>(null);
    const currentPlayer = useCurrentPlayer();
    const infectionsDispatch = useInfectionsDispatch();
    const handleSubmit = () => {
      infectionsDispatch({
        type: 'treatDisease',
        payload: { location: currentPlayer!.currentLocation, color: color!, treatAll: true },
      });
      onSubmit();
    };
    return (
      <>
        <ColorSelect value={color} onChange={setColor} />
        <SubmitButton disabled={!color} onClick={handleSubmit} />
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
    const { infections } = useInfectionsState();
    const availableColors = currentPlayer
      ? Object.entries(infections[currentPlayer!.currentLocation])
          .filter(([__, count]) => count > 0)
          .map(([color]) => color)
      : [];

    const disabled = !availableColors.length;
    return (
      <DefaultActionButton
        name={MEDIC_TREAT_DISEASE_NAME}
        description={MEDIC_TREAT_DISEASE_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
        disabled={disabled}
      />
    );
  },
};
