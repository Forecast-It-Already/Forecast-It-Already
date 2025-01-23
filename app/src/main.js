import './events.js';
import { renderWeatherData } from './dom-helpers.js';
import {
    getLocation,
    getTemperatureUnit,
    initializeTempUnit,
    initializeTheme,
    updateLocation,
} from './storage.js';
import { getWeatherData } from './fetch.js';

const main = async () => {
    initializeTheme();
    initializeTempUnit();

    let weatherData;

    const location = getLocation();
    const temperatureUnit = getTemperatureUnit();

    updateLocation({
        latitude: 40.6501,
        longitude: -73.94958,
        name: 'Brooklyn',
    });

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
