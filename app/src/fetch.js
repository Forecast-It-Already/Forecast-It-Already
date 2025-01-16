/**
 * Fetch weather data based on the latitude and longitude
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} name - The name of the location.
 * @returns {Object} - Organized weather data including current, hourly, and daily forecasts.
 */
export const getWeatherData = async (latitude, longitude, name) => {
    // Build the API endpoint with query parameters to specify the required data.
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURI(
        latitude
    )}&longitude=${encodeURI(
        longitude
    )}&current=temperature_2m,precipitation,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_direction_10m_dominant&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FNew_York`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Weather Data Request Failed');
        }

        const data = await response.json();

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
            daily[key] = {
                weatherCode: data.daily.weather_code[index],
                minTemperature: data.daily['temperature_2m_min'][index],
                maxTemperature: data.daily['temperature_2m_max'][index],
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
        const currentDate = new Date(); // Current date and time for filtering out past data.

        data.hourly.time.forEach((key, index) => {
            const date = new Date(key);

            // Skip past hourly data to only include future data.
            if (currentDate >= date) return;

            // Store the hourly temperature and weather code with their respective units.
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
