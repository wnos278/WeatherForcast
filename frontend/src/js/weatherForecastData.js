import { filterForecastData } from "./filterForecastData.js";
import { roundDegree, formatDate } from "./convertUnits.js";

export const weatherForecastData = async (data) => {
  const hourlyWeatherForecastDate = document.querySelectorAll(".hourly-weather-forecast-date");
  const hourlyWeatherForecastTime = document.querySelectorAll(".hourly-weather-forecast-time");
  const hourlyWeatherForecastTemperature = document.querySelectorAll(".hourly-weather-forecast-temperature");

  const dailyWeatherForecastDate = document.querySelectorAll(".daily-weather-forecast-date");
  const dailyWeatherForecastTime = document.querySelectorAll(".daily-weather-forecast-time");
  const dailyWeatherForecastIcon = document.querySelectorAll(".daily-weather-forecast-icon");
  const dailyWeatherForecastTemperature = document.querySelectorAll(".daily-weather-forecast-temperature");
  const dailyWeatherForecastDescription = document.querySelectorAll(".daily-weather-forecast-description");

  let API_URL;

  if (data.lat && data.lon) {
    API_URL = `http://127.0.0.1:5000/forecast?lat=${data.lat}&lon=${data.lon}`;
  } else {
    API_URL = `http://127.0.0.1:5000/forecast?q=${data}`;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Sorry, we couldn't find ${data}. Please double-check the spelling and try again.`);
    } else {
      throw new Error(
        "Oops! We're having trouble getting the latest weather information right now. Please try again later or contact support if the problem persists."
      );
    }
  }

  const weatherForecastData = await response.json();

  await filterForecastData(weatherForecastData);

  for (let index = 0; index < 5; index++) {
    hourlyWeatherForecastDate[index].innerHTML = await formatDate(weatherForecastData.list[index].dt, "day");
    hourlyWeatherForecastTime[index].innerHTML = await formatDate(weatherForecastData.list[index].dt, "hour");
    hourlyWeatherForecastTemperature[index].innerHTML = await roundDegree(weatherForecastData.list[index].main.temp);
  }

  for (let index = 0; index < 40; index++) {
    dailyWeatherForecastDate[index].innerHTML = await formatDate(weatherForecastData.list[index].dt, "short");
    dailyWeatherForecastTime[index].innerHTML = await formatDate(weatherForecastData.list[index].dt, "hour");
    dailyWeatherForecastIcon[index].src = `src/img/static/${weatherForecastData.list[index].weather[0].icon}.svg`;
    dailyWeatherForecastTemperature[index].innerHTML = await roundDegree(weatherForecastData.list[index].main.temp);
    dailyWeatherForecastDescription[index].innerHTML = weatherForecastData.list[index].weather[0].main;
  }
};
