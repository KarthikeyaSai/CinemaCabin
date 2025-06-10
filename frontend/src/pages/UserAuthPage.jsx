// src/pages/UserAuthPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UserAuth.css';

const UserAuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isLogin) {
      if (!formData.username) {
        alert('Please enter a username');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }

    try {
      const url = isLogin ? 'http://localhost:3001/api/auth/login' : 'http://localhost:3001/api/auth/signup';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password };
      const response = await axios.post(url, payload);
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (error) {
  console.error('Login error:', error, error?.response?.data);
  alert(error.response?.data?.error || error.message || 'An error occurred');
}
  };

  return (
    <div className="userAuthPage">
      <div className="authCard">
        <h2 id="form-title">
          {isLogin ? 'Welcome back to' : 'Join'} <span className="subHead">Cinema Cabin</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="loginBoxes">
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            )}
            <button type="submit" id="submit-btn">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p id="toggle-text" className="toggle" onClick={toggleForm}>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default UserAuthPage;