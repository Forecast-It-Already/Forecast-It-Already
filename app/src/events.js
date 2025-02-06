import { renderTheme, renderWeatherData } from './dom-helpers.js';
import { getGeoCoding, getWeatherData } from './fetch.js';
import {
    getLocation,
    getTemperatureUnit,
    updateLocation,
    updateTempUnit,
    updateTheme,
} from './storage.js';

const temperatureUnitButton = document.getElementById('temperature-switch');

const themeChangeButton = document.getElementById('theme-change-button');

temperatureUnitButton.addEventListener('click', async (e) => {
    if (e.target.tagName !== 'SPAN') {
        return;
    }

    const temperatureOptions = document.querySelectorAll(
        '.temperature-switch-option'
    );

    temperatureOptions.forEach((option) => {
        option.classList.toggle('active-temperature');
    });

    const { latitude, longitude, name } = getLocation();

    const newTemperature = updateTempUnit();

    const weatherData = await getWeatherData(
        latitude,
        longitude,
        name,
        newTemperature
    );

    await renderWeatherData(weatherData);
});

themeChangeButton.addEventListener('click', () => {
    const theme = updateTheme();
    renderTheme(theme);
});

const weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = e.target.searchLocation.value;

    if (!location) {
        return;
    }

    const { name, latitude, longitude } = await getGeoCoding(location);
    const temperatureUnit = getTemperatureUnit();

    const weatherData = await getWeatherData(
        latitude,
        longitude,
        name,
        temperatureUnit
    );

    e.target.reset();

    renderWeatherData(weatherData);
    updateLocation({ latitude, longitude, name });
});
