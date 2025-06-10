// backend/routes/preferences.js
import { Router } from 'express';
const router = Router();
import { savePreferences } from '../controllers/preferenceController.js';
import authMiddleware from '../middleware/auth.js';

router.post('/', authMiddleware, savePreferences);

export default router;