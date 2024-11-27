require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Mantén esta declaración
const mysql = require('mysql2/promise'); // Usar promesas para facilitar el manejo
const peliculasRoutes = require('./routes/peliculas');
const categoriasRoutes = require('./api/generos'); // Importar las rutas de categorías
const { createProxyMiddleware } = require('http-proxy-middleware');
const multer = require('multer');
const morgan = require('morgan');
const db = require('./config/db'); // Ajusta la ruta según la ubicación de db.js

const app = express();
const PORT = process.env.PORT || 8080;


app.use(morgan('tiny'));

// Middleware CORS
app.use(cors({ // Usa cors aquí sin volver a declararlo
    origin: [
        'https://web-production-0ed3.up.railway.app',
        'http://localhost:8080',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


const upload = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); 
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } 
});


app.use('/api/peliculas', peliculasRoutes); 
app.use('/api/generos', categoriasRoutes);


app.use('/api', createProxyMiddleware({ 
    target: 'https://crud-peliculas-omega.vercel.app/', 
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
}));


db.getConnection()
    .then(connection => {
        console.log('Connected to the MySQL database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});