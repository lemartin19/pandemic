import { ActionModal } from '../../actions/components/ActionModal';
import { useCurrentGameplayState, useGamePlayQueueDispatch } from '../../app/store/GamePlayQueue';
import { DiscardModal } from './DiscardModal';

export function SelectionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const currentGameplayState = useCurrentGameplayState();
  const dispatch = useGamePlayQueueDispatch();

  const onSubmit = () => {
    onClose();
    dispatch({ type: 'nextGameplayState' });
  };

  switch (currentGameplayState?.type) {
    case 'waitingForPlayerAction':
      return <ActionModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />;
    case 'waitingForPlayerDiscard':
      return (
        <DiscardModal
          isOpen={isOpen}
          onClose={onClose}
          playerName={currentGameplayState.playerName}
          onSubmit={onSubmit}
        />
      );
    default:
      return null;
  }
}
SelectionModal.displayName = 'SelectionModal';
