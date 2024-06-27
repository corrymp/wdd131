const temperature = celsiusToFarenheit(13.9);
const windSpeed = kmphToMph(10);
const windChillElement = document.querySelector('#wind-chill');
let result = "";

function celsiusToFarenheit(temperature) { return (9 / 5 * temperature) + 32 };
function fahrenheitToCelsius(temperature) { return (temperature - 32) * 5 / 9 };
function kmphToMph(speed) { return speed / 1.609344 };
function calculateWindChill(temperature, windSpeed) { return 35.74 + 0.6215 * temperature - 35.75 * windSpeed ** 0.16 + 0.4275 * temperature * windSpeed ** 0.16 };

if (temperature > 50 || windSpeed <= 3) {
    result = "N/A";
}
else {
    result = `${fahrenheitToCelsius((calculateWindChill(temperature, windSpeed))).toFixed(2)}°C`;
}

windChillElement.textContent = result;