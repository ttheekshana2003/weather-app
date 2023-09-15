const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about'); //
});

app.post('/newWeather', async(req, res) => {
    const { city } = req.body;
    const apiKey = 'eff503e6fbbc4dfba51181344222612';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const name = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const clouds = data.current.cloud;
        const wind_speed = data.current.wind_kph;
        const wind_deg = data.current.wind_degree;
        const wind_dir = data.current.wind_dir;
        const wind_gust = data.current.gust_kph;
        res.json({
            name,
            region,
            country,
            temperature,
            description,
            clouds,
            wind_speed,
            wind_deg,
            wind_dir,
            wind_gust
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

module.exports = app;