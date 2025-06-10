import { Router } from 'express';
import { getRecommendations } from '../controllers/geminiController.js';
const router = Router();
router.post('/', getRecommendations);
export default router;