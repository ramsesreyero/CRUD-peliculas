const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const peliculasRoutes = require('./routes/peliculas');
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.use('/peliculas', peliculasRoutes);

app.use('/uploads', express.static('uploads'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});