const lat = "30.4159";
const lon = "77.9668";
const apiKey = process.env.OPEN_WEATHER_API_KEY;

async function getWeather() {
  const urlRain = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${apiKey}`;
  const responseRain = await fetch(urlRain);
  const weatherData = await responseRain.json();
  const currentTemp = weatherData.current.temp;
  const currentHumidity = weatherData.current.humidity;
  const currentWeather = weatherData.current.weather[0].description;
  const icon = `http://openweathermap.org/img/w/${(weatherData.current.weather[0].icon)}.png`;
  const rainChancesNextHour = weatherData.hourly[1].pop;
  return{
    currentTemp: currentTemp,
    currentHumidity: currentHumidity,
    currentWeather: currentWeather,
    icon: icon,
    rainChancesNextHour: rainChancesNextHour
  };
}

async function getAgriData() {
  const agriKey = process.env.AGRO_MONITOR_API_KEY;
  const id = process.env.AGRO_MONITOR_POLYGON_ID;
  const endTime = Math.round(+new Date()/1000);
  const startTime = endTime - (15*86400);
  const urlNDVIAgri = `http://api.agromonitoring.com/agro/1.0/ndvi/history?start=${startTime}&end=${endTime}&polyid=${id}&appid=${agriKey}`;
  const urlUviAgri = `http://api.agromonitoring.com/agro/1.0/uvi?polyid=${id}&appid=${agriKey}`;
  const responseNDVI = await fetch(urlNDVIAgri);
  const responseUvi = await fetch(urlUviAgri);
  const NDVIData = await responseNDVI.json();
  const UviData = await responseUvi.json();
  const currentUvi = UviData.uvi;
  const lastestMedianNDVI = NDVIData[0].data.median;
  let colourCode = "";
  if (currentUvi < 2) {
    colourCode = "#4671c6";
  }
  else if (currentUvi < 5) {
    colourCode = "#a4c9ff";
  }
  else if (currentUvi < 7) {
    colourCode = "#6bdddd";
  }
  else if (currentUvi < 10) {
    colourCode = "#ffea92";
  }
  else if (currentUvi > 10) {
    colourCode = "#f9a7a7";
  }
  return{
    currentUvi: currentUvi, 
    lastestMedianNDVI: lastestMedianNDVI, 
    colourCode: colourCode
  };
}

exports.getWeather = getWeather;
exports.getAgriData = getAgriData;  