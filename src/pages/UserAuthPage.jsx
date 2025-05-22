// src/pages/UserAuthPage.js
import React, { useState } from 'react';
import '../styles/UserAuth.css'; // Import page-specific styles

const UserAuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Clear form data when switching between login and signup
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.email || !formData.password) {
            alert('Please fill in all required fields');
            return;
        }

        if (!isLogin) {
            // Sign up validation
            if (!formData.username) {
                alert('Please enter a username');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
        }

        // Here you would typically make an API call to authenticate
        // For now, we'll just simulate a successful login/signup
        console.log(isLogin ? 'Logging in...' : 'Signing up...', formData);
        
        // Call the onLogin function passed from App.js
        onLogin();
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