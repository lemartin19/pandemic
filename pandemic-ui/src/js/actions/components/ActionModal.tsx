import '../../../css/Actions.css';

import { useState } from 'react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Action } from '../../types/Action';
import { useDoAction } from '../hooks/useDoAction';
import { InProgressAction } from '../types/InProgressAction';
import { ActionForm } from './ActionForm';
import { ActionTypeSelect } from './ActionTypeSelect';

function isActionComplete(action: InProgressAction) {
  return (
    (action.type === 'driveFerry' && action.to !== undefined) ||
    (action.type === 'shuttle' && action.to !== undefined) ||
    (action.type === 'fly' && action.cityCard !== undefined) ||
    (action.type === 'charter' && action.cityCard !== undefined && action.to !== undefined) ||
    (action.type === 'buildResearchStation' && action.cityCard !== undefined) ||
    (action.type === 'treatDisease' && action.color !== undefined) ||
    (action.type === 'shareKnowledge' &&
      action.cityCard !== undefined &&
      action.playerName !== undefined)
  );
}

export function ActionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [action, setAction] = useState<InProgressAction>({
    type: 'driveFerry',
  });
  const doAction = useDoAction();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Do an action">
      <ActionTypeSelect
        type={action.type}
        onSelect={(type: Action['type']) => setAction({ type })}
      />
      <ActionForm action={action} updateAction={setAction} />
      <Button disabled={!isActionComplete(action)} onClick={() => doAction(action as Action)}>
        Submit
      </Button>
    </Modal>
  );
}
ActionModal.displayName = 'ActionModal';
