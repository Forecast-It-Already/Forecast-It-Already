import { weatherIcons, slogans } from './constants.js';
import { getWeatherData } from './fetch.js';
import { initializeTempUnit } from './storage.js';

// Form Container
export const form = (weatherData, parent) => {
    console.log({ weatherData });
    // 1. Create
    document.querySelector('h2#current-weather-title').textContent =
        weatherData.name;

    document.querySelector('i#current-weather-icon').className =
        weatherIcons[weatherData.current.weatherCode];

    document.querySelector('h3#current-weather-temperature').textContent =
        weatherData.current.temperature;

    document.querySelector('h1#current-weather-time').textContent =
        weatherData.current.time.split('T')[1];
};

const hourly = (weatherData, parent) => {
    const div = document.querySelector('div.hourly');
    return Object.entries(weatherData.hourly).forEach(([time, data]) => {
        console.log({ time, data });
        const military = time.split('T')[1];
        const weatherCode = data.weatherCode;
        // 1. Create
        const span = document.createElement('span');
        const pTime = document.createElement('p');
        const pTemp = document.createElement('p');
        const i = document.createElement('i');
        // 2. Modify
        span.className = 'hour';
        pTime.className = 'time';
        pTemp.className = 'temperature';
        i.className = weatherIcons[weatherCode];

        pTime.textContent = military;
        pTemp.textContent = time.temperature;
        // 3. Append
        span.append(pTime, i, pTemp);
        div.append(span);
    });
};

const daily = (weatherData, parent) => {
    const div = document.querySelector('div.daily');
    return Object.entries(weatherData.daily).forEach(([date, data]) => {
        const weatherCode = data.weatherCode;
        // 1. Create
        const span = document.createElement('span');
        const pDay = document.createElement('p');
        const i = document.createElement('i');
        // 2. Modify
        if (date === weatherData.current.time.split('T')[0]) {
            span.className = 'clicked';
            pDay.textContent = 'Today';
        }
        span.className = 'none';
        span.id = date;
        span.dataset.date = date;
        span.dataset.weatherCode = weatherCode;
        span.dataset.high = date.maxTemperature;
        span.dataset.low = date.minTemperature;
        span.dataset.precipitation = date.precipitation;
        span.dataset.windDirection = date.windDirection;
        pDay.className = 'day';
        i.className = weatherIcons[weatherCode];

        pDay.textContent = date.day;
        // 3. Append
        span.append(pDay, i);
        div.append(span);
    });
};

const conditions = (parent) => {
    const daily = document.querySelector('div.daily');
    const div = document.querySelector('div.conditions');
    daily.addEventListener('click', (e) => {
        div.innerHTML = '';
        const span = e.target.closest('span');
        if (!span || !span.classList.contains('clicked')) return;
        // 1. Create
        const pHigh = document.createElement('p');
        const pLow = document.createElement('p');
        const pPrecipitation = document.createElement('p');
        const pWindDirection = document.createElement('p');
        // 2. Modify
        pHigh.className = 'details';
        pLow.className = 'details';
        pPrecipitation.className = 'details';
        pWindDirection.className = 'details';

        pHigh.textContent = `High: ${span.dataset.high}°F`;
        pLow.textContent = `Low: ${span.dataset.low}°F`;
        pPrecipitation.textContent = `Precipitation: ${span.dataset.precipitation} inches`;
        pWindDirection.textContent = `Wind Direction: ${span.dataset.windDirection}°`;
        // 3. Append
        div.append(pHigh, pLow, pPrecipitation, pWindDirection);
    });
};

const proverb = (parent) => {
    const daily = document.querySelector('div.daily');
    const div = document.querySelector('div.proverb');
    daily.addEventListener('click', (e) => {
        div.innerHTML = '';
        if (!e.target.classList.contains('clicked')) {
            return;
        }
        // 1. Create
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        // 2. Modify
        const weatherCode = e.target.closest('span').dataset.weatherCode;
        const sloganData = slogans[weatherCode];
        h3.textContent = `${sloganData.name}:`;
        p.textContent = sloganData.phrase;
        // 3. Create
        div.append(h3, p);
    });
};

export const renderWeatherData = async () => {
    const temperatureUnit = initializeTempUnit();
    const weatherData = await getWeatherData(
        40.6501,
        -73.94958,
        'Brooklyn',
        temperatureUnit
    );

    form(weatherData);
};
