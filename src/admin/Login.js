import React, { useState } from 'react';
import styles from './login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt with:', { email, password, rememberMe });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2 className={styles.loginTitle}>Welcome Back</h2>
          <p className={styles.loginSubtitle}>Please enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className={styles.formOptions}>
            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
                Remember me
              </label>
            </div>
            <a href="#forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className={styles.signupLink}>
           Only Admin Login Here
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;