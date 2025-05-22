// src/pages/UserAuthPage.js
import React, { useState } from 'react';
import '../styles/UserAuth.css'; // Import page-specific styles

const UserAuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="userAuthPage"> {/* */}
            <div className="authCard"> {/* */}
                <h2 id="form-title"> {/* */}
                    {isLogin ? 'Welcome back to' : 'Join'} <span className="subHead">Cinema Cabin</span> {/* */}
                </h2>
                <div className="loginBoxes"> {/* */}
                    {!isLogin && <input type="text" placeholder="Username" />}
                    <input type="email" placeholder="Email" /> {/* */}
                    <input type="password" placeholder="Password" /> {/* */}
                    {!isLogin && <input type="password" placeholder="Confirm Password" />}
                    <button id="submit-btn">{isLogin ? 'Login' : 'Sign Up'}</button> {/* */}
                </div>
                <p id="toggle-text" className="toggle" onClick={toggleForm}> {/* */}
                    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                </p>
            </div>
        </div>
    );
};

export default UserAuthPage;