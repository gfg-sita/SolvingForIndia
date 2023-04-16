const express = require('express');
const { getLatestNutrientValues, getLatestEnvironmentValues } = require('../controllers/sensorDataController');

const router = express.Router();

router.get('/nutrient-data', getLatestNutrientValues);
router.get('/environment-data', getLatestEnvironmentValues);

module.exports = router;
