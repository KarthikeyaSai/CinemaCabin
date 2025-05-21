// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import Headline from '../components/Headline';
import MovieGrid from '../components/MovieGrid';
import '../styles/Homepage.css'; // Import page-specific styles

const HomePage = () => {
    return (
        <div>
            <Header />
            <main>
                <Headline />
                <MovieGrid title="Top Rated Movies" /> {/* */}
                {/* You can add more MovieGrid components for other sections like "New Releases" */}
                {/* <MovieGrid title="New Releases" /> */}
            </main>
            {/* Footer can be added here */}
        </div>
    );
};

export default HomePage;