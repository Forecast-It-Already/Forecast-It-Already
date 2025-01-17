import { renderTheme } from './dom-helpers.js';

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const getTemperatureUnit = () => {
    return getLocalStorage('temperature-unit');
};

export const getTheme = () => {
    return getLocalStorage('theme');
};

export const initializeTempUnit = () => {
    let temperature = getTemperatureUnit();

    if (!temperature) {
        temperature = 'fahrenheit';
        setLocalStorage('temperature-unit', temperature);
    }

    document.getElementById(temperature).classList.add('active-temperature');

    return temperature;
};

export const updateTheme = () => {
    const newTheme = getTheme() === 'dark' ? 'light' : 'dark';

    setLocalStorage('theme', newTheme);

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);

    return newTheme;
};

export const initializeTheme = () => {
    let theme = getTheme();

    if (!theme) {
        theme = 'light';
        setLocalStorage('theme', theme);
    }

    document.body.className = '';
    document.body.className = theme;

    renderTheme(theme);
};

export const updateTempUnit = () => {
    const storedUnit = getTemperatureUnit();

    let newTemperatureUnit = '';

    if (storedUnit === 'fahrenheit') {
        setLocalStorage('temperature-unit', 'celsius');
        newTemperatureUnit = 'celsius';
    } else {
        setLocalStorage('temperature-unit', 'fahrenheit');
        newTemperatureUnit = 'fahrenheit';
    }

    return newTemperatureUnit;
};

export const getLocation = () => {
    return getLocalStorage('location');
};

export const updateLocation = (location) => {
    setLocalStorage('location', location);
};
