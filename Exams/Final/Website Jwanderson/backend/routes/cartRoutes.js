import express from 'express';
import { addToCart, getCartItems, updateCartItem, removeCartItem, clearCart } from '../controller/cartController.js';
import { verifyToken } from '../middlewares/verifyToken.js'; // middleware to get req.user._id from JWT

const router = express.Router();

router.post('/add', verifyToken, addToCart);
router.get('/', verifyToken, getCartItems);
router.put('/update/:itemId', verifyToken, updateCartItem);
router.delete('/remove/:itemId', verifyToken, removeCartItem);
router.delete('/clear', verifyToken, clearCart);

export default router;
