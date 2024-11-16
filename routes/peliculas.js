const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // Asegúrate de importar la configuración de Cloudinary
const path = require('path');
const db = require('../config/db');
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Puedes mantener esto para almacenar temporalmente
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Agregar un timestamp para evitar duplicados
    }
});

const upload = multer({ storage });

// Ruta para agregar una nueva película
router.post('/', upload.single('image'), async (req, res) => {
    const { titulo, contenido, categoria, anio, genero } = req.body;

    // Validación básica
    if (!titulo || !contenido || !categoria || !anio || !genero) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    // Verifica que la imagen se haya subido
    if (!req.file) {
        return res.status(400).send('La imagen es requerida');
    }

    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.secure_url; // URL de la imagen en Cloudinary

        // Guardar la película en la base de datos
        db.query('INSERT INTO peliculas (titulo, contenido, categoria, anio, genero, imageUrl) VALUES (?, ?, ?, ?, ?, ?)', 
            [titulo, contenido, categoria, anio, genero, imageUrl], (err, results) => {
                if (err) {
                    console.error(err); // Log para ver el error en la consola del servidor
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
    db.query('SELECT * FROM peliculas WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Película no encontrada');
        }
        res.json(results[0]); // Devuelve la película encontrada
    });
});

// Obtener todas las películas
router.get('/', (req, res) => {
    db.query('SELECT * FROM peliculas', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Actualizar una película
router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const peliculaActualizada = req.body;

    try {
        // Si se subió una nueva imagen, actualiza la URL de la imagen
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            peliculaActualizada.imageUrl = result.secure_url; // Actualiza la URL de la imagen
        }

        db.query('UPDATE peliculas SET ? WHERE id = ?', [peliculaActualizada, id], (err) => {
            if (err) {
                console.error(err); // Log del error
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
    db.query('DELETE FROM peliculas WHERE id = ?', id, (err) => {
        if (err) return res.status(500).send(err);
        res.status(204).send();
    });
});

module.exports = router;