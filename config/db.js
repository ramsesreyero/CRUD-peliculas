const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const db = mysql.createConnection(dbConfig);

db.connect()
  .then(() => console.log('Conectado a la base de datos MySQL'))
  .catch(err => console.error('Error conectando a la base de datos:', err));

module.exports = db;