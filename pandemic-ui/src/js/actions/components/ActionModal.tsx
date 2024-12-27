import '../../../css/Actions.css';

import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Action } from '../../types/Action';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';

export function ActionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [actionName, setActionName] = useState<Action['name']>('Drive/Ferry');
  const currentPlayer = useCurrentPlayer();
  const action = currentPlayer?.role.actions.find((action) => action.name === actionName);
  if (!currentPlayer || !action) {
    return null;
  }

  const { ActionForm } = action;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Do an action" className="ActionModal">
      <div className="ActionModal-actions">
        {currentPlayer.role.actions.map(({ name, ActionButton }) => (
          <ActionButton
            key={name}
            isSelected={action.name === actionName}
            onSelect={setActionName}
          />
        ))}
      </div>
      <ActionForm />
    </Modal>
  );
}
ActionModal.displayName = 'ActionModal';
