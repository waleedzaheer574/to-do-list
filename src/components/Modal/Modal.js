import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  closeOnEsc = true,
  animation = 'fade',
  position = 'center',
  ...props
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (closeOnEsc) {
        const handleEsc = (e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEsc, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  const modalClasses = [
    'modal',
    `modal-${size}`,
    `modal-${position}`,
    `modal-animation-${animation}`,
    isOpen ? 'modal-open' : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      className="modal-overlay" 
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div 
        className={modalClasses} 
        ref={modalRef}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        {...props}
      >
        <div className="modal-container">
          {/* Modal Header */}
          <div className="modal-header">
            {title && (
              <h2 id="modal-title" className="modal-title">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button 
                className="modal-close-btn" 
                onClick={onClose}
                aria-label="Close modal"
              >
                <span className="modal-close-icon">×</span>
              </button>
            )}
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {children}
          </div>

          {/* Modal Footer */}
          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;