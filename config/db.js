const mysql = require('mysql2/promise'); // Usar mysql2/promise para facilitar el manejo
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rvbevVIEJYqqzefyTimybsrWsWuplSrJ',
    database: process.env.DB_NAME || 'railway',
    port: process.env.DB_PORT || 3306, // Usa el puerto por defecto si no se especifica
    connectionLimit: 10 // Limitar el número de conexiones
});

// Exportar el pool de conexiones
module.exports = db;