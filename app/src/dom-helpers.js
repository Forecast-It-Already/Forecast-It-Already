import { weatherIcons, slogans } from './constants.js';

// Form Container
export const form = (weatherData) => {
    // 1. Create
    const h2 = document.querySelector('h2.current-weather-title');
    const i = document.querySelector('i#current-weather-icon');
    const h3 = document.querySelector('h3#current-weather-temperature');
    const h1 = document.querySelector('h1#current-weather-time');
    // 2. Modify
    h2.textContent = weatherData.name;
    i.className = weatherIcons[weatherData.weatherCode];
    h3.textContent = weatherData.current.temperature;
    h1.textContent = weatherData.current.time.split('T')[1];
};

// Weather Data Container
export const weatherDataContainer = () => {
    const div = document.querySelector('div.weather-data-container');
    div.append(hourly, weatherDetailsContainer);
};

const hourly = (weatherData) => {
    const div = document.querySelector('div.hourly');
    return Object.entries(weatherData.hourly).forEach(([time, data]) => {
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

// Weather Details Container
export const weatherDetailsContainer = () => {
    const div = document.querySelector('div.weather-details-container');
    const conditionsProverb = document.querySelector('div.conditions-proverb');
    conditionsProverb.append(conditions, proverb);
    div.append(daily, conditionsProverb);
};

const daily = (weatherData) => {
    const div = document.querySelector('div.daily');
    return Object.entries(weatherData.daily).forEach(([date, data]) => {
        const weatherCode = data.weatherCode;
        // 1. Create
        const span = document.createElement('span');
        const pDay = document.createElement('p');
        const i = document.createElement('i');
        // 2. Modify
        if (date === weatherData.current.time.split("T")[0]) {
            span.className = 'clicked';
            pDay.textContent = "Today";
        };
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

const conditions = () => {
    const daily = document.querySelector('div.daily');
    const div = document.querySelector('div.conditions');
    daily.addEventListener('click', (e) => {
        div.innerHTML = '';
        const span = e.target.closest('span');
        if (!span || !span.classList.contains("clicked")) return;
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

const proverb = () => {
    const daily = document.querySelector('div.daily');
    const div = document.querySelector('div.proverb');
    daily.addEventListener('click', (e) => {
        div.innerHTML = '';
        if (!e.target.classList.contains("clicked")) {
            return;
        };
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
