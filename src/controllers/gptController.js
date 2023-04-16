const { gptRecommendation } = require("../utils/gptRecommendations");

async function gptRecommend(req, res) {
  try {
    const nutrientValues = await fetch(
      "http://localhost:3000/sensor/nutrient-data"
    );
    const { nitrogen, phosphorous, potassium } = await nutrientValues.json();
    console.log(`Nutrients: ${nitrogen} ${phosphorous} ${potassium }`);
    const promptToSend = `The following are the nutrient values in my soil: Nitrogen: ${nitrogen} P: ${phosphorous} K: ${potassium}. Please give your feedback for the soil quality and what are some sustainable steps I can take to improve the soil quality. LIMIT response to 1000 characters.`;
    const suggestion = await gptRecommendation(promptToSend);
    console.log(suggestion);
    res.status(200).json({ suggestion });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { gptRecommend };