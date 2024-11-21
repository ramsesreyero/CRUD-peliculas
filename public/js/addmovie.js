import { host } from "./host.js";

// Manejar la lógica para mantener el efecto del label
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Agregar evento de entrada
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('has-value'); // Agregar clase si hay texto
        } else {
            this.classList.remove('has-value'); // Quitar clase si está vacío
        }
    });

    // Agregar evento de focus para mantener la clase si hay texto
    input.addEventListener('focus', function() {
        if (this.value.trim() !== '') {
            this.classList.add('has-value'); // Mantener clase si ya tiene texto
        }
    });

    // Agregar evento de blur para verificar el valor al perder el foco
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.classList.remove('has-value'); // Quitar clase si está vacío
        }
    });

    // Verificar el valor al cargar la página
    if (input.value.trim() !== '') {
        input.classList.add('has-value'); // Mantener la clase si ya tiene texto
    }
});

// Añadir evento de carga para aplicar la clase `has-value` a los inputs ya llenos
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.add('has-value'); // Mantener la clase si ya tiene texto
        }
    });
});

document.getElementById('add-movie-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const formData = new FormData(this); // Crear FormData a partir del formulario
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Deshabilitar el botón para evitar envíos múltiples

    try {
        const response = await fetch(host + '/api/peliculas', {
            method: 'POST',
            body: formData // Enviar FormData
        });

        if (response.ok) {
            alert('Película agregada con éxito');
            window.location.href = 'index.html'; // Redirigir a la lista de películas
        } else {
            const errorData = await response.json(); // Obtener el mensaje de error del servidor
            alert('Error al agregar la película: ' + (errorData.error || 'Error desconocido'));
        }
    } catch (error) {
        console.error('Error al agregar la película:', error);
        alert('Error al agregar la película: ' + error.message);
    } finally {
        submitButton.disabled = false; // Rehabilitar el botón
    }
});