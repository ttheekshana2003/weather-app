document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const unitSelect = document.getElementById('unit-select');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    weatherForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const city = cityInput.value;
        const unit = unitSelect.value;
        const apiKey = 'YOUR_API_KEY'; // Replace with your API key
        const apiUrl = '/getWeather'; // Place it here

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city, unit }),
            });

            if (response.ok) {
                const data = await response.json();
                // Extract weather data and update the UI
                const temperature = data.temperature;
                const description = data.description;

                weatherInfo.innerHTML = `<p>Temperature: ${temperature} °${unit === 'metric' ? 'C' : 'F'}</p>
                                     <p>Weather: ${description}</p>`;

                // Update weather icon or background image based on weather conditions
                const weatherCondition = description.toLowerCase();
                if (weatherCondition.includes('rain')) {
                    weatherIcon.style.backgroundImage = 'url("rainy.jpg")'; // Add path to your rainy image
                } else if (weatherCondition.includes('clear')) {
                    weatherIcon.style.backgroundImage = 'url("sunny.jpg")'; // Add path to your sunny image
                } else {
                    weatherIcon.style.backgroundImage = ''; // Clear background image
                }
            } else {
                console.error('Error fetching weather data:', response.statusText);
                weatherInfo.innerHTML = 'Error fetching weather data';
            }
        } catch (error) {
            console.error('Error:', error);
            weatherInfo.innerHTML = 'Error fetching weather data';
        }
    });
});