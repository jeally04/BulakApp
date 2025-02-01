// Modal.jsx
import React from 'react';
import './Modal.css'; // Create a CSS file for styling the modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
