// src/components/MovieCard.js
import React from 'react';

const MovieCard = ({ imageSrc, altText, title }) => {
    return (
        <div className="movie-card"> {/* */}
            <img src={imageSrc} alt={altText} /> {/* */}
            <h3>{title}</h3> {/* */}
        </div>
    );
};

export default MovieCard;