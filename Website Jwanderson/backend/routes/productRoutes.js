import express from 'express';
import upload from '../middlewares/multer.js';
import { createProduct, getAllProducts, getAllProductsByCategory, getAllMixProducts, getProductById } from '../controller/productController.js';

const router = express.Router();

router.post('/create', upload.array('images', 5), createProduct);

router.get('/all', getAllProducts);
// Route: GET /api/products/category
router.get('/category', getAllProductsByCategory);

router.get('/mixed', getAllMixProducts);

router.get('/:id', getProductById);


export default router;
