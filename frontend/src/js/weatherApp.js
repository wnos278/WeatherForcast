import { createHourlyCards, createDailyCards } from "./weatherForecastCards.js";
import { startLoadingState, endLoadingState } from "./setLoadingState.js";
import { handleError } from "./handleError.js";
import { currentWeatherData } from "./currentWeatherData.js";
import { weatherForecastData } from "./weatherForecastData.js";

const API_KEY = import.meta.env.VITE_API_KEY;
const searchBoxInput = document.querySelector(".search-box-input");
const gpsButton = document.querySelector(".gps-button");
const topButton = document.querySelector(".top-button");

createHourlyCards();
createDailyCards();

const fetchWeatherData = async (data) => {
  try {
    await startLoadingState();
    await currentWeatherData(data, API_KEY);
    await weatherForecastData(data, API_KEY);
    await endLoadingState();
  } catch (error) {
    if (error.message === "Failed to fetch") {
      await handleError(
        "Kiểm tra kết nối Internet và thử lại",
        "Làm mới lại trang"
      );
    } else {
      await handleError(error.message, "Try Again");
    }
  }
};

const getUserLocation = async () => {
  const successCallback = async (position) => {
    const data = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    await fetchWeatherData(data);
  };

  const errorCallback = (error) => {
    console.log(error);
    fetchWeatherData("Istanbul");
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

searchBoxInput.addEventListener("keyup", async (event) => {
  if (event.keyCode === 13) {
    await fetchWeatherData(searchBoxInput.value);
  }
});

gpsButton.addEventListener("click", getUserLocation);

topButton.addEventListener("click", scrollToTop);

getUserLocation();
