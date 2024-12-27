import '../../../css/Actions.css';

import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Action } from '../../types/Action';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';

export function ActionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [actionName, setActionName] = useState<Action['name'] | null>(null);
  const currentPlayer = useCurrentPlayer();
  const action = currentPlayer?.role.actions.find((action) => action.name === actionName);
  if (!currentPlayer) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${currentPlayer.name}: Take Action`}
      className="ActionModal"
    >
      <div className="ActionModal-actions">
        {currentPlayer.role.actions.map(({ name, ActionButton }) => (
          <ActionButton key={name} isSelected={name === actionName} onSelect={setActionName} />
        ))}
      </div>
      {action ? <action.ActionForm /> : null}
    </Modal>
  );
}
ActionModal.displayName = 'ActionModal';
