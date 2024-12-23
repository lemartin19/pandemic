import { Modal } from '../../components/Modal';

export function ActionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Do an action">
      <div>ActionModal</div>
    </Modal>
  );
}
ActionModal.displayName = 'ActionModal';
