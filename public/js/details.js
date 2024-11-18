document.addEventListener('DOMContentLoaded', () => {
    const movieId = getMovieIdFromUrl(); // Obtener el ID de la película de la URL
    loadMovieDetails(movieId); // Cargar detalles de la película

    document.getElementById('edit-button').addEventListener('click', () => {
        window.location.href = `edit.html?id=${movieId}`; // Redirigir a la página de edición
    });

    document.getElementById('delete-button').addEventListener('click', () => {
        deleteMovie(movieId); // Función para eliminar la película
    });
});

function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // Obtener el ID de la película de la URL
}

async function loadMovieDetails(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/peliculas/${id}`);
        if (!response.ok) {
            throw new Error('Error al cargar los detalles de la película');
        }
        const pelicula = await response.json();

        // Asignar los valores a los elementos HTML
        document.getElementById('movie-title').innerText = pelicula.titulo;
        document.getElementById('movie-contenido').innerText = pelicula.contenido;
        document.getElementById('movie-categoria').innerText = pelicula.categoria;
        document.getElementById('movie-anio').innerText = pelicula.anio;
        document.getElementById('movie-genero').innerText = pelicula.genero;
        document.getElementById('movie-banner').src = pelicula.bannerUrl;

        // Cargar películas similares basadas en el género de la película actual
        loadSimilarMovies(pelicula.genero, id); // Pasa el ID de la película actual

        // Configurar el botón "Ver en"
        const watchButton = document.getElementById('watch-button');
        if (pelicula.watchUrl) {
            watchButton.href = pelicula.watchUrl;
            const serviceName = getServiceNameFromUrl(pelicula.watchUrl);
            watchButton.innerText = `Ver en ${serviceName}`;
        } else {
            watchButton.href = '#';
            watchButton.innerText = 'No disponible';
        }

    } catch (error) {
        console.error('Error al cargar los detalles de la película:', error);
        alert('No se pudieron cargar los detalles de la película. Intenta de nuevo más tarde.');
    }
}

// Definición de la función para cargar películas similares
async function loadSimilarMovies(genero, currentMovieId) {
    try {
        const response = await fetch(`http://localhost:8080/api/peliculas/by-genero?genero=${genero}&id=${currentMovieId}`);
        if (!response.ok) {
            throw new Error('Error al cargar películas similares');
        }
        const peliculasSimilares = await response.json();
        const similarMovieList = document.querySelector('.similar-movie-list');
        similarMovieList.innerHTML = ''; // Limpiar la lista antes de agregar nuevas películas

        // Verifica si hay películas similares
        if (peliculasSimilares.length === 0) {
            similarMovieList.innerHTML = '<p>No se encontraron películas similares.</p>';
            similarMovieList.classList.add('empty'); // Agregar clase para alinear a la derecha
            return;
        } else {
            similarMovieList.classList.remove('empty'); // Remover clase si hay elementos
        }

        peliculasSimilares.forEach(pelicula => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <a href="details.html?id=${pelicula.id}">
                    <img src="${pelicula.bannerUrl}" alt="Banner de ${pelicula.titulo}" />
                    <h3>${pelicula.titulo}</h3>
                </a>
            `;
            similarMovieList.appendChild(movieItem);
        });
    } catch (error) {
        console.error('Error al cargar películas similares:', error);
        const similarMovieList = document.querySelector('.similar-movie-list');
        similarMovieList.innerHTML = '<p>Error al cargar películas similares. Intenta de nuevo más tarde.</p>';
    }
}
// Función para obtener el nombre del servicio a partir del URL
function getServiceNameFromUrl(url) {
    const services = {
        'max.com': 'Max',
        'netflix.com': 'Netflix',
        'hulu.com': 'Hulu',
        'disneyplus.com': 'Disney+',
        'primevideo.com': 'Prime Video',
        'apple.com': 'Apple TV+',
        'tv.apple.com': 'Apple TV+',
        'appletv.com': 'Apple TV+',
        'hbo.com': 'HBO',
        'youtube.com': 'YouTube',
        'peacocktv.com': 'Peacock',
        'paramountplus.com': 'Paramount+',
        'starz.com': 'Starz',
        'showtime.com': 'Showtime',
        'crunchyroll.com': 'Crunchyroll',
        'funimation.com': 'Funimation',
        'tubitv.com': 'TubiTV',
        'vudu.com': 'Vudu', 
        'fandango.com': 'FandangoNOW',
        'sling.com': 'Sling TV',
        'roku.com': 'Roku', 
        'pluto.tv': 'Pluto TV',
        'crackle.com': 'Crackle', 
        'mubi.com': 'Mubi', 
        'hoopladigital.com': 'Hoopla',
        // Agregar más servicios según sea necesario
    };

    const urlObject = new URL(url);
    const hostname = urlObject.hostname.replace('www.', ''); // Obtener el hostname

    return services[hostname] || 'Desconocido'; // Retorna el nombre del servicio o 'Desconocido'
}

async function deleteMovie(id) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta película?');
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8080/api/peliculas/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Película eliminada con éxito');
                window.location.href = 'index.html'; // Redirigir a la página principal
            } else {
                alert('Error al eliminar la película. Inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error al eliminar la película:', error);
        }
    }
}