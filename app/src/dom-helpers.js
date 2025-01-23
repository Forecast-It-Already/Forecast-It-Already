import { DateTime } from 'luxon';
import { getWeatherIcons, slogans } from './constants.js';
import { getClimateChange, getWeatherData } from './fetch.js';
import { getTemperatureUnit } from './storage.js';
import Chart from 'chart.js/auto';

/**
 *
 * @param {string} timezone
 * @param {boolean} includeMinutes
 * @param {boolean} oneDigitHour
 * @returns - Formatted time "01:12 PM" | "12:35 AM"
 */

// Form Container
export const form = (weatherData) => {
    const weatherIcons = getWeatherIcons(weatherData.timezone);

    document.querySelector('h2#current-weather-title').textContent =
        weatherData.name;

    document.querySelector('i#current-weather-icon').className =
        weatherIcons[weatherData.current.weatherCode];

    document.querySelector('h3#current-weather-temperature').textContent =
        weatherData.current.temperature;

    document.querySelector('h1#current-weather-time').textContent =
        DateTime.now().setZone(weatherData.timezone).toFormat('h:mm a');
};

const hourly = (weatherData) => {
    const div = document.querySelector('div.hourly');

    div.innerHTML = ``;

    Object.entries(weatherData.hourly).forEach(([time, data]) => {
        const weatherCode = data.weatherCode;
        const weatherIcons = getWeatherIcons(
            weatherData.timezone,
            data.isoTime
        );

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

        pTime.textContent = time;

        pTemp.textContent = data.temperature;

        // 3. Append
        span.append(pTime, i, pTemp);
        div.append(span);
    });
};

const daily = (weatherData) => {
    const div = document.querySelector('div.daily');
    let foundToday = false;
    div.innerHTML = ``;

    Object.entries(weatherData.daily).forEach(([date, data]) => {
        const weatherCode = data.weatherCode;
        const weatherIcons = getWeatherIcons();

        // 1. Create
        const span = document.createElement('span');
        const pDay = document.createElement('p');
        const i = document.createElement('i');

        // 2. Modify
        if (!foundToday && date === weatherData.current.time.split('T')[0]) {
            span.className = 'clicked';
            pDay.textContent = 'Today';
            foundToday = true;
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

        const temperatureUnit = getTemperatureUnit();

        pHigh.textContent = `High: ${span.dataset.high}${
            temperatureUnit === 'celsius' ? `°C` : `°F`
        }`;
        pLow.textContent = `Low: ${span.dataset.low}${
            temperatureUnit === 'celsius' ? `°C` : `°F`
        }`;
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

    const date = `${new Date().getFullYear()}-01-01`;

    const { labels, values } = await getClimateChange(
        latitude,
        longitude,
        date,
        getTemperatureUnit()
    );

    const graphSection = document.getElementById('graph-container');
    graphSection.innerHTML = ``;

    const canvas = document.createElement('canvas');
    canvas.style = 'width: 100%; height: 400px;';

    const style = window.getComputedStyle(document.body);

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Max Temperature',
                    data: values,
                    backgroundColor: style.getPropertyValue('--accent'),
                    borderColor: style.getPropertyValue('--border'),
                    borderWidth: 1,
                    borderRadius: parseInt(
                        style.getPropertyValue('--border-radius'),
                        10
                    ),
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        },
    });

    graphSection.appendChild(canvas);
};
