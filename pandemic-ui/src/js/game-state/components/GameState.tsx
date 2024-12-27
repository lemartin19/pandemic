import '../../../css/GameState.css';

import { useEffect, useState } from 'react';
import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { useDispatchNextGameplayState } from '../hooks/useDispatchNextGameplayState';
import { DoTurnButton } from './DoTurnButton';
import { InfectionRate } from './InfectionRate';
import { OutbreaksLeft } from './OutbreaksLeft';
import { SelectionModal } from './SelectionModal';

function useClickDoTurn() {
  const currentGameplayState = useCurrentGameplayState();
  const dispatchNextGameplayState = useDispatchNextGameplayState();
  const [isSelectionModalOpen, setSelectionModalOpen] = useState(false);

  useEffect(() => {
    if (!currentGameplayState) {
      dispatchNextGameplayState();
    }
  }, [currentGameplayState]);

  const onClickDoTurn = () => {
    if (
      currentGameplayState?.type === 'waitingForPlayerAction' ||
      currentGameplayState?.type === 'waitingForPlayerDiscard'
    ) {
      setSelectionModalOpen(true);
    } else {
      dispatchNextGameplayState();
    }
  };

  return {
    isSelectionModalOpen,
    onClickDoTurn,
    closeSelectionModal: () => setSelectionModalOpen(false),
  };
}

export function GameState() {
  const { isSelectionModalOpen, onClickDoTurn, closeSelectionModal } = useClickDoTurn();
  return (
    <div className="GameState">
      <div className="GameState-status">
        <InfectionRate />
        <OutbreaksLeft />
      </div>
      <DoTurnButton onClick={onClickDoTurn} />
      <SelectionModal isOpen={isSelectionModalOpen} onClose={closeSelectionModal} />
    </div>
  );
}
GameState.displayName = 'GameState';
