import '../../css/Modal.css';
import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="Modal-overlay" onClick={onClose}>
      <div
        className={`Modal ${className}`.trim()}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="Modal-header">
          <h2 className="Modal-title" id="modal-title">
            {title}
          </h2>
          <button className="Modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="Modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.displayName = 'Modal';
