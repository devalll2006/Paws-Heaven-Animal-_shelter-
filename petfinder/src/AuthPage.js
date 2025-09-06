import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = ({ authType }) => {
  const [isLogin, setIsLogin] = useState(authType === 'login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'owner',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  }, []);

  const toggleAuthType = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            ...(!isLogin && {
              name: formData.name,
              role: formData.role
            })
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setIsLoggedIn(true);
          setUserData(data.user);
          setAuthSuccess(true);
          
          // Redirect admin to profile page, others to saved URL or home
          let redirectUrl;
          if (data.user.role === 'admin') {
            redirectUrl = '/profile';
          } else {
            redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
          }
          localStorage.removeItem('redirectAfterLogin');
          window.location.href = redirectUrl;
        } else {
          alert(data.message || 'Authentication failed');
        }
      } catch (error) {
        console.error('Auth error:', error);
        alert('An error occurred during authentication');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const UserProfileDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUserData(null);
      window.location.href = '/login';
    };

    return (
      <div className="user-profile-dropdown">
        <button 
          className="profile-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img 
            src={userData?.avatar || '/default-avatar.png'} 
            alt="User" 
            className="profile-avatar"
          />
          <span>{userData?.name || 'Profile'}</span>
        </button>
        
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile" className="dropdown-item">
              <i className="icon-user"></i> My Profile
            </Link>
            <Link to="/settings" className="dropdown-item">
              <i className="icon-settings"></i> Settings
            </Link>
            <button onClick={handleLogout} className="dropdown-item">
              <i className="icon-logout"></i> Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/194/194279.png" 
              alt="Paws Haven Logo" 
              className="navbar-logo"
            />
            Paws Haven
          </Link>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/adopt">Adopt</Link>
            <Link to="/found-lost">Found & Lost</Link>
            <Link to="/vets">Vets</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            {isLoggedIn ? (
              <UserProfileDropdown />
            ) : (
              <Link to="/login" className="active">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <main className="auth-main">
        <div className="container">
          <div className="auth-layout">
            <div className="auth-image-section">
              <img 
                src="https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Happy pets at Paws Haven" 
                className="auth-hero-image"
              />
              <div className="auth-image-overlay">
                <h2>Welcome to Paws Haven</h2>
                <p>Join our community of pet lovers and help animals find their forever homes.</p>
                <div className="auth-features">
                  <div className="feature-item">
                    <i className="bi bi-heart-fill"></i>
                    <span>Find loving pets</span>
                  </div>
                  <div className="feature-item">
                    <i className="bi bi-people-fill"></i>
                    <span>Connect with community</span>
                  </div>
                  <div className="feature-item">
                    <i className="bi bi-shield-check"></i>
                    <span>Safe & secure</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="auth-form-section">
              <div className="auth-container">
                <div className="auth-header">
                  <h1>{isLogin ? 'Login' : 'Register'}</h1>
                  <p>
                    {isLogin 
                      ? 'Sign in to access your account' 
                      : 'Create an account to get started'}
                  </p>
                </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    {errors.confirmPassword && (
                      <span className="error-message">{errors.confirmPassword}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Registering as</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="owner">Pet Owner</option>
                      <option value="vet">Veterinarian</option>
                      <option value="shelter">Shelter Staff</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className={errors.agreeTerms ? 'error' : ''}
                    />
                    <label htmlFor="agreeTerms">
                      I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                      <Link to="/privacy">Privacy Policy</Link>
                    </label>
                    {errors.agreeTerms && (
                      <span className="error-message">{errors.agreeTerms}</span>
                    )}
                  </div>
                </>
              )}

              <div className="form-group">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="spinner"></span>
                  ) : (
                    isLogin ? 'Login' : 'Create Account'
                  )}
                </button>
              </div>
            </form>

                <div className="auth-footer">
                  {isLogin ? (
                    <p>Don't have an account?{' '}
                      <button 
                        type="button" 
                        className="text-button"
                        onClick={toggleAuthType}
                      >
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p>Already have an account?{' '}
                      <button 
                        type="button" 
                        className="text-button"
                        onClick={toggleAuthType}
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Paws Haven</h3>
              <p>Helping pets find loving homes since 2015.</p>
              <div className="social-links">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="#"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/adopt">Adopt</Link></li>
                <li><Link to="/found-lost">Found & Lost</Link></li>
                <li><Link to="/vets">Veterinary Services</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/volunteer">Volunteer</Link></li>
                <li><Link to="/donate">Donate</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li>123 Shelter Way, Petville</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@pawshaven.org</li>
                <li>Emergency: 24/7 Hotline</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Paws Haven. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;