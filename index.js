require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Get Unsplash API Key from .env file
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get('/', async (req, res) => {
    try {
        // Fetch a random image from Unsplash
        const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`);
        const imageUrl = response.data.urls.regular;

        // Send an HTML response with the image
        res.send(`
            <html>
                <head>
                    <title>Dockerized Unsplash App</title>
                    <style>
                        body { text-align: center; font-family: Arial, sans-serif; padding: 20px; }
                        img { max-width: 80%; height: auto; border-radius: 10px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <h1>Fetching an image from Unsplash in a docker container</h1>
                    <img src="${imageUrl}" alt="Unsplash Random Image">
                    <p>running using docker and jenkins</p>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching image:', error.message);
        res.status(500).send('Error fetching image from Unsplash.');
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
