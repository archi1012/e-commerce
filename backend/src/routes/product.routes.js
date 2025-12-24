const express = require('express');
const { getProducts, getProduct, getRecommendations, addProduct, updateProduct, deleteProduct, getCategories } = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/recommendations', getRecommendations);
router.get('/categories', getCategories);
router.get('/:id', getProduct);

// Protected routes (seller/admin only)
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;