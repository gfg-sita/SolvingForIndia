const { fetchSensorData } = require('../db/influx');
const { extractNutrientValues, extractEnvironmentValues } = require('../utils/getLastestSensorData');

async function getLatestNutrientValues(req, res) {
  try {
    const data = await fetchSensorData();
    const nutrientValues = await extractNutrientValues(data);
    res.json(nutrientValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
}

async function getLatestEnvironmentValues(req, res) {
    try {
        const data = await fetchSensorData();
        const environmentValues = await extractEnvironmentValues(data); 
        res.json(environmentValues);
    } catch (error) {   
        console.error(error);   
        res.status(500).json({ error: 'Failed to fetch sensor data' });
    };
};

module.exports = {
    getLatestNutrientValues,
    getLatestEnvironmentValues,
};
