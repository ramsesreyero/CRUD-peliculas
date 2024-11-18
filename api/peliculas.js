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
    if (!id) {
        return res.status(400).json({ error: 'ID de película no proporcionado' });
    }
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

    if (!req.body.banner) {
        return res.status(400).json({ error: 'El banner es requerido' });
    }

    try {
        const uploadImage = (buffer) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream((error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }).end(buffer);
            });
        };

        const result = await uploadImage(req.file.buffer);
        const imageUrl = result.secure_url;

        const bannerResult = await uploadImage(req.body.banner.buffer); // Subir banner
        const bannerUrl = bannerResult.secure_url; // Obtener URL del banner

        const query = 'INSERT INTO peliculas (titulo, contenido, categoria, anio, genero, imageUrl, bannerUrl) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [titulo, contenido, categoria, parseInt(anio, 10), genero, imageUrl, bannerUrl];

        await queryDatabase(query, values);
        res.status(201).json({ message: 'Película agregada con éxito' });
    } catch (error) {
        console.error('Error al agregar película:', error);
        res.status(500).json({ error: 'Error al agregar la película' });
    }
};

// Function to update a movie
const updateMovie = async (req, res) => {
    const { id } = req.params; // Obtener el ID de los parámetros
    const peliculaActualizada = req.body;

    try {
        // Validar que los campos requeridos estén presentes
        if (!peliculaActualizada.titulo || !peliculaActualizada.contenido || !peliculaActualizada.categoria || !peliculaActualizada.anio || !peliculaActualizada.genero || !peliculaActualizada.watchUrl) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Primero, obtenemos la película existente
        const existingMovie = await queryDatabase('SELECT * FROM peliculas WHERE id = ?', [id]);
        if (existingMovie.length === 0) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        // Manejo de la imagen
        if (req.files && req.files.image) {
            console.log('Archivo de imagen recibido:', req.files.image[0]); // Log para verificar el archivo
            try {
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    });
                    uploadStream.end(req.files.image[0].buffer); // Envía el buffer de la imagen a Cloudinary
                });

                console.log('Resultado de la carga en Cloudinary (imagen):', result); // Log para verificar el resultado
                peliculaActualizada.imageUrl = result.secure_url; // Actualiza solo si hay nueva imagen
            } catch (uploadError) {
                console.error('Error al subir la imagen a Cloudinary:', uploadError);
                return res.status(500).json({ error: 'Error al subir la imagen a Cloudinary' });
            }
        } else {
            // Mantener la URL de la imagen existente
            peliculaActualizada.imageUrl = existingMovie[0].imageUrl; // Mantener la imagen existente
        }

        // Manejo del banner
        if (req.files && req.files.bannerUrl) {
            console.log('Archivo de banner recibido:', req.files.bannerUrl[0]); // Log para verificar el archivo
            try {
                const bannerResult = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    });
                    uploadStream.end(req.files.bannerUrl[0].buffer); // Envía el buffer del banner a Cloudinary
                });

                console.log('Resultado de la carga en Cloudinary (banner):', bannerResult); // Log para verificar el resultado
                peliculaActualizada.bannerUrl = bannerResult.secure_url; // Actualiza solo si hay nuevo banner
            } catch (uploadError) {
                console.error('Error al subir el banner a Cloudinary:', uploadError);
                return res.status(500).json({ error: 'Error al subir el banner a Cloudinary' });
            }
        } else {
            // Mantener la URL del banner existente
            peliculaActualizada.bannerUrl = existingMovie[0].bannerUrl; // Mantener el banner existente
        }

        // Realiza la actualización en la base de datos
        const query = 'UPDATE peliculas SET titulo = ?, contenido = ?, categoria = ?, anio = ?, genero = ?, imageUrl = ?, watchUrl = ?, bannerUrl = ? WHERE id = ?';
        const values = [
            peliculaActualizada.titulo,
            peliculaActualizada.contenido,
            peliculaActualizada.categoria,
            parseInt(peliculaActualizada.anio, 10),
            peliculaActualizada.genero,
            peliculaActualizada.imageUrl,
            peliculaActualizada.watchUrl,
            peliculaActualizada.bannerUrl, // Agregar bannerUrl a los valores
            id // Aquí debe ir solo el ID
        ];

        console.log('Valores para la actualización:', values); // Log para depuración

        const results = await queryDatabase(query, values);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Película no encontrada para actualizar' });
        }
        res.json({ message: 'Película actualizada con éxito', id, ...peliculaActualizada });
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Error al actualizar la película' });
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

// Function to get movies by genre excluding the current movie
const getMoviesByGenre = async (req, res) => {
    const { genero, id } = req.query;
    if (!genero || !id) {
        return res.status(400).json({ error: 'Género o ID de película no proporcionado' });
    }

    try {
        const results = await queryDatabase('SELECT * FROM peliculas WHERE genero = ? AND id != ?', [genero, id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron películas similares para este género' });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error('Error al obtener películas por género:', err);
        res.status(500).json({ error: 'Error de base de datos al obtener películas por género' });
    }
};
module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    getMoviesByGenre // Asegúrate de que esta línea esté presente
};