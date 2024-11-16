const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: '4Q5@YJM$PHb#8dS%', // Cambia esto por tu contraseña de MySQL
    database: 'movie_db' // Asegúrate de que esta base de datos exista
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;