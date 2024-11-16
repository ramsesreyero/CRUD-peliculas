const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Function to handle the request
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        db.query('SELECT * FROM peliculas', (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json(results);
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};