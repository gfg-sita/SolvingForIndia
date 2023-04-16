const express = require('express');
const router = express.Router();    
const { gptRecommend } = require('../controllers/gptController');   

router.get('/gpt', gptRecommend);

module.exports = router;