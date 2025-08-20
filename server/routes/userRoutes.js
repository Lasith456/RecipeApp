import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controller/userController.js';

import { verifyToken } from '../middleware/verifyToken.js'; 

const router = express.Router();

router.use(verifyToken);

router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:id', removeFavorite);

export default router;