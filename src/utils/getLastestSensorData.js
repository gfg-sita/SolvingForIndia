async function extractNutrientValues(receivedData) {
  let data = Array.from(receivedData);
  let nutrientsData = {};
  if (data.length > 0) {
    let latestRecord = data[data.length - 1];
    nutrientsData = {
      nitrogen: latestRecord.nitrogen,
      phosphorous: latestRecord.phosphorous,
      potassium: latestRecord.potassium,
    };
  }
  return nutrientsData;
}

async function extractEnvironmentValues(data) {
  let environmentData = {};
  if (data.length > 0) {
    let latestRecord = data[data.length - 1];
    environmentData = {
      ph: latestRecord.ph,
      moisture: latestRecord.moisture,
      temperature: latestRecord.temperature,
    };
  }
  return environmentData;
}

exports.extractEnvironmentValues = extractEnvironmentValues;
exports.extractNutrientValues = extractNutrientValues;
