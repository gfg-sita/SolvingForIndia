const { gptRecommendation } = require("../utils/gptRecommendations");

async function gptRecommend(req, res) {
  try {
    const nutrientValues = await fetch(
      "http://localhost:3000/sensor/nutrient-data"
    );
    const environmentValues = await fetch(
      "http://localhost:3000/sensor/environment-data"
    );
    const { ph, moisture, temperature } = await environmentValues.json();
    const { nitrogen, phosphorous, potassium } = await nutrientValues.json();
    const promptToSend = `My soil composition: Nitrogen: ${nitrogen} P: ${phosphorous} K: ${potassium} Temperature: ${temperature} Moisture: ${moisture} Water pH: ${ph}. Please give your feedback for the soil quality and what are some sustainable steps I can take to improve the soil quality. LIMIT response to 1500 characters.`;
    const suggestion = await gptRecommendation(promptToSend);
    res.status(200).json({ suggestion });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { gptRecommend };