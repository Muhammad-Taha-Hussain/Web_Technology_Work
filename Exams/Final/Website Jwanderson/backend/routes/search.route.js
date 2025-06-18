// routes/productRoutes.js
import express from 'express';
import { searchProducts } from '../controller/searchController.js';

const router = express.Router();

// Search API: searches 'name' and 'description' fields
router.get('/search', searchProducts);

export default router;
