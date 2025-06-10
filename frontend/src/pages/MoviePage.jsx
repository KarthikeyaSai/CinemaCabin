// src/pages/MoviePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MoviePage.css';

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    text: '',
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/movies/${movieId}`);
        setMovie(response.data);
        setLikeCount(response.data.likes || 0);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return (
      <div className="movie-page-error">
        <h2>Movie not found</h2>
        <Link to="/home">Back to Home</Link>
      </div>
    );
  }

  // Map backend fields to frontend fields
  const title = movie.title || movie.Title || '';
  const year = movie.year || movie.Year || '';
  const poster = movie.poster || movie.IMGAddress || '';
  const overview = movie.overview || movie.Description || '';
  const genres = movie.genres || (movie.Genre ? movie.Genre.split(',') : []);
  const rating = movie.rating || movie.AVGrating || 0;
  const director = movie.director || (movie.CastCrew && movie.CastCrew.Director) || '';

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3001/api/movies/${movieId}/like`,
        { liked: !liked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLiked(!liked);
      setLikeCount(response.data.likes);
    } catch (error) {
      alert(error.response?.data?.error || 'Error liking movie');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStarClick = (rating) => {
    setReviewForm((prev) => ({
      ...prev,
      rating,
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
        day: 'numeric',
      }),
      rating: reviewForm.rating,
      text: reviewForm.text,
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
        {[1, 2, 3, 4, 5].map((star) => (
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
          <img src={poster} alt={`${title} Poster`} className="poster" />
          <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
            {liked ? '♥️' : '♡'} Like ({likeCount})
          </button>
        </div>

        <div className="right-panel">
          <h1 className="title">{title}</h1>
          <p className="sub-title">
            {year} {director && <>• Directed by {director}</>}
          </p>

          <div className="rating">
            {renderStars(Math.floor(rating))} <span>{rating}</span>
          </div>

          <div className="tags">
            {genres.map((genre) => (
              <span key={genre} className="tag">
                {genre}
              </span>
            ))}
          </div>

          <div className="overview">
            <h3>Overview</h3>
            <p>{overview}</p>
          </div>

          <div className="reviews">
            <h3>Reviews</h3>
            {reviews.map((review) => (
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
              <button type="submit" className="submit-btn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="back-to-home">
        <Link to="/home" className="back-link">
          ← Back to Movies
        </Link>
      </div>
    </div>
  );
};

export default MoviePage;