import { host } from "./host.js";

// Manejar la lógica para mantener el efecto del label
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    const label = input.nextElementSibling; // Asumimos que el label está justo después del input

    // Función para actualizar el estado del label
    const updateLabelState = () => {
        if (input.value.trim() !== '') {
            input.classList.add('has-value'); // Agregar clase si hay texto
            label.classList.add('has-value'); // Mantener clase en el label
        } else {
            input.classList.remove('has-value'); // Quitar clase si está vacío
            label.classList.remove('has-value'); // Quitar clase del label
        }
    };

    // Agregar evento de entrada
    input.addEventListener('input', updateLabelState);

    // Agregar evento de focus para mantener la clase si hay texto
    input.addEventListener('focus', updateLabelState);

    // Agregar evento de blur para verificar el valor al perder el foco
    input.addEventListener('blur', updateLabelState);

    // Verificar el valor al cargar la página
    updateLabelState(); // Llama a la función para establecer el estado inicial

    // Agregar evento de cambio para mostrar el nombre del archivo
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

// Añadir evento de carga para aplicar la clase `has-value` a los inputs ya llenos
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        const label = input.nextElementSibling; // Asumimos que el label está justo después del input
        if (input.value.trim() !== '') {
            input.classList.add('has-value'); // Mantener la clase si ya tiene texto
            label.classList.add('has-value'); // Mantener clase en el label
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