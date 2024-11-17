document.addEventListener('DOMContentLoaded', async () => {
    await obtenerGeneros(); // Obtener géneros al cargar la página
    await obtenerPeliculas(); // Obtener películas

    // Agregar evento al botón "Mostrar Todas las Películas"
    document.getElementById('showAllMovies').addEventListener('click', mostrarTodasLasPeliculas);
    
    // Agregar evento para prevenir el comportamiento por defecto de los enlaces en el carrusel
    document.querySelectorAll('.carousel-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar la navegación
            console.log('Enlace clickeado:', this.href); // Solo un ejemplo
            window.location.href = this.href; // Redirigir a la página de detalles
        });
    });
});

async function obtenerGeneros() {
    try {
        const response = await fetch('http://localhost:8080/api/generos');
        if (!response.ok) {
            throw new Error(`Error al obtener los géneros: ${response.status} ${response.statusText}`);
        }
        const generos = await response.json();
        const genreList = document.getElementById('genreList');
        
        // Limpiar opciones existentes
        genreList.innerHTML = '';
        
        // Agregar los géneros a la lista
        generos.forEach(genero => {
            const genreItem = document.createElement('a');
            genreItem.className = 'genre-link';
            genreItem.textContent = genero;
            genreItem.onclick = (event) => {
                event.preventDefault();
                console.log(`Filtrar películas por género: ${genero}`);
                filtrarPeliculasPorGenero(genero); // Asegúrate de que esta función esté definida
            };
            genreList.appendChild(genreItem);
        });
    } catch (error) {
        console.error('Error al obtener los géneros:', error);
        alert('No se pudieron cargar los géneros. Intenta de nuevo más tarde.');
    }
}

// Función para mostrar todas las películas
function mostrarTodasLasPeliculas() {
    const movieItems = document.querySelectorAll('.movie-item'); // Asegúrate de que tus elementos de película tengan la clase 'movie-item'
    movieItems.forEach(item => {
        item.style.display = ''; // Muestra todas las películas
    });
}

function filtrarPeliculasPorGenero(genero) {
    const movieItems = document.querySelectorAll('.movie-item');
    let found = false; // Variable para rastrear si se encontró alguna película

    movieItems.forEach(item => {
        const itemGenero = item.dataset.genero; // Asegúrate de que los elementos tengan el atributo data-genero
        if (itemGenero === genero) {
            item.style.display = ''; // Muestra la película si coincide
            found = true; // Se encontró una película que coincide
        } else {
            item.style.display = 'none'; // Oculta la película si no coincide
        }
    });

    // Si no se encontraron películas, puedes mostrar un mensaje
    if (!found) {
        const movieList = document.querySelector('.movie-list');
        movieList.innerHTML = '<p>No se encontraron películas para este género.</p>';
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
            movieItem.dataset.genero = pelicula.genero; // Asegúrate de que este campo esté presente
            movieItem.innerHTML = `
                <div class="movie-content" onclick="window.location.href='details.html?id=${pelicula.id}'">
                    <img src="${pelicula.imageUrl}" alt="Poster de ${pelicula.titulo}" />
                    <h3>${pelicula.titulo}</h3> <!-- Aquí está el título -->
                </div>
            `;
            movieList.appendChild(movieItem);
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

        // Agregar evento para prevenir el comportamiento por defecto de los enlaces en el carrusel
        document.querySelectorAll('.carousel-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Evitar la navegación
                console.log('Enlace clickeado:', this.href); // Solo un ejemplo
                // Aquí puedes agregar la lógica que desees, como mostrar detalles en un modal
                // O redirigir a la página de detalles
                window.location.href = this.href; // Redirigir a la página de detalles
            });
        });

    } catch (error) {
        console.error('Error al obtener las películas:', error);
        alert('No se pudieron cargar las películas. Intenta de nuevo más tarde.');
    }
}

// Manejo de la navegación activa
const urlParams = new URLSearchParams(window.location.search);
const activePage = urlParams.get('page');

if (activePage) {
    const navLinks = document.querySelectorAll('.header .nav a');
    navLinks.forEach(link => {
        if (link.href.includes(activePage)) {
 link.classList.add('selected');
        }
    });
}