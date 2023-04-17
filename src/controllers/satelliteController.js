const {getWeather, getAgriData} = require("../utils/getSatelliteData");

async function getSatelliteData(req, res) {
  try {
    const weather = await getWeather();
    const agriData = await getAgriData();
    res.status(200).json({weather: weather, agriData: agriData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch satellite data" });
  }
}

module.exports = { getSatelliteData };