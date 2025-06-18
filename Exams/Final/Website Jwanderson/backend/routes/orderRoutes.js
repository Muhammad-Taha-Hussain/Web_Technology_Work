import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { placeOrder, createPaymentIntent } from '../controller/orderController.js';

const router = express.Router();

// Place an order
router.post('/place', verifyToken, placeOrder);
router.post('/create-payment-intent', verifyToken, createPaymentIntent);

export default router;
