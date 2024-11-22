// db.js
const mysql = require('mysql2/promise');

// Crear un pool de conexiones usando la URL de conexión de Railway
const db = mysql.createPool({
    uri: 'mysql://root:rvbevVIEJYqqzefyTimybsrWsWuplSrJ@junction.proxy.rlwy.net:32229/railway',
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