const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Asegúrate de que este archivo tenga la configuración de tu base de datos

// Ruta para obtener los géneros
router.get('/', async (req, res) => {
    try {
        const results = await db.query('SELECT DISTINCT genero FROM peliculas');
        const generos = results[0].map(row => row.genero);
        res.json(generos);
    } catch (err) {
        console.error('Error al obtener los géneros:', err);
        return res.status(500).json({ error: 'Error al obtener los géneros' });
    }
});

module.exports = router;