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

// Setup multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for serverless functions
const upload = multer({ storage });

// Middleware to handle file uploads
const uploadMiddleware = upload.single('image');

const router = express.Router();

// Define routes
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', uploadMiddleware, addMovie);
router.put('/:id', uploadMiddleware, updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;