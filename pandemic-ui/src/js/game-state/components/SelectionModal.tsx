import { ActionModal } from '../../actions/components/ActionModal';
import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { useDispatchNextGameplayState } from '../hooks/useDispatchNextGameplayState';
import { DiscardModal } from './DiscardModal';

export function SelectionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const currentGameplayState = useCurrentGameplayState();
  const dispatchNextGameplayState = useDispatchNextGameplayState();

  const onSubmit = () => {
    onClose();
    dispatchNextGameplayState();
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
