/**
 * Fetch weather data based on the latitude and longitude
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} name
 * @returns {Object}
 */
export const getWeatherData = async (latitude, longitude, name) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURI(
        latitude
    )}&longitude=${encodeURI(
        longitude
    )}&current=temperature_2m,precipitation,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_direction_10m_dominant&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FNew_York`;

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('Weather Data Request Failed');

        const data = await response.json();

        const daily = {};

        for (const [index, key] of data.daily.time.entries()) {
            const weatherCode = data.daily.weather_code[index];
            const minTemperature = data.daily['temperature_2m_min'][index];
            const maxTemperature = data.daily['temperature_2m_max'][index];
            const precipitation = data.daily['precipitation_sum'][index];
            const windDirection =
                data.daily['wind_direction_10m_dominant'][index];

            daily[key] = {
                weatherCode,
                minTemperature,
                maxTemperature,
                maxTemperature,
                precipitation,
                windDirection,
            };
        }

        const hourly = {};
        const hourlyUnits = data.hourly_units;

        for (const [index, key] of data.hourly.time.entries()) {
            const currentDate = new Date();
            const date = new Date(key);

            if (currentDate >= date) {
                continue;
            }

            const temperature =
                data.hourly['temperature_2m'][index] +
                hourlyUnits['temperature_2m'];
            const weatherCode = data.hourly['weather_code'][index];

            hourly[key] = {
                temperature,
                weatherCode,
            };
        }

        const currentUnits = data['current_units'];

        // TODO: Add Minimum and Maximum Temperature
        return {
            name,
            current: {
                time: data.current.time,
                temperature:
                    data.current['temperature_2m'] + currentUnits.temperature, // ! Fix NaN value
                precipitation:
                    data.current['precipitation'] + currentUnits.precipitation,
                windDirection:
                    data.current['wind_direction_10m'] +
                    currentUnits['wind_direction_10m'],
            },
            hourly,
            daily,
        };
    } catch (err) {
        console.error(err);
    }
};

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
