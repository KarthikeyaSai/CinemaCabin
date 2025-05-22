import React from 'react';
import MovieCard from './MovieCard';

// Sample movie data - in a real app, this would come from props or state
const movies = [
    { 
        id: 1, 
        movieId: 'shawshank-redemption',
        imageSrc: '../assets/Posters/shawshankRed.webp', 
        altText: 'Shawshank Redemption', 
        title: 'Shawshank Redemption' 
    },
    { 
        id: 2, 
        movieId: 'the-dark-knight',
        imageSrc: '../assets/Posters/darkknight.jpg', 
        altText: 'The Dark Knight', 
        title: 'The Dark Knight' 
    },
    { 
        id: 3, 
        movieId: 'everything-everywhere-all-at-once',
        imageSrc: '../assets/Posters/EEAO.jpg', 
        altText: 'Everything Everywhere All at Once', 
        title: 'Everything Everywhere All at Once' 
    },
    { 
        id: 4, 
        movieId: 'inception',
        imageSrc: '../assets/Posters/inception.jpg', 
        altText: 'Inception', 
        title: 'Inception' 
    },
    { 
        id: 5, 
        movieId: 'parasite',
        imageSrc: '../assets/Posters/parasite.jpg', 
        altText: 'Parasite', 
        title: 'Parasite' 
    },
    // Add more movies as needed for scrolling demonstration
    { 
        id: 6, 
        movieId: 'the-dark-knight',
        imageSrc: '../assets/Posters/darkknight.jpg', 
        altText: 'The Dark Knight 2', 
        title: 'The Dark Knight Returns' 
    },
    { 
        id: 7, 
        movieId: 'inception',
        imageSrc: '../assets/Posters/inception.jpg', 
        altText: 'Inception 2', 
        title: 'Inception: The Dream Continues' 
    },
];

const MovieGrid = ({ title }) => {
    return (
        <section className="movieSection">
            <h2>{title}</h2>
            <div className="movie-grid">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movieId={movie.movieId}
                        imageSrc={movie.imageSrc}
                        altText={movie.altText}
                        title={movie.title}
                    />
                ))}
            </div>
        </section>
    );
};

export default MovieGrid;