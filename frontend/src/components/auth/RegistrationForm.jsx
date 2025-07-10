import React from 'react';
import { useRegistrationForm } from '../../hooks/useRegistrationForm';
import ToggleUserType from './ToggleUserType';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const {
    userType,
    setUserType,
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useRegistrationForm();

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    // Implement Google OAuth logic
  };

  return (
    <div className={styles.registrationPage}>
      <div className={styles.registrationContainer}>
        <header className={styles.registrationHeader}>
          <h1 className={styles.registrationTitle}>Join Our Real Estate Platform</h1>
          <p className={styles.registrationSubtitle}>
            {userType === 'buyer' ? 'Find your dream home' : 'List and sell properties'}
          </p>
        </header>

        <ToggleUserType userType={userType} onToggle={setUserType} />

        <form 
          className={styles.registrationForm} 
          id="registration-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              required
            />
            {errors.fullName && (
              <span id="fullName-error" className="form-error" role="alert">
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && (
              <span id="email-error" className="form-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password ? 'form-input--error' : ''}`}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              aria-describedby={errors.password ? 'password-error' : 'password-help'}
              required
            />
            <div id="password-help" className="form-help">
              Password must be at least 8 characters long
            </div>
            {errors.password && (
              <span id="password-error" className="form-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full-width"
            disabled={isLoading}
            aria-describedby="signup-status"
          >
            {isLoading ? (
              <>
                <span className="btn__spinner" aria-hidden="true"></span>
                Creating Account...
              </>
            ) : (
              `Sign Up as ${userType === 'buyer' ? 'Buyer' : 'Seller'}`
            )}
          </button>

          <div className={styles.formDivider}>
            <span className={styles.formDividerText}>or</span>
          </div>

          <button
            type="button"
            className="btn btn--secondary btn--full-width"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <span className={styles.googleIcon} aria-hidden="true">
              <img src="/goole.png" alt="" width="20" height="20" />
            </span>
            Sign up with Google
          </button>

          <p className={styles.registrationFooter}>
            Already have an account?{' '}
            <a href="/login" className={styles.link}>
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;