import { Router } from 'express';
import { createPlatform, getAllPlatforms, getPlatformById, updatePlatform, deletePlatform } from '../controllers/platformController.js';
const router = Router();
router.post('/', createPlatform);
router.get('/', getAllPlatforms);
router.get('/:id', getPlatformById);
router.put('/:id', updatePlatform);
router.delete('/:id', deletePlatform);
export default router;