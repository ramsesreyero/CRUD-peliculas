document.getElementById('delete-movie-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    const id = document.getElementById('movie-id').value;

    const response = await fetch(`http://localhost:8080/peliculas/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Película eliminada con éxito');
        window.location.href = 'index.html'; // Redirigir a la lista de películas
    } else {
        alert('Error al eliminar la película');
    }
});

// Cargar el título de la película a eliminar
const movieId = new URLSearchParams(window.location.search).get('id');
if (movieId) {
    cargarPelicula(movieId);
}

async function cargarPelicula(id) {
    const response = await fetch(`http://localhost:8080/peliculas/${id}`);
    const pelicula = await response.json();
    document.getElementById('movie-title').textContent = pelicula.titulo;
    document.getElementById('movie-id').value = pelicula.id;
}