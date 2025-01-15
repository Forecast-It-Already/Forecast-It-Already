/*
    TODO Functions

    - getGeoCoding: This function will be responsible for
    fetching the server for the latitude and longitude based
    on a string like "Brooklyn".

    - fetchWeatherData: This function will be responsible
    for fetching the weather information.

*/

// Latitude Longitude API
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
            longitude: geoData.longitude
        };
    }
    catch (err) {
        console.error(err);
        return null;
    };
};