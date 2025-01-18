import { weatherIcons, slogans } from './constants.js';
import { getWeatherData } from './fetch.js';
import { getTemperatureUnit } from './storage.js';

// Form Container
export const form = (weatherData) => {
    const military = weatherData.current.time.split('T')[1];
    // Formatting from Military to 12-Hour:
    const [hours, minutes] = military.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12; // One way
    // const adjustedHours = ((hours + 11) % 12 + 1); // Second way
    const time12Hour = `${adjustedHours}:${minutes} ${period}`;

    document.querySelector('h2#current-weather-title').textContent =
        weatherData.name;

    document.querySelector('i#current-weather-icon').className =
        weatherIcons[weatherData.current.weatherCode];

    document.querySelector('h3#current-weather-temperature').textContent =
        weatherData.current.temperature;

    // document.querySelector('h1#current-weather-time').textContent =
    //     weatherData.current.time.split('T')[1];
    document.querySelector('h1#current-weather-time').textContent =
        time12Hour;
};

const hourly = (weatherData) => {
    const div = document.querySelector('div.hourly');

    div.innerHTML = ``;

    Object.entries(weatherData.hourly).forEach(([time, data]) => {
        const military = time.split('T')[1];
        // Formatting from Military to 12-Hour:
        const [hours, minutes] = military.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        // const adjustedHours = hours % 12 || 12; // One way
        const adjustedHours = ((hours + 11) % 12 + 1); // Second way
        const time12Hour = `${adjustedHours} ${period}`;

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

        // pTime.textContent = military;
        pTime.textContent = time12Hour;
        pTemp.textContent = data.temperature;

        // 3. Append
        span.append(pTime, i, pTemp);
        div.append(span);
    });
};

const daily = (weatherData) => {
    const div = document.querySelector('div.daily');
    div.innerHTML = ``;

    Object.entries(weatherData.daily).forEach(([date, data]) => {
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
        span.dataset.high = data.maxTemperature;
        span.dataset.low = data.minTemperature;
        span.dataset.precipitation = data.precipitation;
        span.dataset.windDirection = data.windDirection;
        pDay.className = 'day';
        i.className = weatherIcons[weatherCode];

        pDay.textContent = data.day;

        // 3. Append
        span.append(pDay, i);
        div.append(span);
    });
};

const conditions = () => {
    const daily = document.querySelector('div.daily');
    const div = document.querySelector('div.conditions');

    daily.addEventListener('click', (e) => {
        const span = e.target.closest('span');

        if (!span) return;

        div.innerHTML = '';

        const previousClicked = document.querySelector('.clicked');

        if (previousClicked) previousClicked.className = 'none';

        span.className = 'clicked';

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

        pHigh.textContent = `High: ${span.dataset.high}${getTemperatureUnit() === 'celsius' ? `°C` : `°F`}`;
        pLow.textContent = `Low: ${span.dataset.low}${getTemperatureUnit() === 'celsius' ? `°C` : `°F`}`;
        pPrecipitation.textContent = `Precipitation: ${span.dataset.precipitation} in`;
        pWindDirection.textContent = `Wind Direction: ${span.dataset.windDirection}°`;

        // 3. Append
        div.append(pHigh, pLow, pPrecipitation, pWindDirection);
        proverb(span);
    });

    document.querySelectorAll('.none')[0].click();
};

const proverb = (span) => {
    const div = document.querySelector('div.proverb');
    div.innerHTML = '';

    // 1. Create
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    // 2. Modify
    const weatherCode = span.dataset.weatherCode;
    const sloganData = slogans[weatherCode];
    h3.textContent = `${sloganData.name}:`;
    p.textContent = sloganData.phrase;

    // 3. Create
    div.append(h3, p);
};

export const renderTheme = (theme) => {
    const themeButton = document.getElementById('theme-change-button');

    let themeClass;

    if (theme === 'dark') {
        themeClass = 'wi wi-day-sunny';
    } else {
        themeClass = 'fas fa-moon';
    }

    themeButton.innerHTML = `<i class='${themeClass}'></i>`;
};

const renderContainers = (weatherData) => {
    form(weatherData);
    hourly(weatherData);
    daily(weatherData);
    conditions(weatherData);
};

export const renderWeatherData = async (weatherData) => {
    renderContainers(weatherData);
    const { latitude, longitude, name } = weatherData;

    document
        .getElementById('temperature-switch')
        .addEventListener('click', async () => {
            const newWeatherData = await getWeatherData(
                latitude,
                longitude,
                name,
                getTemperatureUnit()
            );

            renderContainers(newWeatherData);
        });
};
