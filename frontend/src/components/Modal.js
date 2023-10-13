import {React} from 'react';

const Modal = ({ isOpen, closeModal, content, icon }) => {
    if (!isOpen) return null;

    return (
        <div id="successModal" className="modal">
        <div className="modal-content">
          {icon === 'success-icon' ? <span className={icon}>&#10004;</span> : <span className={icon}>&#10060;</span>}
          <p>{content}</p>
          <button className="close-button" onClick={closeModal}>Close</button>
        </div>
      </div>
    );
  };
  
  export default Modal;