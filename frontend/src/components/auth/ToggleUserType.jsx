import React from 'react';

const ToggleUserType = ({ userType, onToggle }) => {
  return (
    <div className="toggle-container">
      <div className="toggle-wrapper" role="tablist" aria-label="User type selection">
        <button
          className={`toggle-option ${userType === 'buyer' ? 'toggle-option--active' : ''}`}
          onClick={() => onToggle('buyer')}
          role="tab"
          aria-selected={userType === 'buyer'}
          aria-controls="registration-form"
          type="button"
        >
          <span className="toggle-option__icon">🏠</span>
          <span className="toggle-option__text">Buyer</span>
        </button>
        <button
          className={`toggle-option ${userType === 'seller' ? 'toggle-option--active' : ''}`}
          onClick={() => onToggle('seller')}
          role="tab"
          aria-selected={userType === 'seller'}
          aria-controls="registration-form"
          type="button"
        >
          <span className="toggle-option__icon">🏢</span>
          <span className="toggle-option__text">Seller</span>
        </button>
      </div>
    </div>
  );
};

export default ToggleUserType;