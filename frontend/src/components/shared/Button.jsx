import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    ghost: 'btn--ghost',
    danger: 'btn--danger'
  };
  const sizeClasses = {
    small: 'btn--small',
    medium: '',
    large: 'btn--large'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'btn--full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true"></span>}
      {children}
    </button>
  );
};

export default Button;