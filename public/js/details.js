import { host } from "./host.js";

document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.getElementById('delete-button');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

    confirmDeleteButton.onclick = async () => {
        // Cambiar el texto del botón a "Eliminando..."
        confirmDeleteButton.innerText = 'Eliminando...';
        confirmDeleteButton.disabled = true; // Deshabilitar el botón para evitar múltiples clics
    
        try {
            await deleteMovie(movieId); // Llama a tu función para eliminar la película
            // Aquí puedes manejar la redirección o cualquier otro paso después de la eliminación
        } catch (error) {
            console.error('Error al eliminar la película:', error);
            alert('Error al eliminar la película. Inténtalo de nuevo más tarde.');
        } finally {
            confirmDeleteButton.innerText = 'Eliminar'; // Restablecer el texto del botón
            confirmDeleteButton.disabled = false; // Habilitar el botón nuevamente
        }
    };

    // Mostrar el modal al hacer clic en el botón de eliminar
    deleteButton.addEventListener('click', () => {
        const movieId = getMovieIdFromUrl(); // Obtener el ID de la película
        deleteModal.style.display = 'block'; // Mostrar el modal
        document.body.classList.add('no-scroll'); // Agregar la clase para desactivar el scroll
        confirmDeleteButton.onclick = async () => {
            await deleteMovie(movieId); // Llama a tu función para eliminar la película
        };
    });

    // Cerrar el modal al hacer clic en "Cancelar"
    cancelDeleteButton.addEventListener('click', () => {
        deleteModal.style.display = 'none'; // Cerrar el modal
        document.body.classList.remove('no-scroll'); // Quitar la clase para activar el scroll
    });

    // Función para cerrar el modal cuando se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == deleteModal) {
            deleteModal.style.display = 'none'; // Cerrar el modal al hacer clic fuera
            document.body.classList.remove('no-scroll'); // Quitar la clase para activar el scroll
        }
    };

    const movieId = getMovieIdFromUrl(); // Obtener el ID de la película de la URL
    loadMovieDetails(movieId); // Cargar detalles de la película

    // Verificar si el usuario ha iniciado sesión
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
        // Mostrar los botones de "Editar" y "Eliminar"
        document.getElementById('edit-button').classList.remove('hidden');
        document.getElementById('delete-button').classList.remove('hidden');
    } else {
        // Ocultar los botones si el usuario no está conectado
        document.getElementById('edit-button').classList.add('hidden');
        document.getElementById('delete-button').classList.add('hidden');
    }

    document.getElementById('edit-button').addEventListener('click', () => {
        window.location.href = `edit.html?id=${movieId}`; // Redirigir a la página de edición
    });
});

function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get ('id'); // Obtener el ID de la película de la URL
}

async function loadMovieDetails(id) {
    try {
        const response = await fetch(host + `/api/peliculas/${id}`);
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

        // Cargar el banner de la película
        const movieBanner = document.getElementById('movie-banner');
        movieBanner.src = pelicula.bannerUrl; // Asignar la URL del banner

        // Mostrar la imagen solo cuando se haya cargado
        movieBanner.onload = () => {
            movieBanner.style.display = 'block'; // Mostrar la imagen del banner
        };

        // Manejar el error de carga de la imagen
        movieBanner.onerror = () => {
            movieBanner.src = '../icons/bannerplaceholder.jpg'; // Volver al placeholder si hay un error
            movieBanner.style.display = 'block'; // Asegurarse de que el placeholder se muestre
        };

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
        const response = await fetch(host + `/api/peliculas/by-genero?genero=${genero}&id=${currentMovieId}`);
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
                <a href="details.html?id=${pelicula.id}" class="movie-link">
                    <div class="movie-image-container">
                        <img src="${pelicula.bannerUrl}" alt="Banner de ${pelicula.titulo}" />
                        <div class="movie-info">
                            <h3>${pelicula.titulo}</h3>
                        </div>
                    </div>
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
        'play.max.com': 'Max',
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
    // Mostrar el modal de confirmación
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.style.display = 'block'; // Mostrar el modal

    // Manejar la acción de confirmación dentro del modal
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    confirmDeleteButton.onclick = async () => {
        try {
            const response = await fetch(host + `/api/peliculas/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Cerrar el modal después de eliminar
                deleteModal.style.display = 'none'; 
                // Redirigir a la página principal
                window.location.href = 'index.html'; 
            } else {
                alert('Error al eliminar la película. Inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error al eliminar la película:', error);
            alert('Error al eliminar la película. Inténtalo de nuevo más tarde.');
        }
    };
}