const express = require('express');
const router = express.Router();
const { predict } = require('../controllers/recommendController');

router.post('/suggest', predict);

module.exports = router;