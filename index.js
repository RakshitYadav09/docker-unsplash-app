require('dotenv').config();  // Load environment variables from a .env file into process.env  
const express = require('express');  // Import the Express framework to create a web server  
const axios = require('axios');  // Import Axios for making HTTP requests  

const app = express();
const PORT = 3000;

// Get Unsplash API Key from .env file
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get('/', async (req, res) => {
    try {
        // Fetch a random tech-related image from Unsplash
        const response = await axios.get(`https://api.unsplash.com/photos/random?query=technology&client_id=${UNSPLASH_ACCESS_KEY}`);
        const imageUrl = response.data.urls.regular;

        // Send an HTML response with the image
        res.send(`
            <html>
                <head>
                    <title>Dockerized Unsplash App</title>
                    <style>
                        body { text-align: center; font-family: Arial, sans-serif; padding: 20px; }
                        .image-container { position: relative; width: 100%; max-width: 80%; margin: 20px auto; }
                        .image-container::before { content: ""; display: block; padding-top: 56.25%; } /* 16:9 aspect ratio */
                        img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 10px; }
                    </style>
                </head>
                <body>
                    <h1>Fetching an image from Unsplash in a docker container</h1>
                    <div class="image-container">
                        <img src="${imageUrl}" alt="Unsplash Random Image">
                    </div>
                    <p>running using docker</p>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching image:', error.message);
        res.status(500).send('Error fetching image from Unsplash.');
    }
});

// Start the server here 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));