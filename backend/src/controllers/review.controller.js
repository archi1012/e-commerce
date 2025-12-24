const Product = require('../models/Product');

// Add a review
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });
    const userId = req.user._id;
    const userName = req.user.name || req.user.email || 'Anonymous';

    if (!productId || rating == null || !comment) {
      return res.status(400).json({ message: 'productId, rating and comment are required' });
    }

    const numericRating = Number(rating);
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'rating must be a number between 1 and 5' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed
    const existingReview = product.reviews.find(r => r.userId.toString() === userId.toString());
    if (existingReview) {
      return res.status(409).json({ message: 'You have already reviewed this product' });
    }

    // Add review (ensure numeric rating stored)
    product.reviews.push({ userId, userName, rating: numericRating, comment });

    // Update rating and count (coerce values defensively)
    const totalRating = product.reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
    product.rating = product.reviews.length ? totalRating / product.reviews.length : 0;
    product.reviewCount = product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('addReview error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product.reviews);
  } catch (error) {
    console.error('getProductReviews error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addReview,
  getProductReviews
};