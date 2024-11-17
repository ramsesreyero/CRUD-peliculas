const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
} = require('../api/peliculas');

// Configuración de multer para manejar archivos
const storage = multer.memoryStorage(); // Almacenamiento en memoria
const upload = multer({ storage });

// Crear el enrutador
const router = express.Router();

// Definir rutas
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', upload.fields([{ name: 'image' }, { name: 'bannerUrl' }]), addMovie); // Cambiado a upload.fields()
router.put('/:id', upload.fields([{ name: 'image' }, { name: 'bannerUrl' }]), updateMovie); // Cambiado a upload.fields()
router.delete('/:id', deleteMovie);

module.exports = router;