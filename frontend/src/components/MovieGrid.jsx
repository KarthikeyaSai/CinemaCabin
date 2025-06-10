// src/components/MovieGrid.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieGrid = ({ title }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url;
        switch (title) {
          case 'Top Rated Movies':
            url = 'http://localhost:3001/api/movies/top-rated';
            break;
          case 'Popular now':
            url = 'http://localhost:3001/api/movies/popular';
            break;
          case 'Your friends ratings':
            url = 'http://localhost:3001/api/movies/friends-ratings';
            break;
          default:
            return;
        }

        const token = localStorage.getItem('token');
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(response.data);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };

    fetchMovies();
  }, [title]);

  return (
    <section className="movieSection">
      <h2>{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            imageSrc={movie.poster}
            altText={movie.title}
            title={movie.title}
            releaseYear={movie.year}
            rating={movie.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;