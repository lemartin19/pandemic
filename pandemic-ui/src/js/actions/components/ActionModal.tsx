import '../../../css/Actions.css';

import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { Action } from '../../types/Action';
import { useDoAction } from '../hooks/useDoAction';
import { Button } from '../../components/Button';
import { ActionTypeSelect } from './ActionTypeSelect';
import { ActionForm } from './ActionForm';

type InProgressAction = Pick<Action, 'type'> & Partial<Action>;

function isActionComplete(action: InProgressAction) {
  return (
    (action.type === 'driveFerry' && action.to !== undefined) ||
    (action.type === 'shuttle' && action.to !== undefined) ||
    (action.type === 'fly' && action.cityCard !== undefined) ||
    (action.type === 'charter' && action.cityCard !== undefined && action.to !== undefined) ||
    (action.type === 'buildResearchStation' && action.cityCard !== undefined) ||
    action.type === 'treatDisease' ||
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
      <ActionForm />
      <Button disabled={!isActionComplete(action)} onClick={() => doAction(action as Action)}>
        Submit
      </Button>
    </Modal>
  );
}
ActionModal.displayName = 'ActionModal';
