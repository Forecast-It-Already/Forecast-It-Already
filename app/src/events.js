import { updateTempUnit } from './storage.js';

const temperatureUnitButton = document.getElementById('temperature-switch');

temperatureUnitButton.addEventListener('click', (e) => {
    if (e.target.tagName !== 'SPAN') {
        return;
    }

    const temperatureOptions = document.querySelectorAll(
        '.temperature-switch-option'
    );

    temperatureOptions.forEach((option) => {
        option.classList.toggle('active-temperature');
    });

    updateTempUnit();
});
