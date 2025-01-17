import './events.js';
import { renderWeatherData } from './dom-helpers.js';

const main = async () => {
    await renderWeatherData();
};
main();
