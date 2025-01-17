import { renderWeatherData } from './dom-helpers.js';
import { getGeoCoding, getWeatherData } from './fetch.js';
import { getTemperatureUnit, updateTempUnit } from './storage.js';

const temperatureUnitButton = document.getElementById('temperature-switch');

temperatureUnitButton.addEventListener('click', (e) => {
    if (e.target.tagName !== 'SPAN') {
        return;
    }

    const temperatureOptions = document.querySelectorAll(
        '.temperature-switch-option'
    );

    temperatureOptions.forEach((option) => {
        option.classList.toggle('active-temperature');
    });

    updateTempUnit();
});

const weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = e.target.searchLocation.value;

    const { name, latitude, longitude } = await getGeoCoding(location);

    const weatherData = await getWeatherData(
        latitude,
        longitude,
        name,
        getTemperatureUnit()
    );

    e.target.reset();

    renderWeatherData(weatherData);
});
