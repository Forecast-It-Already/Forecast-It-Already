/**
 * Fetch weather data based on the latitude and longitude
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} name - The name of the location.
 * @param {string} unit - The temperature unit
 * @returns {Object} - Organized weather data including current, hourly, and daily forecasts.
 */
export const getWeatherData = async (latitude, longitude, name, unit) => {
    // Build the API endpoint with query parameters to specify the required data.
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURI(
        latitude
    )}&longitude=${encodeURI(
        longitude
    )}&current=temperature_2m,precipitation,weather_code,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_direction_10m_dominant&temperature_unit=${unit}&precipitation_unit=inch&timezone=America%2FNew_York`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Weather Data Request Failed');
        }

        const data = await response.json();

        const currentDate = new Date(); // Current date and time for filtering out past data.

        /**
         * Organize daily weather data.
         * The API provides arrays for daily data (e.g., temperatures, precipitation),
         * which are disorganized. We'll restructure them into an object:
         *
         * key: The date (e.g., "2025-01-15")
         * value: An object containing precipitation, temperature, wind direction, and weather code.
         */
        const daily = {};
        data.daily.time.forEach((key, index) => {
            const day = new Date(key).getDay();
            const daysOfWeek = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ];

            if (currentDate.getDay() === day + 1) {
                daysOfWeek[day] = 'Today';
            }

            daily[key] = {
                day: daysOfWeek[day],
                weatherCode: data.daily.weather_code[index],
                minTemperature: Math.round(
                    data.daily['temperature_2m_min'][index]
                ),
                maxTemperature: Math.round(
                    data.daily['temperature_2m_max'][index]
                ),
                precipitation: data.daily['precipitation_sum'][index],
                windDirection: data.daily['wind_direction_10m_dominant'][index],
            };
        });

        /**
         * Organize hourly weather data.
         * Similar to daily data, hourly data is also disorganized. We'll structure it into an object:
         *
         * key: The date and time (e.g., "2025-01-15T22:00")
         * value: An object containing temperature and weather code.
         */
        const hourly = {};
        const hourlyUnits = data.hourly_units; // Units for hourly data, e.g., °F or °C.
        const oneDayLater = new Date(
            currentDate.getTime() + 24 * 60 * 60 * 1000
        ); // 24 hours from now

        data.hourly.time.forEach((key, index) => {
            const date = new Date(key);

            if (currentDate >= date || date > oneDayLater) return;

            hourly[key] = {
                temperature:
                    Math.round(data.hourly['temperature_2m'][index]) +
                    (hourlyUnits?.['temperature_2m'] || '°F'),
                weatherCode: data.hourly['weather_code'][index],
            };
        });

        /**
         * Extract and organize current weather data.
         * Includes the time of the reading, temperature, precipitation, and wind direction.
         */
        const currentUnits = data.current_units;

        return {
            name, // Name of the location.
            current: {
                time: data.current.time,
                temperature:
                    Math.round(data.current['temperature_2m']) +
                    (currentUnits['temperature_2m'] || '°F'),
                precipitation:
                    data.current['precipitation'] +
                    (currentUnits.precipitation || 'in'),
                windDirection:
                    data.current['wind_direction_10m'] +
                    (currentUnits['wind_direction_10m'] || '°'),
                weatherCode: data.current['weather_code'],
            },
            hourly, // Organized hourly forecast.
            daily, // Organized daily forecast.
        };
    } catch (err) {
        console.error('Error fetching weather data:', err.message);

        return {
            name,
            current: null,
            hourly: {},
            daily: {},
        };
    }
};

/**
 * Fetch the latitude and longitude from a location name like "Brooklyn"
 * @param {string} name
 * @returns {object}
 */
export const getGeoCoding = async (name) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Location Not Found');

        const data = await response.json();
        const geoData = data.results[0];

        return {
            name: geoData.name,
            latitude: geoData.latitude,
            longitude: geoData.longitude,
        };
    } catch (err) {
        console.error(err);
        return null;
    }
};
