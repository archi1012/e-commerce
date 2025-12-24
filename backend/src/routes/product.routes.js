const express = require('express');
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct, getCategories } = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);

// Protected routes (seller/admin only)
router.post('/', auth, addProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;