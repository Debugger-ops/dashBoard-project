import { useState, useRef } from 'react';
import './Tooltip.css';

export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 300,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <div
      className={`tooltip-container ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={`tooltip tooltip-${position}`}>
          {content}
        </div>
      )}
    </div>
  );
}