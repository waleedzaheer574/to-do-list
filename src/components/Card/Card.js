import React from 'react';
import './Card.css';

const Card = ({
  children,
  title,
  subtitle,
  image,
  imageAlt = 'Card image',
  footer,
  variant = 'default',
  hoverable = false,
  bordered = true,
  elevated = false,
  onClick,
  actions,
  ...props
}) => {
  
  const cardClasses = [
    'card',
    `card-${variant}`,
    hoverable ? 'card-hoverable' : '',
    bordered ? 'card-bordered' : '',
    elevated ? 'card-elevated' : '',
    onClick ? 'card-clickable' : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
      {...props}
    >
      {image && (
        <div className="card-image-container">
          <img src={image} alt={imageAlt} className="card-image" />
          {image && title && <div className="card-image-overlay"></div>}
        </div>
      )}
      
      <div className="card-content">
        {(title || subtitle) && (
          <div className="card-header">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        )}
        
        <div className="card-body">
          {children}
        </div>
        
        {(footer || actions) && (
          <div className="card-footer">
            {footer && <div className="card-footer-content">{footer}</div>}
            {actions && (
              <div className="card-actions">
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
      
      {hoverable && (
        <div className="card-hover-effect"></div>
      )}
    </div>
  );
};

export default Card;