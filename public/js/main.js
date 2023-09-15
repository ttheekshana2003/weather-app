document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const unitSelect = document.getElementById('unit-select');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    weatherForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const city = cityInput.value;

        try {
            const response = await fetch('/newWeather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city }), // Send only the city in the request body
            });

            if (response.ok) {
                const data = await response.json();

                const unit = 'metric';
                const name = data.name;
                const region = data.region;
                const country = data.country;
                const temperature = data.temperature;
                const description = data.description;
                const clouds = data.clouds;
                const wind_speed = data.wind_speed;
                const wind_deg = data.wind_deg;
                const wind_dir = data.wind_dir;
                const wind_gust = data.wind_gust;

                weatherInfo.innerHTML = `<div class="card" style="width: 18rem;">
                                            <div class="card-body">
                                            <h5 class="card-title">${name}</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">${region}, ${country}</h6>
                                            <ul class="list-group">
                                            <li class="list-group-item"><p class="card-text">Temperature: ${temperature} °${unit === 'metric' ? 'C' : 'F'}</p></li>
                                            <li class="list-group-item"><p class="card-text">Weather: ${description}</p></li>
                                            <li class="list-group-item"><p class="card-text">Cloud coverage: ${clouds}%</p></li>
                                            <li class="list-group-item"><p class="card-text">Wind Speed: ${wind_speed}${unit === 'metric' ? 'km/h' : 'mph'}</p></li>
                                            <li class="list-group-item"><p class="card-text">Wind Direction: ${wind_dir} ${wind_deg}°</p></li>
                                            <li class="list-group-item"><p class="card-text">Gust: ${wind_gust}${unit === 'metric' ? 'km/h' : 'mph'}</p></li>
                                            </ul>
                                            </div>
                                        </div>`;

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
                console.error('Error fetching weather data 1:', response.statusText);
                weatherInfo.innerHTML = '<div class="text-bg-danger p-3">Error fetching weather data.</div>';
            }
        } catch (error) {
            console.error('Error:', error);
            weatherInfo.innerHTML = '<div class="text-bg-danger p-3">Error fetching weather data.</div>';
        }
    });
});