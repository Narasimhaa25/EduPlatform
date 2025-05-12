import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign-In Successful:', user);
      navigate('/'); // Redirect after successful login
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }
    console.log('Form submitted:', { email, password });
    // Add email/password authentication here if required
  };

  return (
    <div className="login-container">
      <div className="background-animation">
        {[...Array(15)].map((_, i) => (
          <span key={i} className="floating-code"></span>
        ))}
      </div>
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="login-title">Welcome Back</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            Log In
          </button>
        </form>
        <div className="social-login">
          <p>Or log in with:</p>
          <div className="social-buttons">
            <button
              onClick={handleGoogleLogin}
              className="google-btn"
              disabled={isLoading}
            >
              <img
                src="/google-icon.svg"
                alt="Google"
                className="social-icon"
              />
              {isLoading ? 'Loading...' : 'Google'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
