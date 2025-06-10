import { Router } from 'express';
import { createReview, getReviewsByMovie, getReviewsByUser, updateReview, deleteReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/auth.js';
const router = Router();
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    await createReview(req, res);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Review creation error:', error);
    }
    next(error);
  }
});
router.post('/movie/:movieId', authMiddleware, async (req, res, next) => {
  try {
    req.params.movieId = req.params.movieId || req.body.movieId;
    await createReview(req, res);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Review creation error:', error);
    }
    next(error);
  }
});
router.get('/movie/:movieId', getReviewsByMovie);
router.get('/user/:userId', getReviewsByUser);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
export default router;