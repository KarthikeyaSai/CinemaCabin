// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ imageSrc, altText, title, movieId }) => {
    return (
        <Link to={`/movie/${movieId}`} className="movie-card-link">
            <div className="movie-card">
                <img src={imageSrc} alt={altText} />
                <h3>{title}</h3>
            </div>
        </Link>
    );
};

export default MovieCard;