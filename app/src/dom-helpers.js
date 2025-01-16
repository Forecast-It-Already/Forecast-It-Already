import { weatherIcons, slogans } from './constants.js';

// Form Container
export const form = () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.id = 'search';
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
};

// Weather Data Container
export const weatherDataContainer = () => {
    const div = document.createElement('div');
    div.append(hourly, weatherDetailsContainer);
};

const hourly = (weatherData) => {
    const div = document.querySelector('div.hourly');
    return weatherData.hourly.forEach(time => {
        const military = time.split('T')[1];
        const weatherCode = time.weatherCode;
        // 1. Create
        const span = document.createElement('span');
        const pTime = document.createElement('p');
        const pTemp = document.createElement('p');
        const i = document.createElement('i');
        // 2. Modify
        span.className = 'hour';
        pTime.className = 'time';
        pTemp.className = 'temperature';
        i.className = weatherIcons.weatherCode;
        
        pTime.textContent = military;
        pTemp.textContent = time.temperature;
        // 3. Append
        span.append(pTime, i, pTemp);
        div.append(span);
    });
};

const weatherDetailsContainer = () => {
    const div = document.querySelector('div.weatherDetailsContainer');
    const conditionsProverb = document.querySelector('div.conditionsProverb');
    conditionsProverb.append(conditions, proverb);
    div.append(daily, conditionsProverb);
};

const daily = (weatherData) => {
    const div = document.querySelector('div.daily');
    return weatherData.daily.forEach(date => {
        const weatherCode = date.weatherCode;
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
        if (!e.target.classList.contains("clicked")) {
            return;
        };
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
        
        pHigh.textContent = span.dataset.high;
        pLow.textContent = span.dataset.low;
        pPrecipitation.textContent = span.dataset.precipitation;
        pWindDirection.textContent = span.dataset.windDirection;
        // 3. Append
        div.append(pHigh, pLow, pPrecipitation, pWindDirection);
    })
};

const proverb = () => {
    const div = document.querySelector('div.proverb');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    
};
