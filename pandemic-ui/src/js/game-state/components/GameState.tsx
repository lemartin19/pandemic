import '../../../css/GameState.css';

import { useState } from 'react';
import { DoTurnButton } from './DoTurnButton';
import { InfectionRate } from './InfectionRate';
import { OutbreaksLeft } from './OutbreaksLeft';
import { useCurrentGameplayState, useGamePlayQueueDispatch } from '../../app/store/GamePlayQueue';
import { SelectionModal } from './SelectionModal';

function useClickDoTurn() {
  const currentGameplayState = useCurrentGameplayState();
  const dispatch = useGamePlayQueueDispatch();
  const [isSelectionModalOpen, setSelectionModalOpen] = useState(false);

  const onClickDoTurn = () => {
    if (
      currentGameplayState?.type === 'waitingForPlayerAction' ||
      currentGameplayState?.type === 'waitingForPlayerDiscard'
    ) {
      setSelectionModalOpen(true);
    } else {
      dispatch({ type: 'nextGameplayState' });
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
