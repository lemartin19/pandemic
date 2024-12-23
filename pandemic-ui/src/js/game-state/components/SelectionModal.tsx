import { ActionModal } from '../../actions/components/ActionModal';
import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { DiscardModal } from './DiscardModal';

export function SelectionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const currentGameplayState = useCurrentGameplayState();

  switch (currentGameplayState?.type) {
    case 'waitingForPlayerAction':
      return <ActionModal isOpen={isOpen} onClose={onClose} />;
    case 'waitingForPlayerDiscard':
      return (
        <DiscardModal
          isOpen={isOpen}
          onClose={onClose}
          playerName={currentGameplayState.playerName}
        />
      );
    default:
      return null;
  }
}
SelectionModal.displayName = 'SelectionModal';
