import express from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controller/favoriteController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Add to favorites
router.post('/add', verifyToken, addFavorite);

// Get all favorites of logged-in user
router.get('/get', verifyToken, getFavorites);
// router.get('/get/:userId', verifyToken, getFavoritesById);

// Remove from favorites
router.delete('/remove/:productId', verifyToken, removeFavorite);

export default router;
