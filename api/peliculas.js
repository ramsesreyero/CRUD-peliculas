const mysql = require('mysql2');
const cloudinary = require('../config/cloudinary'); // Ensure you have this configured

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Promisify the database query for better error handling
const queryDatabase = (query, values) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Function to get all movies
const getAllMovies = async (req, res) => {
    try {
        const results = await queryDatabase('SELECT * FROM peliculas');
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error while fetching movies' });
    }
};

// Function to get a movie by ID
const getMovieById = async (req, res) => {
    const { id } = req.params; // Use params instead of query for cleaner URL
    try {
        const results = await queryDatabase('SELECT * FROM peliculas WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error while fetching movie' });
    }
};

// Function to add a movie
const addMovie = async (req, res) => {
    const { titulo, contenido, categoria, anio, genero } = req.body;

    if (!titulo || !contenido || !categoria || !anio || !genero) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'La imagen es requerida' });
    }

    try {
        const uploadImage = (buffer) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream((error, result) => {
                    if (error) return reject (error);
                    resolve(result);
                }).end(buffer);
            });
        };

        const result = await uploadImage(req.file.buffer);
        const imageUrl = result.secure_url;

        const query = 'INSERT INTO peliculas (titulo, contenido, categoria, anio, genero, imageUrl) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [titulo, contenido, categoria, parseInt(anio, 10), genero, imageUrl];

        await queryDatabase(query, values);
        res.status(201).json({ message: 'Película agregada con éxito' });
    } catch (error) {
        console.error('Error al agregar película:', error);
        res.status(500).json({ error: 'Error al agregar la película' });
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

        const results = await queryDatabase(query, values);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Película no encontrada para actualizar' });
        }
        res.json({ message: 'Película actualizada con éxito', id, ...peliculaActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir la imagen a Cloudinary o al actualizar la película' });
    }
};

// Function to delete a movie
const deleteMovie = async (req, res) => {
    const { id } = req.params; // Use params for consistency
    try {
        const results = await queryDatabase('DELETE FROM peliculas WHERE id = ?', [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Película no encontrada para eliminar' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la película' });
    }
};

// Export the functions
module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
};