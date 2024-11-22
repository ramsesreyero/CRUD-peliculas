const mysql = require('mysql2');
require('dotenv').config(); // Asegúrate de que esto esté al principio

const db = mysql.createConnection({
    host: process.env.DB_HOST, // mysql.railway.internal
    user: process.env.DB_USER, // root
    password: process.env.DB_PASSWORD, // rvbevVIEJYqqzefyTimybsrWsWuplSrJ
    database: process.env.DB_NAME // railway
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db; // Asegúrate de exportar la conexión si es necesario