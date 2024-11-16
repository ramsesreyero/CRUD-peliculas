// api/generos.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Asegúrate de que este archivo tenga la configuración de tu base de datos

// Ruta para obtener los géneros
router.get('/', (req, res) => {
    db.query('SELECT DISTINCT genero FROM peliculas', (err, results) => {
        if (err) {
            console.error('Error al obtener los géneros:', err);
            return res.status(500).json({ error: 'Error al obtener los géneros' });
        }
        // Mapeamos los resultados para obtener solo los nombres de los géneros
        const generos = results.map(row => row.genero);
        res.json(generos);
    });
});

module.exports = router;