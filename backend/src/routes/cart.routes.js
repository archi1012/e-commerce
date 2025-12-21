const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cart.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.use(auth);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeFromCart);

module.exports = router;