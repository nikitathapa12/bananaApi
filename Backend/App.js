//Import the express for creating server, cors middleware to handle request, connectDB to connect database

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/Config/db.js');

// Import route handlers for authentication, scores, and leaderboard
const authRoute= require('./src/Routes/authRoute');
const scoreRoutes=require('./src/Routes/scoreRoutes.js')
const leaderboardRoutes = require('./src/Routes/leaderboardRoutes');


// Load environment variables from the .env file
require('dotenv').config(); 

const app = express(); //initialize express



// Middleware to handle and process JSON data from incoming requests
app.use(express.json()); 

const port = process.env.port || 8000;

connectDB();

// Enable CORS to allow requests from different origins
app.use(cors());



// Define the route for authentication-related requests,score-related requests,leaderboard-related requests
app.use('/api/auth', authRoute);
app.use('/api/score', scoreRoutes);
app.use('/api/leaderboard', leaderboardRoutes);







// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
