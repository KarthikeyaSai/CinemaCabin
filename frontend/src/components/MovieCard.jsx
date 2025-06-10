// src/components/MovieCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieCard = ({ imageSrc, altText, title, movieId, rating = 8.5, releaseYear = "2023" }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(false); // Default to false; can fetch user-specific like status if needed
  }, [movieId]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3001/api/movies/${movieId}/like`,
        { liked: !isLiked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsLiked(!isLiked);
    } catch (error) {
      alert(error.response?.data?.error || 'Error liking movie');
    }
  };

  const renderStars = (rating, size = 14) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star-filled" style={{ fontSize: `${size}px` }}>★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star-half" style={{ fontSize: `${size}px` }}>★</span>);
      } else {
        stars.push(<span key={i} className="star-empty" style={{ fontSize: `${size}px` }}>☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="movie-card animate-fade-in">
      <Link to={`/movie/${movieId}`} className="movie-card-link">
        <div className="movie-card-container">
          <img src={imageSrc} alt={altText} className="movie-card-image" />
          <div className="movie-card-overlay">
            <h3 className="movie-card-title">{title}</h3>
            <p className="movie-card-year">{releaseYear}</p>
            <div className="movie-card-rating">
              <div className="stars-container">{renderStars(rating, 14)}</div>
              <span className="rating-number">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
      <button
        className={`like-button ${isLiked ? 'liked' : ''}`}
        onClick={handleLike}
        aria-label={`Like ${title}`}
      >
        <span className="heart-icon">{isLiked ? '❤️' : '🤍'}</span>
      </button>
    </div>
  );
};

export default MovieCard;