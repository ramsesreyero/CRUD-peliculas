document.addEventListener('DOMContentLoaded', async () => {
    await obtenerGeneros(); // Obtener géneros al cargar la página
    await obtenerPeliculas(); // Obtener películas
});

async function obtenerGeneros() {
    try {
        const response = await fetch('http://localhost:8080/api/generos'); // Cambiar a la API de géneros
        if (!response.ok) {
            throw new Error(`Error al obtener los géneros: ${response.status} ${response.statusText}`);
        }
        const generos = await response.json();
        const genreSelect = document.getElementById('genreSelect'); // Asegúrate de que el ID sea correcto
        
        // Limpiar opciones existentes
        genreSelect.innerHTML = '<option value="">Todos los géneros</option>';
        
        // Agregar los géneros al select
        generos.forEach(genero => {
            const option = document.createElement('option');
            option.value = genero; // Asumiendo que el valor del género es un string
            option.textContent = genero; // Texto que se mostrará en el menú
            genreSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener los géneros:', error);
        alert('No se pudieron cargar los géneros. Intenta de nuevo más tarde.');
    }
}

async function obtenerPeliculas() {
    try {
        const response = await fetch('http://localhost:8080/api/peliculas');
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.status} ${response.statusText}`);
        }
        const peliculas = await response.json();
        const movieList = document.querySelector('.movie-list');
        movieList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas películas
        
        peliculas.forEach(pelicula => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.dataset.genero = pelicula.genero; // Cambiado a data-genero
            movieItem.innerHTML = `
                <div class="movie-content" onclick="window.location.href='details.html?id=${pelicula.id}'">
                    <img src="${pelicula.imageUrl}" alt="Poster de ${pelicula.titulo}" />
                    <h3>${pelicula.titulo}</h3>
                </div>
            `;
            movieList.appendChild(movieItem);
        });

        // Agregar el filtro de género
        const genreSelect = document.getElementById('genreSelect'); // Asegúrate de que el ID sea correcto
        genreSelect.addEventListener('change', () => {
            const selectedGenre = genreSelect.value;
            const movieItems = document.querySelectorAll('.movie-item');
            movieItems.forEach(item => {
                const genero = item.dataset.genero; // Asegúrate de que cada película tenga un atributo data-genero
                if (selectedGenre === '' || genero === selectedGenre) {
                    item.style.display = ''; // Mostrar la película si coincide con el género seleccionado
                } else {
                    item.style.display = 'none'; // Ocultar la película si no coincide
                }
            });
        });

        // Agregar el filtro de búsqueda
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            const filter = searchInput.value.toLowerCase();
            const movieItems = document.querySelectorAll('.movie-item');
            movieItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                if (title.includes(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        alert('No se pudieron cargar las películas. Intenta de nuevo más tarde.');
    }
}
