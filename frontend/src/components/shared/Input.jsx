import React from 'react';

const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  className = '',
  ...props
}) => {
  const inputId = id || name;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpId = helpText ? `${inputId}-help` : undefined;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && ' *'}
        </label>
      )}
      
      <input
        type={type}
        id={inputId}
        name={name}
        className={`form-input ${error ? 'form-input--error' : ''} ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      
      {helpText && (
        <div id={helpId} className="form-help">
          {helpText}
        </div>
      )}
      
      {error && (
        <span id={errorId} className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;