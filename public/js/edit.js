import { host } from "./host.js";

document.addEventListener('DOMContentLoaded', () => {
    // Suponiendo que ya tienes la función para cargar los datos de la película
    cargarPelicula();

    // Manejar la lógica para mantener el efecto del label
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        // Verificar el valor al cargar la página
        if (input.value.trim() !== '') {
            input.classList.add('has-value'); // Mantener la clase si ya tiene texto
            const label = input.nextElementSibling; // Asumimos que el label está justo después del input
            label.classList.add('has-value'); // Mantener clase al label
        }

        // Agregar evento de entrada
        input.addEventListener('input', function() {
            const label = this.nextElementSibling; // Asumimos que el label está justo después del input
            if (this.value.trim() !== '') {
                this.classList.add('has-value'); // Agregar clase si hay texto
                label.classList.add('has-value'); // Agregar clase al label
            } else {
                this.classList.remove('has-value'); // Quitar clase si está vacío
                label.classList.remove('has-value'); // Quitar clase al label
            }
        });

        // Agregar evento de focus para mantener la clase si hay texto
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling; // Asumimos que el label está justo después del input
            if (this.value.trim() !== '') {
                this.classList.add('has-value'); // Mantener clase si ya tiene texto
                label.classList.add('has-value'); // Mantener clase al label
            }
        });

        // Agregar evento de blur para verificar el valor al perder el foco
        input.addEventListener('blur', function() {
            const label = this.nextElementSibling; // Asumimos que el label está justo después del input
            if (this.value.trim() === '') {
                this.classList.remove('has-value'); // Quitar clase si está vacío
                label.classList.remove('has-value'); // Quitar clase al label
            }
        });
    });
});

async function cargarPelicula(id) {
    const response = await fetch(host + `/api/peliculas/${id}`);
    if (!response.ok) {
        console.error('Error al cargar la película:', response.statusText);
        return;
    }
    const pelicula = await response.json();
    
    // Completar los campos del formulario
    document.getElementById('movie-id').value = pelicula.id;
    document.getElementById('titulo').value = pelicula.titulo;
    document.getElementById('contenido').value = pelicula.contenido;
    document.getElementById('categoria').value = pelicula.categoria;
    document.getElementById('anio').value = pelicula.anio;
    document.getElementById('genero').value = pelicula.genero;
    document.getElementById('watchUrl').value = pelicula.watchUrl;

    // Aquí se añade la clase has-value a los inputs que ya tienen contenido
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.add('has-value'); // Mantener la clase si ya tiene texto
            const label = input.nextElementSibling; // Asumimos que el label está justo después del input
            label.classList.add('has-value'); // Mantener clase al label
        }
    });

    // Mostrar la imagen actual si existe
    if (pelicula.imageUrl) {
        const currentImage = document.getElementById('current-image');
        currentImage.src = pelicula.imageUrl;
        currentImage.style.display = 'block'; // Mostrar la imagen
    }

    // Mostrar el banner actual si existe
    if (pelicula.bannerUrl) {
        const currentBanner = document.getElementById('current-banner');
        currentBanner.src = pelicula.bannerUrl;
        currentBanner.style.display = 'block'; // Mostrar el banner
    }
}

// Manejar la lógica para mantener el efecto del label
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Agregar evento de entrada
    input.addEventListener('input', function() {
        const label = this.nextElementSibling; // Asumimos que el label está justo después del input
        if (this.value.trim() !== '') {
            this.classList.add('has-value'); // Agregar clase si hay texto
            label.classList.add('has-value'); // Agregar clase al label
        } else {
            this.classList.remove('has-value'); // Quitar clase si está vacío
            label.classList.remove('has-value'); // Quitar clase al label
        }
    });

    // Agregar evento de focus para mantener la clase si hay texto
    input.addEventListener('focus', function() {
        const label = this.nextElementSibling; // Asumimos que el label está justo después del input
        if (this.value.trim() !== '') {
            this.classList.add('has-value'); // Mantener clase si ya tiene texto
            label.classList.add('has-value'); // Mantener clase al label
        }
    });

    // Agregar evento de blur para verificar el valor al perder el foco
    input.addEventListener('blur', function() {
        const label = this.nextElementSibling; // Asumimos que el label está justo después del input
        if (this.value.trim() === '') {
            this.classList.remove('has-value'); // Quitar clase si está vacío
            label.classList.remove('has-value'); // Quitar clase al label
        }
    });

    // Verificar el valor al cargar la página
    if (input.value.trim() !== '') {
        input.classList.add('has-value'); // Mantener la clase si ya tiene texto
        const label = input.nextElementSibling; // Asumimos que el label está justo después del input
        label.classList.add('has-value'); // Mantener clase al label
    }
});

// Añadir evento de carga para aplicar la clase `has-value` a los inputs ya llenos
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.add('has-value'); // Mantener la clase si ya tiene texto
            const label = input.nextElementSibling; // Asumimos que el label está justo después del input
            label.classList.add('has-value'); // Mantener clase al label
        }
    });
});

document.getElementById('edit-movie-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const id = document.getElementById('movie-id').value;
    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;
    const categoria = document.getElementById('categoria').value;
    const anio = document.getElementById('anio').value;
    const genero = document.getElementById('genero').value;
    const watchUrl = document.getElementById('watchUrl').value;
    const imageFile = document.getElementById('image').files[0]; // Obtener la portada
    const bannerFile = document.getElementById('bannerUrl').files[0]; // Obtener el banner

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    formData.append('categoria', categoria);
    formData.append('anio', anio);
    formData.append('genero', genero);
    formData.append('watchUrl', watchUrl);
    if (imageFile) {
        formData.append('image', imageFile); // Agregar la portada si existe
    }
    if (bannerFile) {
        formData.append('bannerUrl', bannerFile); // Agregar el banner si existe
    }

    try {
        const response = await fetch(host + `/api/peliculas/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            alert("Película actualizada exitosamente.");
            window.location.href = `details.html?id=${id}`; // Redirigir a la página de detalles
        } else {
            alert("Error al actualizar la película.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al intentar actualizar la película.");
    }
});

// Cargar la película al cargar la página
const movieId = new URLSearchParams(window.location.search).get('id');
if (movieId) {
    cargarPelicula(movieId);
}