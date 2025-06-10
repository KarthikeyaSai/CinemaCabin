import { Router } from 'express';
import { createCastCrew, getCastCrewByMovie, updateCastCrew, deleteCastCrew } from '../controllers/castCrewController.js';
const router = Router();
router.post('/', createCastCrew);
router.get('/movie/:movieId', getCastCrewByMovie);
router.put('/:id', updateCastCrew);
router.delete('/:id', deleteCastCrew);
export default router;