const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const peliculasRoutes = require('./routes/peliculas');
const app = express();
const PORT = 8080;
require('dotenv').config(); // Cargar variables de entorno

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

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

// Rutas
app.use('/peliculas', peliculasRoutes);

app.use('/uploads', express.static('uploads'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});