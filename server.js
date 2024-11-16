require('dotenv').config(); // Asegúrate de que esto esté al principio
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const peliculasRoutes = require('./routes/peliculas');
const { createProxyMiddleware } = require('http-proxy-middleware');
async function fetchData() {
    const response = await fetch('/api/peliculas');
    // Handle the response here
}

// Call the async function
fetchData().catch(error => console.error(error));
const app = express();
const PORT = 8080;

// Verificar las variables de entorno
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Middleware
app.use(cors({
    origin: [
        'https://crud-peliculas-pyyp388wu-ramsesreyeros-projects.vercel.app',
        'https://crud-peliculas-omega.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Configura el proxy para redirigir a la API externa
app.use('/api', createProxyMiddleware({ 
    target: 'https://crud-peliculas-omega.vercel.app/', 
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Reescribe la ruta para que no incluya /api
    },
}));

app.use('/api/peliculas', peliculasRoutes); // Aquí es donde defines la ruta


// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Rutas para manejar las películas desde la base de datos local
app.use('/peliculas', peliculasRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
