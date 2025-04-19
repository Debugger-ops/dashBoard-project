import { forwardRef } from 'react';
import './FormElements.css';

const Checkbox = forwardRef(({
  label,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`form-control checkbox-control ${className}`}>
      <label className="checkbox-label">
        <input
          ref={ref}
          type="checkbox"
          className={`form-checkbox ${error ? 'checkbox-error' : ''}`}
          disabled={disabled}
          {...props}
        />
        <span className="checkbox-text">{label}</span>
      </label>
      {error && <div className="error-text">{error}</div>}
      {helperText && <div className="helper-text">{helperText}</div>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;