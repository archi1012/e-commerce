const { body, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const validateAuth = [
  body('email').isEmail().normalizeEmail().trim(),
  body('password').isLength({ min: 6 }).trim(),
  handleValidationErrors
];

const validateProduct = [
  body('name').isLength({ min: 1, max: 200 }).trim().escape(),
  body('price').isFloat({ min: 0 }),
  body('description').optional().isLength({ max: 1000 }).trim().escape(),
  body('category').isLength({ min: 1, max: 50 }).trim().escape(),
  handleValidationErrors
];

const validateObjectId = [
  param('id').isMongoId(),
  handleValidationErrors
];

module.exports = {
  validateAuth,
  validateProduct,
  validateObjectId,
  handleValidationErrors
};