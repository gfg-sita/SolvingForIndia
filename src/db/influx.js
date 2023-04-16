const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const { extractNutrientValues, extractEnvironmentValues } = require('../utils/getLastestSensorData');

const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;

const client = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
  rejectUnauthorized: false,
});

async function fetchSensorData() {
  const queryApi = client.getQueryApi(org);
  const query = `from(bucket: "${bucket}")
  |> range(start: -1h, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "sensor_data")
  |> filter(fn: (r) => r["_field"] == "moisture" or r["_field"] == "nitrogen" or r["_field"] == "ph" or r["_field"] == "phosphorous" or r["_field"] == "potassium" or r["_field"] == "temperature")
  |> yield(name: "mean")`;


  const result = await queryApi.collectRows(query);
  const sensorData = [];

  for (const record of result) {
  const fieldName = record["_field"];
  const fieldValue = record["_value"];

  const existingDataIndex = sensorData.findIndex((data) => data.time === record["_time"]);

  if (existingDataIndex !== -1) {
    sensorData[existingDataIndex][fieldName] = fieldValue;
  } else {
    sensorData.push({
      time: record["_time"],
      [fieldName]: fieldValue,
    });
  };
};
  return sensorData;
}


module.exports = {
  fetchSensorData,
};
