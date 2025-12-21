const express = require('express');
const { getProducts, getProduct, getCategories } = require('../controllers/product.controller');

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);

module.exports = router;