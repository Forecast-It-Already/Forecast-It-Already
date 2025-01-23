import './events.js';
import { renderWeatherData } from './dom-helpers.js';
import { getLocation, initializeTempUnit, initializeTheme } from './storage.js';
import { getWeatherData } from './fetch.js';

const main = async () => {
    initializeTheme();
    let weatherData;

    const location = getLocation();
    const temperatureUnit = initializeTempUnit();

    if (!location) {
        weatherData = await getWeatherData(
            40.6501,
            -73.94958,
            'Brooklyn',
            temperatureUnit
        );
    } else {
        weatherData = await getWeatherData(
            location.latitude,
            location.longitude,
            location.name,
            temperatureUnit
        );
    }

    await renderWeatherData(weatherData);
};
main();
