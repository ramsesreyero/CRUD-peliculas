require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Usar promesas para facilitar el manejo
const peliculasRoutes = require('./routes/peliculas');
const categoriasRoutes = require('./api/generos'); // Importar las rutas de categorías
const { createProxyMiddleware } = require('http-proxy-middleware');
const multer = require('multer');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for logging requests
app.use(morgan('tiny'));

// Middleware for CORS
app.use(cors({
    origin: [
        'https://crud-peliculas-pyyp388wu-ramsesreyeros-projects.vercel.app',
        'https://crud-peliculas-omega.vercel.app',
        'http://localhost:8080',
        'http://10.22.0.135:8080',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
 app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Set up multer for file uploads
const upload = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Ensure this directory exists
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname); // Name the file
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5 MB
});

// Routes for handling movies
app.use('/api/peliculas', peliculasRoutes); // Apply multer only to specific routes
app.use('/api/generos', categoriasRoutes); // Usar las rutas de categorías

// Proxy setup for external API
app.use('/api', createProxyMiddleware({ 
    target: 'https://crud-peliculas-omega.vercel.app/', 
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Rewrites the path to exclude /api
    },
}));

// Database connection using a pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10 // Limit the number of connections
});

// Connect to the database
db.getConnection()
    .then(connection => {
        console.log('Connected to the MySQL database');
        connection.release(); // Release the connection back to the pool
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});