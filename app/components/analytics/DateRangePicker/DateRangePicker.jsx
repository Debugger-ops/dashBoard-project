import { useState } from 'react';
import './DateRangePicker.css'; // Regular CSS file

export default function DateRangePicker({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value) || options[0];

  return (
    <div className="dateRangePicker">
      <button 
        className="dateRangeButton"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="calendarIcon">📅</span>
        <span>{selectedOption.label}</span>
        <span className="arrowIcon">▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown">
          {options.map((option) => (
            <div 
              key={option.value}
              className={`option ${option.value === value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
