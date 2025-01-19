import { DateTime } from 'luxon';

const dayIcons = {
    0: 'wi wi-day-sunny',
    1: 'wi wi-day-cloudy',
    2: 'wi wi-cloud',
    3: 'wi wi-cloudy',
    45: 'wi wi-fog',
    48: 'wi wi-fog',
    51: 'wi wi-sprinkle',
    53: 'wi wi-sprinkle',
    55: 'wi wi-showers',
    61: 'wi wi-rain',
    63: 'wi wi-rain',
    65: 'wi wi-rain',
    66: 'wi wi-rain-mix',
    67: 'wi wi-rain-mix',
    71: 'wi wi-snow',
    73: 'wi wi-snow',
    75: 'wi wi-snow',
    80: 'wi wi-showers',
    81: 'wi wi-thunderstorm',
    82: 'wi wi-thunderstorm',
    95: 'wi wi-thunderstorm',
    96: 'wi wi-thunderstorm',
    99: 'wi wi-thunderstorm',
};

const nightIcons = {
    0: 'wi wi-night-clear',
    1: 'wi wi-night-alt-cloudy',
    2: 'wi wi-cloud',
    3: 'wi wi-cloudy',
    45: 'wi wi-fog',
    48: 'wi wi-fog',
    51: 'wi wi-sprinkle',
    53: 'wi wi-sprinkle',
    55: 'wi wi-showers',
    61: 'wi wi-rain',
    63: 'wi wi-rain',
    65: 'wi wi-rain',
    66: 'wi wi-rain-mix',
    67: 'wi wi-rain-mix',
    71: 'wi wi-snow',
    73: 'wi wi-snow',
    75: 'wi wi-snow',
    80: 'wi wi-showers',
    81: 'wi wi-thunderstorm',
    82: 'wi wi-thunderstorm',
    95: 'wi wi-thunderstorm',
    96: 'wi wi-thunderstorm',
    99: 'wi wi-thunderstorm',
};

export const getWeatherIcons = (timezone, isoTime) => {
    let date;

    if (!timezone) {
        return dayIcons;
    } else if (isoTime) {
        date = DateTime.fromISO(isoTime, { zone: timezone });
    } else {
        date = DateTime.now().setZone(timezone);
    }

    const hour = date.hour;

    if (hour >= 6 && hour < 18) {
        return dayIcons;
    }

    return nightIcons;
};

export const slogans = {
    0: { name: 'Slogan', phrase: 'Clear skies, clear mind!' },
    1: {
        name: 'Proverb',
        phrase: 'If the goose honks high, fair weather. If the goose honks low, foul weather.',
    },
    2: {
        name: 'Slogan',
        phrase: 'Overcast skies, but the day is still yours to seize!',
    },
    3: {
        name: 'Proverb',
        phrase: 'When wooden chairs creak, rain will come within a week.',
    },
    45: {
        name: 'Proverb',
        phrase: 'Fog in the morning, travelers take warning.',
    },
    48: {
        name: 'Slogan',
        phrase: 'Lost in the mist, but found in the moment.',
    },
    51: { name: 'Slogan', phrase: 'A sprinkle of rain, a sprinkle of magic.' },
    53: { name: 'Slogan', phrase: 'Gentle showers for gentle thoughts.' },
    55: { name: 'Proverb', phrase: 'Rain before seven, fine by eleven.' },
    61: { name: 'Slogan', phrase: 'Rainy days are perfect for dreaming big.' },
    63: { name: 'Slogan', phrase: 'Let the rain wash away the stress.' },
    65: {
        name: 'Slogan',
        phrase: 'Raindrops keep falling, and so should your worries.',
    },
    66: {
        name: 'Slogan',
        phrase: 'Rain mixed with snow, nature’s perfect duo.',
    },
    67: {
        name: 'Proverb',
        phrase: 'When pipes smell stronger, it’s going to rain.',
    },
    71: { name: 'Proverb', phrase: 'Snowflakes are kisses from the sky.' },
    73: {
        name: 'Proverb',
        phrase: 'When the wind whistles through the trees, snow is on its way.',
    },
    75: { name: 'Slogan', phrase: 'Blankets of snow, blankets of joy.' },
    80: { name: 'Proverb', phrase: 'April showers bring May flowers.' },
    81: { name: 'Slogan', phrase: 'Thunderstorms: nature’s drumroll.' },
    82: { name: 'Slogan', phrase: 'Feel the power of the storm!' },
    95: { name: 'Proverb', phrase: 'Red sky at night, sailor’s delight.' },
    96: { name: 'Slogan', phrase: 'When the sky growls, listen to its story.' },
    99: { name: 'Slogan', phrase: 'Electric skies, electric vibes!' },
};
