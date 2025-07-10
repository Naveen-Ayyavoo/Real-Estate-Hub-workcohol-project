import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useLoginForm();

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google OAuth logic
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <header className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>Welcome Back</h1>
          <p className={styles.loginSubtitle}>Sign in to your account</p>
        </header>

        <form 
          className={styles.loginForm} 
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="login-email"
              name="email"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              aria-describedby={errors.email ? 'login-email-error' : undefined}
              required
            />
            {errors.email && (
              <span id="login-email-error" className="form-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              className={`form-input ${errors.password ? 'form-input--error' : ''}`}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              aria-describedby={errors.password ? 'login-password-error' : undefined}
              required
            />
            {errors.password && (
              <span id="login-password-error" className="form-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <div className={styles.formActions}>
            <a href="/forgot-password" className={styles.link}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full-width"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="btn__spinner" aria-hidden="true"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <div className={styles.formDivider}>
            <span className={styles.formDividerText}>or</span>
          </div>

          <button
            type="button"
            className="btn btn--secondary btn--full-width"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <span className={styles.googleIcon} aria-hidden="true">
              <img src="/goole.png" alt="" width="20" height="20" />
            </span>
            Sign in with Google
          </button>

          <p className={styles.loginFooter}>
            Don't have an account?{' '}
            <a href="/register" className={styles.link}>
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;