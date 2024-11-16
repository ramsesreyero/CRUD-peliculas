require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const peliculasRoutes = require('./routes/peliculas');
const { createProxyMiddleware } = require('http-proxy-middleware');
const multer = require('multer');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for logging requests
app.use(morgan('dev'));

// Middleware for CORS
app.use(cors({
    origin: [
        'https://crud-peliculas-pyyp388wu-ramsesreyeros-projects.vercel.app',
        'https://crud-peliculas-omega.vercel.app',
        'http://localhost:8080' // Add your local development URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Routes for handling movies
app.use('/api/peliculas', peliculasRoutes); // Use the router directly

// Proxy setup for external API
app.use('/api', createProxyMiddleware({ 
    target: 'https://crud-peliculas-omega.vercel.app/', 
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Rewrites the path to exclude /api
    },
}));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status( 404).json({ error: 'Not Found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});