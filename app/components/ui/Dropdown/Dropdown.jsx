import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export default function Dropdown({
  trigger,
  children,
  position = 'bottom-left',
  closeOnSelect = true,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSelect = () => {
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        {trigger}
      </div>
      {isOpen && (
        <div className={`dropdown-menu dropdown-${position}`}>
          <div className="dropdown-content" onClick={handleSelect}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}