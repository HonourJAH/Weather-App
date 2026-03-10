"use strict";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const getWeather = async function () {
  const city = cityInput.value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  try {
    // 1️⃣ Get coordinates from city name
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );

    const geoData = await geoResponse.json();

    if (!geoData.results) {
      alert("City not found");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // 2️⃣ Fetch weather using coordinates
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    const weatherData = await weatherResponse.json();

    cityName.textContent = name;

    temperature.textContent = `Temperature: ${weatherData.current_weather.temperature}°C`;

    wind.textContent = `Wind Speed: ${weatherData.current_weather.windspeed} km/h`;

    description.textContent = `Weather Code: ${weatherData.current_weather.weathercode}`;

    humidity.textContent = "Humidity: Data not provided";
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

searchBtn.addEventListener("click", getWeather);
