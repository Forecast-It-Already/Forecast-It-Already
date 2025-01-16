const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const getTemperatureUnit = () => {
    return getLocalStorage('temperature-unit');
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
