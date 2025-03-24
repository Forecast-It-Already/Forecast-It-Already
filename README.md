# **FORECAST IT ALREADY!**

Created by [Braily Guzman](https://github.com/brailyguzman) and [Athena Chang](https://github.com/AthenaC).

## 🚀 Mission Statement

Our application, FORECAST IT ALREADY! is for anyone who needs quick and reliable weather updates, including travelers, outdoor enthusiasts, and daily planners. It allows users to check real-time weather conditions, hourly forecasts, and multi-day predictions with ease. By leveraging three API endpoints, the app provides accurate location-based weather data, helping users make informed decisions for their activities. Its clean and intuitive interface ensures a seamless experience for accessing essential weather insights anytime, anywhere.

## 👾 API

This application will use the [Open Meteo API](https://open-meteo.com/). Below are the documentation and specific endpoints we intend to use and the front-end pages that will use them.

- Link to API documentation: [Open Meteo API](https://open-meteo.com/en/docs)
- API endpoint #1: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,precipitation,wind_direction_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_direction_10m_dominant&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FNew_York
  - This will fetch an array of data based on latitude and longitude of the location.
  - `Current Weather Units` and `Current Weather` with `Time`, `Temperature`, `Precipitation`, `Wind Direction`, `Is Day` (0: True, 1: False), `Weather Code` (Number for Raining, Clear, etc.)
- API endpoint #2: https://geocoding-api.open-meteo.com/v1/search?name=Bronx&count=1&language=en&format=json
  - This will fetch the latitude and longitude based on the name of the location.
  - `latitude` and `longitude`.
 
## Screenshot of Fetch Calls
![image](https://github.com/user-attachments/assets/a0093cd2-1ecc-415f-a999-1526448ca13f)

![image](https://github.com/user-attachments/assets/0f5de39b-e10a-4d33-8ee6-03c2a6e6ebe7)


## 👩‍💻 MVP User Stories 

The application will feature the following frontend routes and core features:

* Users will be able to see a prompt asking to share their current location, if shared the website will display weather data for their current location, otherwise, it will display Brooklyn’s weather data.
* Users will be able to look up weather data for a desired location.
* Users will be able to additionally see the temperature and weather conditions of the next six days.
* Users will be able to change between Fahrenheit and Celsius for the weather information.
* Users will be able to select one of the days displayed and get information for that particular day.

## 🤔 Stretch User Stories

If time permits, the following stretch features will be implemented in order of priority:

* Users will be able to change between dark and light mode
* Users will be able to store last searched location
* Users will be able to see the time in 12-Hour instead of military
* Users will be able to see the real time in the header
* Users will be able to see the current time based on timezone
* Users will be able to see the day and night icon based on time in hourly
* Users will be able to distinguish which state the city they input is from
* Users will be able to use this weather app on smaller screen sizes.
* Users will be able to relate to the New York City phrases based on temperature in NYC

## 🖼️ Wireframe of Our Application

Below, you can find wireframes for our project. Each wireframe shows a different page of our application as well as the key components of the application. Details such as specific text values or images are intentionally not included:

### [Excalidraw Wireframe](https://excalidraw.com/#room=77e38289a32c26b565f5,ESQC5PpMQXdHWn3cl7NdLg)
![image](https://github.com/user-attachments/assets/1324e284-7103-45d8-a7af-3c68f2c969ac)

### [Presentation](https://docs.google.com/presentation/d/1ZwWJtE1tlQDsFq1GtcfDzTm-1ndjCJDr-apcewJ551M/edit#slide=id.g2b32ee03b40_0_140)

### [Proposal Draft](https://docs.google.com/document/d/1PacE9h47AcPaDv5vXoINWJ_VSta1BNq7p-TCUaewmg8/edit?tab=t.0)
