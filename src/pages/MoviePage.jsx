// src/pages/MoviePage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/MoviePage.css'

// Sample movie data - in a real app, this would come from an API or database
const moviesData = {
  'the-dark-knight': {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    year: 2008,
    director: 'Christopher Nolan',
    poster: '../assets/Posters/darkknight.jpg',
    rating: 4.8,
    likes: 2100,
    genres: ['Action', 'Crime', 'Drama'],
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    reviews: [
      {
        id: 1,
        username: 'DCFanatic',
        date: 'Nov 30, 2022',
        rating: 5,
        text: "Heath Ledger's Joker is the greatest villain performance of all time. The Dark Knight transcends the superhero genre to become a crime epic."
      }
    ]
  },
  'shawshank-redemption': {
    id: 'shawshank-redemption',
    title: 'Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    poster: '../assets/Posters/shawshankRed.webp',
    rating: 4.9,
    likes: 3500,
    genres: ['Drama'],
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    reviews: [
      {
        id: 1,
        username: 'MovieLover',
        date: 'Dec 15, 2022',
        rating: 5,
        text: "A masterpiece that shows the power of hope and friendship. Tim Robbins and Morgan Freeman deliver incredible performances."
      }
    ]
  },
  'inception': {
    id: 'inception',
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    poster: '../assets/Posters/inception.jpg',
    rating: 4.7,
    likes: 2800,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    reviews: [
      {
        id: 1,
        username: 'SciFiFan',
        date: 'Jan 10, 2023',
        rating: 5,
        text: "Mind-bending and visually stunning. Nolan creates a complex narrative that rewards multiple viewings."
      }
    ]
  },
  'parasite': {
    id: 'parasite',
    title: 'Parasite',
    year: 2019,
    director: 'Bong Joon-ho',
    poster: '../assets/Posters/parasite.jpg',
    rating: 4.6,
    likes: 1900,
    genres: ['Thriller', 'Drama', 'Comedy'],
    overview: "A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.",
    reviews: [
      {
        id: 1,
        username: 'CinemaExpert',
        date: 'Feb 5, 2023',
        rating: 5,
        text: "A brilliant social commentary wrapped in a thrilling narrative. Deserved every award it received."
      }
    ]
  },
  'everything-everywhere-all-at-once': {
    id: 'everything-everywhere-all-at-once',
    title: 'Everything Everywhere All at Once',
    year: 2022,
    director: 'Daniels',
    poster: '../assets/Posters/EEAO.jpg',
    rating: 4.5,
    likes: 2200,
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
    reviews: [
      {
        id: 1,
        username: 'IndieFilmFan',
        date: 'Mar 20, 2023',
        rating: 4,
        text: "Chaotic, beautiful, and deeply emotional. A unique cinematic experience that defies categorization."
      }
    ]
  }
};

const MoviePage = () => {
  const { movieId } = useParams();
  const movie = moviesData[movieId];
  
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(movie?.likes || 0);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    text: ''
  });
  const [reviews, setReviews] = useState(movie?.reviews || []);

  // If movie not found, show error
  if (!movie) {
    return (
      <div className="movie-page-error">
        <h2>Movie not found</h2>
        <Link to="/home">Back to Home</Link>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating) => {
    setReviewForm(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text || reviewForm.rating === 0) {
      alert('Please fill in all fields and select a rating');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      username: reviewForm.name,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      rating: reviewForm.rating,
      text: reviewForm.text
    };

    setReviews([...reviews, newReview]);
    setReviewForm({ name: '', rating: 0, text: '' });
  };

  const renderStars = (rating) => {
    return '⭐️'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const renderInteractiveStars = () => {
    return (
      <div className="stars-select">
        {[1, 2, 3, 4, 5].map(star => (
          <span 
            key={star}
            onClick={() => handleStarClick(star)}
            className={star <= reviewForm.rating ? 'star-filled' : 'star-empty'}
          >
            {star <= reviewForm.rating ? '⭐️' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="movie-page">
      <div className="movie-container">
        <div className="left-panel">
          <img src={movie.poster} alt={`${movie.title} Poster`} className="poster" />
          <button 
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            {liked ? '♥' : '♡'} Like ({likeCount})
          </button>
        </div>
        
        <div className="right-panel">
          <h1 className="title">{movie.title}</h1>
          <p className="sub-title">{movie.year} • Directed by {movie.director}</p>
          
          <div className="rating">
            {renderStars(Math.floor(movie.rating))} <span>{movie.rating}</span>
          </div>
          
          <div className="tags">
            {movie.genres.map(genre => (
              <span key={genre} className="tag">{genre}</span>
            ))}
          </div>
          
          <div className="overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          
          <div className="reviews">
            <h3>Reviews</h3>
            {reviews.map(review => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="username">{review.username}</span>
                  <span className="date">{review.date}</span>
                </div>
                <div className="stars">{renderStars(review.rating)}</div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
          
          <div className="write-review">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your name"
                value={reviewForm.name}
                onChange={handleInputChange}
              />
              {renderInteractiveStars()}
              <textarea 
                name="text"
                placeholder="Share your thoughts about this movie..."
                value={reviewForm.text}
                onChange={handleInputChange}
              />
              <button type="submit" className="submit-btn">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="back-to-home">
        <Link to="/home" className="back-link">← Back to Movies</Link>
      </div>
    </div>
  );
};

export default MoviePage;