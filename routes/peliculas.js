const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const path = require('path');
const db = require('../config/db');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Ruta para agregar una nueva película
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { titulo, contenido, categoria, anio, genero } = req.body;

        if (!titulo || !contenido || !categoria || !anio || !genero) {
            return res.status(400).send('Todos los campos son requeridos');
        }

        if (!req.file) {
            return res.status(400).send('La imagen es requerida');
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.secure_url;

        const query = 'INSERT INTO peliculas (titulo, contenido, categoria, anio, genero, imageUrl) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [titulo, contenido, categoria, anio, genero, imageUrl];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.status(201).send('Película agregada con éxito');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir la imagen a Cloudinary');
    }
});

// Obtener una película por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM peliculas WHERE id = ?';
    const values = [id];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Película no encontrada');
        }
        res.json(results[0]);
    });
});

// Obtener todas las películas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM peliculas';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Actualizar una película
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const peliculaActualizada = req.body;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            peliculaActualizada.imageUrl = result.secure_url;
        }

        const query = 'UPDATE peliculas SET ? WHERE id = ?';
        const values = [peliculaActualizada, id];

        db.query(query, values, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al actualizar la película' });
            }
            res.json({ id, ...peliculaActualizada });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir la imagen a Cloudinary');
    }
});

// Eliminar una película
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM peliculas WHERE id = ?';
    const values = [id];

    db.query(query, values, (err) => {
        if (err) return res.status(500).send(err);
        res.status(204).send();
    });
});

module.exports = router;