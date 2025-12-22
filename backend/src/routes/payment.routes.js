const express = require('express');
const { createPaymentOrder, verifyPayment } = require('../controllers/payment.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.use(auth);

router.post('/create-order', createPaymentOrder);
router.post('/verify', verifyPayment);

module.exports = router;