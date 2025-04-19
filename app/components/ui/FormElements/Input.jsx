import { forwardRef } from 'react';
import './FormElements.css';

const Input = forwardRef(({
  type = 'text',
  label,
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
      <input
        ref={ref}
        type={type}
        className={`form-input ${error ? 'input-error' : ''}`}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <div className="error-text">{error}</div>}
      {helperText && <div className="helper-text">{helperText}</div>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;