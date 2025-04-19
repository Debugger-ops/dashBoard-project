import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import './Modal.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showCloseButton = true,
}) {
  const modalRef = useRef();

  useEffect(() => {
    const handleEsc = (event) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal modal-${size}`} ref={modalRef}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          {showCloseButton && (
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          )}
        </div>
        <div className="modal-content">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}