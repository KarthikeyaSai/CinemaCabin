// src/pages/Recommendation.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Recommendation.css';
import '../styles/UserAuth.css';

const Recommendation = ({ onContinue }) => {
  const [movies, setMovies] = useState(['', '', '']);
  const [recommendations, setRecommendations] = useState([]);

  const handleMovieChange = (index, value) => {
    const updatedMovies = [...movies];
    updatedMovies[index] = value;
    setMovies(updatedMovies);
  };

  const handleContinue = async () => {
    const filledMovies = movies.filter((movie) => movie.trim() !== '');
    if (filledMovies.length === 0) {
      alert('Please enter at least one movie');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/api/recommendations',
        { movies: filledMovies },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendations(response.data.recommendations || []);
      if (onContinue) {
        onContinue(filledMovies);
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Error getting recommendations');
    }
  };

  return (
    <div className="movie-preferences-page">
      <div className="authCard">
        <div className="intro-text">
          <p>Welcome To</p>
          <h2>Movie Wizard</h2>
          <p>Tell him 3 movies that you already know and like.</p>
        </div>

        <div className="movie-inputs">
          <div className="input-flex">
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
        </div>
        <div className="button-container">
          <button className="continue-button" onClick={handleContinue}>
            continue
          </button>
        </div>
        {recommendations.length > 0 && (
          <div className="recommendations">
            <h3>Your Recommendations:</h3>
            <ul>
              {recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;