// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import Headline from '../components/Headline';
import MovieGrid from '../components/MovieGrid';
import '../styles/Homepage.css'; // Import page-specific styles

const HomePage = ({ onLogout }) => {
    return (
        <div className="backGround">
            <Header onLogout={onLogout} />
            <main>
                <Headline />
                <MovieGrid title="Top Rated Movies" />
                <MovieGrid title="Popular now" />
                <MovieGrid title="Your friends ratings" />
            </main>
            {/* Footer can be added here */}
        </div>
    );
};

export default HomePage;