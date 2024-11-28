const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Make sure you have this to connect to MongoDB
const todoRoutes = require('./routes/todos');  // Import your routes
require('dotenv').config();  // For environment variables like port, db credentials

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());  // Enable CORS for all requests (important for your frontend)
app.use(express.json());  // Enable JSON parsing for request bodies

// Routes
app.use('/api', todoRoutes);  // All routes defined in todoRoutes.js will be prefixed with '/api'

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
