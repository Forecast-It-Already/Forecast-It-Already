import './events.js';
import { renderWeatherData } from './dom-helpers.js';
import { initializeTempUnit } from './storage.js';
import { getWeatherData } from './fetch.js';

const main = async () => {
    const weatherData = await getWeatherData(
        40.6501,
        -73.94958,
        'Brooklyn',
        initializeTempUnit()
    );

    await renderWeatherData(weatherData);
};
main();
