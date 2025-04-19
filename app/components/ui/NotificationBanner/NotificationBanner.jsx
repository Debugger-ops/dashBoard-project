import { useState, useEffect } from 'react';
import './NotificationBanner.css';

export default function NotificationBanner({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  isVisible = true,
}) {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    let timer;
    if (visible && duration !== 0) {
      timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className={`notification-banner notification-${type}`}>
      <div className="notification-content">{message}</div>
      <button className="notification-close" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
}
