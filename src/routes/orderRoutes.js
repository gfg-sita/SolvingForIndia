const express = require('express');
const router = express.Router();
const { createBuyOrder, createSellOrder ,getUserOrders, getMarketOrders } = require('../controllers/orderController');
const { extractUserId } = require('../middleware/authMiddleware');

router.post('/buy', extractUserId, createBuyOrder);
router.post('/sell', extractUserId, createSellOrder);
router.get('/user-orders', extractUserId, getUserOrders);
router.get('/market-orders', getMarketOrders);

module.exports = router;