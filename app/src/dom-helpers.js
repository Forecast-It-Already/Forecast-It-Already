import 

// Form Container
export const form = () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.id = 'search';
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    
}

// Weather Data Container
export const weatherDataContainer = () => {
    const div = document.createElement('div');
    div.append(hourly, weatherDetailsContainer);
}

const hourly = (data) => {
    const div = document.createElement('div');
    data.hourly[time]
    const span = document.createElement('span');
    const pTime = document.createElement('p');
    pTime.id = 'time';
    const pTemp = document.createElement('p');
    pTemp.id = 'temperature';
    const i = document.createElement('i');
    const weatherCode = data.hourly.time[weatherCode];
    i.className = weatherIcons[weatherCode];
    h3Time.textContent = data.hourly[time];
    h3Temp.textContent = data.hourly.time[temperature];
    span.append(h3Time, i, h3Temp);
    div.append(span);
}

const weatherDetailsContainer = () => {
    const div = document.createElement('div');
    const conditionsProverb = document.createElement('div');
    conditionsProverb.append(conditions, proverb);
    div.append(daily, conditionsProverb);
}

const daily = () => {
    const div = document.createElement('div');
    const day = document.createElement('day');
    div.append(day);
}

const conditions = () => {

}

const proverb = () => {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const slogan = [
        {'rain': [
            'If the goose honks high, fair weather. If the goose honks low, foul weather.', 
            "When your joints start to ache, rainy weather is at stake.", 
            "When wooden chairs creak, rain will come within a week.", 
            "When gnats swarm and bite, rain is in sight."
        ]},
        {'humidity': "When pipes smell stronger, it’s going to rain."},
        {'dry': "If spiders are many and spinning their webs, the spell will soon be very dry."},
        {'cold': {
            name: 'New York',
            slogan: "It's BRICK outside!"
        }},
        {'sunset': "Red sky at night, sailor’s delight; red sky in morning, sailor’s warning."},
        {'storm': "When frogs croak loudly, it’s going to rain."},
        {'snow': "If a circle forms ‘round the moon, ‘twill rain or snow soon."},
        {'clear': "When the morning dew is heavy, rain will not come that day."}
    ]
}