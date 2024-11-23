import { host } from "./host.js";

document.addEventListener('DOMContentLoaded', () => {
    const movieId = new URLSearchParams(window.location.search).get('id');
    if (movieId) {
        cargarPelicula(movieId);
    }

    // Manejar la lógica para mantener el efecto del label
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        updateLabelState.call(input); // Establecer el estado inicial

        // Agregar eventos para manejar el estado del label
        input.addEventListener('input', updateLabelState);
        input.addEventListener('change', updateLabelState); // Solo para selects
        input.addEventListener('focus', updateLabelState);
        input.addEventListener('blur', updateLabelState);

        // Mostrar el nombre del archivo seleccionado
        if (input.type === 'file') {
            input.addEventListener('change', function() {
                const fileNameSpan = this.nextElementSibling; // Asumimos que el span para el nombre del archivo está justo después del input
                if (this.files.length > 0) {
                    fileNameSpan.textContent = this.files[0].name; // Mostrar el nombre del archivo
                } else {
                    fileNameSpan.textContent = ''; // Limpiar si no hay archivo
                }
            });
        }
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

    // Asegúrate de que los valores de categoría y género se establezcan correctamente
    const categoriaSelect = document.getElementById('categoria');
    const generoSelect = document.getElementById('genero');

    // Establecer el valor para la categoría
    Array.from(categoriaSelect.options).forEach(option => {
        if (option.value === pelicula.categoria) {
            option.selected = true; // Seleccionar la opción que coincide
        }
    });

    // Establecer el valor para el género
    Array.from(generoSelect.options).forEach(option => {
        if (option.value === pelicula.genero) {
            option.selected = true; // Seleccionar la opción que coincide
        }
    });

    document.getElementById('anio').value = pelicula.anio;
    document.getElementById('watchUrl').value = pelicula.watchUrl;

    // Llama a updateLabelState para todos los inputs y selects
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        updateLabelState.call(input); // Establecer el estado inicial
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

// Función para actualizar el estado del label
function updateLabelState() {
    const label = this.nextElementSibling; // Asumimos que el label está justo después del input/select
    const isSelect = this.tagName === 'SELECT';
    
    // Verificamos si el input/select tiene un valor
    const hasValue = this.value.trim() !== '' || (isSelect && this.selectedIndex > 0);
    
    // Actualizar clases según el estado
    if (hasValue) {
        this.classList.add('has-value'); // Agregar clase si hay texto o se seleccionó una opción
        label.classList.add('has-value'); // Mantener clase en el label
    } else {
        this.classList.remove('has-value'); // Quitar clase si está vacío
        label.classList.remove('has-value'); // Quitar clase del label
    }
}

// Manejar el formulario de edición
document.getElementById('edit-movie-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    try {
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
            formData.append('banner', bannerFile); // Agregar el banner si existe
        }

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