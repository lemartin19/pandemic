import { ActionModal } from '../../actions/components/ActionModal';
import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { useAdvanceGameplayState } from '../hooks/useAdvanceGameplayState';
import { DiscardModal } from './DiscardModal';

export function SelectionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const currentGameplayState = useCurrentGameplayState();
  const advanceGameplayState = useAdvanceGameplayState();

  const onSubmit = () => {
    onClose();
    advanceGameplayState();
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
