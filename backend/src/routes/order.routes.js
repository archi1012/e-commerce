const express = require('express');
const { createOrder, getOrders, getOrder } = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

router.use(auth);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);

module.exports = router;