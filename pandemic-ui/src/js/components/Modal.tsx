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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className={`bg-white rounded-lg shadow-lg w-[90%] max-w-lg max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 ${className}`.trim()}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <h2 className="m-0 text-xl font-semibold text-gray-800" id="modal-title">
            {title}
          </h2>
          <button 
            className="bg-none border-none text-2xl leading-none p-1 px-2 cursor-pointer text-gray-600 rounded hover:bg-gray-100 hover:text-gray-800 transition-colors" 
            onClick={onClose} 
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.displayName = 'Modal';
