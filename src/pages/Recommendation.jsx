// src/pages/MoviePreferencesPage.jsx
import React, { useState } from 'react';
import '../styles/Recommendation.css'; // Import page-specific styles

const MoviePreferencesPage = ({ onContinue }) => {
    const [movies, setMovies] = useState(['', '', '']);

    const handleMovieChange = (index, value) => {
        const updatedMovies = [...movies];
        updatedMovies[index] = value;
        setMovies(updatedMovies);
    };

    const handleContinue = () => {
        // Filter out empty entries
        const filledMovies = movies.filter(movie => movie.trim() !== '');
        
        if (filledMovies.length === 0) {
            alert('Please enter at least one movie');
            return;
        }

        console.log('User\'s favorite movies:', filledMovies);
        
        // Call the onContinue prop if provided
        if (onContinue) {
            onContinue(filledMovies);
        }
    };

    return (
        <div className="movie-preferences-page">
            <div className="preferences-container">
                <div className="intro-text">
                    <p>To teach Gnod what you are like, please type</p>
                    <p>in 3 movies that you already know and like.</p>
                </div>

                <div className="movie-inputs">
                    {movies.map((movie, index) => (
                        <div key={index} className="movie-input-group">
                            <label>One of my favorite movies is...</label>
                            <input
                                type="text"
                                value={movie}
                                onChange={(e) => handleMovieChange(index, e.target.value)}
                                className="movie-input"
                                placeholder=""
                            />
                        </div>
                    ))}
                </div>

                <button 
                    className="continue-button"
                    onClick={handleContinue}
                >
                    continue
                </button>
            </div>
        </div>
    );
};

export default MoviePreferencesPage;