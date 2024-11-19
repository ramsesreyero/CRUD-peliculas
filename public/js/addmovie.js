import { host } from "./host.js";

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