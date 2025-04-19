import { forwardRef } from 'react';
import './FormElements.css';

const Select = forwardRef(({
  label,
  options = [],
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`form-control ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={`form-select ${error ? 'select-error' : ''}`}
        disabled={disabled}
        required={required}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="error-text">{error}</div>}
      {helperText && <div className="helper-text">{helperText}</div>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
