import './Card.css';

export default function Card({
  children,
  title,
  subtitle,
  footer,
  className = '',
  elevation = 1,
  actions,
  hoverable = false,
  ...props
}) {
  return (
    <div 
      className={`
        card 
        card-elevation-${elevation}
        ${hoverable ? 'card-hoverable' : ''}
        ${className}
      `}
      {...props}
    >
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <div className="card-subtitle">{subtitle}</div>}
        </div>
      )}
      
      <div className="card-content">
        {children}
      </div>
      
      {(footer || actions) && (
        <div className="card-footer">
          {footer}
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
    </div>
  );
}
