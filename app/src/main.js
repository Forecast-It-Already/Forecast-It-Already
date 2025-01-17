import { initializeTempUnit } from './storage.js';
import { form, weatherDataContainer, weatherDetailsContainer } from './dom-helpers.js';
import './events.js';
import './style.css';

const main = () => {
    form();
    weatherDataContainer();
    weatherDetailsContainer();
};
main();

const temperatureUnit = initializeTempUnit();
initializeTempUnit();
