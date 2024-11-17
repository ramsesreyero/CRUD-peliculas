# CRUD de Películas

## Descripción
Esta es una aplicación web para gestionar una colección de películas. Permite agregar, editar, eliminar y listar películas.

## Requisitos
- Node.js
- MySQL
- npm

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/ramsesreyero/CRUD-peliculas.git
   cd CRUD-peliculas
Instala las dependencias del proyecto:

```bash
npm install
```
Configura la base de datos:

Crea una base de datos en MySQL y ejecuta el script `movie_db_peliculas.sql` que se encuentra en la carpeta `bd` para crear las tablas necesarias.
Configura las variables de entorno:

Entra al archivo `.env` en la raíz del proyecto y añade las siguientes variables:
```bash
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
CLOUDINARY_URL=tu_url_de_cloudinary
```
Inicia el servidor:

```bash
npm start
```
Abre tu navegador y visita `http://localhost:8080` para acceder a la aplicación.

## Uso
Agregar una Película: Navega a la página "Agregar Película" y completa el formulario.
Listar Películas: La página principal muestra todas las películas. Puedes hacer clic en el título de una película para ver más detalles.
Editar una Película: Haz clic en el botón "Editar" en la página de detalles de la película.
Eliminar una Película: En la página de detalles, puedes eliminar la película.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

Haz un fork del proyecto.
Crea una nueva rama (`git checkout -b nueva-caracteristica`).
Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`).
Haz push a la rama (`git push origin nueva-caracteristica`).
Abre un Pull Request.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.