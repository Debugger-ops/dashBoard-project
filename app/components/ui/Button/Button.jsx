import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  icon,
  className = '',
  ...props
}) {
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size}
    ${fullWidth ? 'button-full-width' : ''}
    ${disabled ? 'button-disabled' : ''}
    ${icon ? 'button-with-icon' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
}