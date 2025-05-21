// src/components/Header.js
import React from 'react';
// Link component from react-router-dom if you are using it for navigation
// import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header"> {/* */}
            {/* Use Link component for client-side routing: <Link to="/"> */}
            <a href="/"><h1>Cinema Cabin</h1></a> {/* */}
            <nav className="nav"> {/* */}
                {/* Use Link component: <Link to="/">Home</Link> */}
                <a href="/">Home</a> {/* */}
                <a href="/Recommendation">Popular</a> {/* */}
            </nav>
        </header>
    );
};

export default Header;