import React, { useEffect, useState } from 'react';
import './MessageToast.css'; 

const MessageToast = ({ message, type, buttonText, onButtonClick }) => {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      setFadeOut(false);
      const timeout = setTimeout(() => setFadeOut(true), 4500); 
      const hideTimeout = setTimeout(() => setShow(false), 5000); 

      return () => {
        clearTimeout(timeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [message]);

  if (!message || !show) return null;

  return (
    <div className={`toast toast--${type} ${fadeOut ? 'toast--fade-out' : 'toast--slide-in'}`}>
      <span>{message}</span>
      {buttonText && (
        <button className="toast__button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default MessageToast;