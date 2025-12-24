const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile, googleAuth } = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');
const passport = require('passport');

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

router.post('/login', login);
router.get('/profile', auth, getProfile);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleAuth);

module.exports = router;