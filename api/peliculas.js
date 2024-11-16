const mysql = require('mysql2');
const cloudinary = require('../config/cloudinary'); // Ensure you have this configured

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Function to get all movies
const getAllMovies = (req, res) => {
    db.query('SELECT * FROM peliculas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
};

// Function to get a movie by ID
const getMovieById = (req, res) => {
    const { id } = req.params; // Use params instead of query for cleaner URL
    db.query('SELECT * FROM peliculas WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Película no encontrada');
        }
        res.json(results[0]);
    });
};

// Function to add a movie
const addMovie = async (req, res) => {
    const { titulo, contenido, categoria, anio, genero } = req.body;

    if (!titulo || !contenido || !categoria || !anio || !genero) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    if (!req.file) {
        return res.status(400).send('La imagen es requerida');
    }

    try {
        const result = await cloudinary.uploader.upload_stream(req.file.buffer);
        const imageUrl = result.secure_url;

        const query = 'INSERT INTO peliculas (titulo, contenido, categoria, anio, genero, imageUrl) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [titulo, contenido, categoria, anio, genero, imageUrl];

        db.query(query, values, (err) => {
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
};

// Function to update a movie
const updateMovie = async (req, res) => {
    const { id } = req.params; // Use params for consistency
    const peliculaActualizada = req.body;

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream(req.file.buffer);
            peliculaActualizada.imageUrl = result.secure_url; // Ensure imageUrl is updated
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
};

// Function to delete a movie
const deleteMovie = (req, res) => {
    const { id } = req.params; // Use params for consistency
    const query = 'DELETE FROM peliculas WHERE id = ?';
    const values = [id];

    db.query(query, values, (err) => {
        if (err) return res.status(500).send(err);
        res.status(204).send();
    });
};

// Export the functions
module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
};