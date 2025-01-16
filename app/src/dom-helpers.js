import { weatherIcons } from './constants.js';

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
    const div = document.querySelector('div#hourly');
    data.hourly[time].forEach(time => {
        // const span = document.createElement('span');
        
        const pTime = document.createElement('p');
        pTime.class = 'time';
        const pTemp = document.createElement('p');
        pTemp.class = 'temperature';
        const i = document.createElement('i');
        const weatherCode = weatherData.hourly.time[weatherCode];
        i.className = weatherIcons[weatherCode];
        pTime.textContent = weatherData.hourly[time];
        pTemp.textContent = weatherData.hourly.time[temperature];
        span.append(pTime, i, pTemp);
        div.append(span);
    });
};

const weatherDetailsContainer = () => {
    const div = document.createElement('div');
    const conditionsProverb = document.createElement('div');
    conditionsProverb.append(conditions, proverb);
    div.append(daily, conditionsProverb);
};

const daily = (weatherData) => {
    const div = document.querySelector('div#daily');
    weatherData.daily.forEach(date => {
        // 1. Create
        const span = document.createElement('span');
        const pDay = document.createElement('p');
        const pTemp = document.createElement('p');
        const i = document.createElement('i');
        const weatherCode = date.weatherCode;
        // 2. Modify
        if (date === weatherData.current.time.split("T")[0]) {
            span.class = 'clicked';
            pDay.textContent = "Today";
        };
        span.class = 'none';
        pDay.class = 'day';
        pTemp.class = 'temperature';
        i.className = weatherIcons[weatherCode];
        
        pDay.textContent = date.day;
        pTemp.textContent = `${date.minTemperature} / ${date.maxTemperature}`;
        // 3. Append
        span.append(pDay, i, pTemp);
        div.append(span);
    });
};

const conditions = () => {};

const proverb = () => {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    
};
