// db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

// Crear un pool de conexiones usando las variables de entorno
const db = mysql.createPool({
    host: process.env.DB_HOST, // Usar la variable de entorno para el host
    user: process.env.DB_USER, // Usar la variable de entorno para el usuario
    password: process.env.DB_PASSWORD, // Usar la variable de entorno para la contraseña
    database: process.env.DB_NAME, // Usar la variable de entorno para el nombre de la base de datos
    port: process.env.DB_PORT, // Usar la variable de entorno para el puerto
    connectionLimit: 10, // Limitar el número de conexiones
    connectTimeout: 20000, // Aumentar el tiempo de espera a 20 segundos
    ssl: {
        rejectUnauthorized: false // Permitir certificados autofirmados
    }
});

// Función para probar la conexión a la base de datos
async function connectToDatabase() {
    try {
        const connection = await db.getConnection(); // Obtener una conexión del pool
        console.log('Connected to the MySQL database');
        await connection.release(); // Liberar la conexión de vuelta al pool
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

// Llamar a la función para probar la conexión
connectToDatabase();

// Manejo de errores para el pool de conexiones
db.on('error', (err) => {
    console.error('Database connection error:', err);
});

// Exportar el pool de conexiones
module.exports = db;