import Review from '../models/Review.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';

export async function createReview(req, res) {
  try {
    const { rating, text } = req.body;
    const userId = req.userId; // from auth middleware
    // Get movieId from req.body, req.query, or req.params
    let movieId = req.body.movieId || req.query.movieId || req.params.movieId;
    // If not present, try to get from referer URL (for POST /api/reviews from MoviePage)
    if (!movieId && req.headers.referer) {
      const match = req.headers.referer.match(/movies\/(\d+)/);
      if (match) movieId = match[1];
    }
    // If still not present, return error
    if (!rating || !text || !userId || !movieId) {
      return res.status(400).json({ error: 'Missing required fields: rating, text, userId, movieId' });
    }
    const review = await Review.create({
      Rating: rating,
      ReviewText: text,
      UserID: userId,
      MovieID: movieId,
      ReviewDate: new Date()
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getReviewsByMovie(req, res) {
  try {
    const reviews = await Review.findAll({
      where: { MovieID: req.params.movieId },
      include: [User]
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getReviewsByUser(req, res) {
  try {
    const reviews = await Review.findAll({
      where: { UserID: req.params.userId },
      include: [Movie]
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateReview(req, res) {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    await review.update(req.body);
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteReview(req, res) {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    await review.destroy();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}