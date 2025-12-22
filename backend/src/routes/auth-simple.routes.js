const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile } = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

router.post('/login', login);
router.get('/profile', auth, getProfile);

router.get('/google', (req, res) => {
  res.status(501).json({ message: 'Google OAuth temporarily disabled' });
});

module.exports = router;