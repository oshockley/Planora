import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock user storage (in real app, this would be a backend API)
  const getStoredUsers = () => {
    const users = localStorage.getItem('planora_users');
    return users ? JSON.parse(users) : [];
  };

  const saveUser = (user) => {
    const users = getStoredUsers();
    users.push(user);
    localStorage.setItem('planora_users', JSON.stringify(users));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Check if username or email already exists
      const users = getStoredUsers();
      if (users.some(user => user.username === formData.username)) {
        newErrors.username = 'Username already exists';
      }
      if (users.some(user => user.email === formData.email)) {
        newErrors.email = 'Email already registered';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (isLogin) {
        // Login logic
        const users = getStoredUsers();
        const user = users.find(u => 
          u.username === formData.username && u.password === formData.password
        );

        if (user) {
          // Store current user session
          localStorage.setItem('planora_current_user', JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
            loginTime: new Date().toISOString()
          }));
          
          onAuthSuccess(user);
        } else {
          setErrors({ general: 'Invalid username or password' });
        }
      } else {
        // Signup logic
        const newUser = {
          id: Date.now().toString(),
          email: formData.email,
          username: formData.username,
          password: formData.password,
          createdAt: new Date().toISOString()
        };

        saveUser(newUser);
        
        // Auto-login after signup
        localStorage.setItem('planora_current_user', JSON.stringify({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          loginTime: new Date().toISOString()
        }));

        onAuthSuccess(newUser);
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const demoUser = {
      id: 'demo',
      username: 'demo_user',
      email: 'demo@planora.com'
    };
    
    localStorage.setItem('planora_current_user', JSON.stringify({
      ...demoUser,
      loginTime: new Date().toISOString()
    }));
    
    onAuthSuccess(demoUser);
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card">
          <div className="auth-header">
            <h1>🛫 Planora</h1>
            <p>AI Itinerary Builder</p>
            <h2>{isLogin ? 'Welcome Back!' : 'Join Planora'}</h2>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Sign in to continue your travel journey'
                : 'Create your account and start planning amazing trips'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Enter your username"
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            )}

            <button
              type="submit"
              className="auth-button primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="auth-button demo"
              disabled={isLoading}
            >
              🚀 Try Demo Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={toggleAuthMode}
                className="auth-link"
                disabled={isLoading}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="auth-features">
            <h4>Why Choose Planora?</h4>
            <ul>
              <li>🤖 AI-powered itinerary generation</li>
              <li>🔄 Real-time trip adjustments</li>
              <li>📱 Complete offline functionality</li>
              <li>✨ Personalized travel vibes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
