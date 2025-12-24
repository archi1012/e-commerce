const express = require('express');
const { addReview, getProductReviews } = require('../controllers/review.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// Add a review (protected route)
router.post('/', auth, addReview);

// Get reviews for a product
router.get('/product/:productId', getProductReviews);

module.exports = router;