// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
    };

    return (
        <header className="header">
            <Link to="/home"><h1>Cinema Cabin</h1></Link>
            <nav className="nav">
                <Link to="/home">Home</Link>
                <Link to="/recommendation">Recommendations</Link>
                {onLogout && (
                    <button
                        className="LogoutButton"
                        onClick={handleLogout}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: 'inherit'
                        }}
                    >
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;