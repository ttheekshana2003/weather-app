const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/getWeather', async(req, res) => {
    const { city, unit } = req.body;
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Extract weather data and send it as JSON response
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        res.json({
            temperature,
            description,
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

module.exports = app;