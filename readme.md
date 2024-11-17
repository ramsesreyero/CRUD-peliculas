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
```

Instala las dependencias del proyecto:

```bash
npm install
```

Configura la base de datos:

Crea una base de datos en MySQL y ejecuta el script `movie_db_peliculas.sql` que se encuentra en la carpeta `bd` para crear las tablas necesarias.

Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

```makefile
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

- Agregar una Película: Navega a la página "Agregar Película" y completa el formulario.
- Listar Películas: La página principal muestra todas las películas. Puedes hacer clic en el título de una película para ver más detalles.
- Editar una Película: Haz clic en el botón "Editar" en la página de detalles de la película.
- Eliminar una Película: En la página de detalles, puedes eliminar la película.

## Estructura del Proyecto

- `public/`: Contiene los archivos estáticos de la aplicación, incluyendo CSS, JavaScript y HTML.
- `css/`: Archivos CSS para estilizar la aplicación.
- `js/`: Archivos JavaScript para la lógica del cliente.
- `html/`: Archivos HTML para las diferentes vistas de la aplicación.
- `bd/`: Contiene el script SQL para crear la base de datos y las tablas necesarias.
- `server.js`: Archivo principal del servidor que configura Express y las rutas de la API.

## API

La aplicación proporciona una API para interactuar con la base de datos de películas. Las rutas principales son:

- `GET /api/peliculas`: Obtener todas las películas.
- `GET /api/peliculas/:id`: Obtener una película específica por ID.
- `POST /api/peliculas`: Agregar una nueva película.
- `PUT /api/peliculas/:id`: Actualizar una película existente.
- `DELETE /api/peliculas/:id`: Eliminar una película.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama:

   ```bash
   git checkout -b nueva-caracteristica
   ```

3. Realiza tus cambios y haz commit:

   ```bash
   git commit -m 'Añadir nueva característica'
   ```

4. Haz push a la rama:

   ```bash
   git push origin nueva-caracteristica
   ```

5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Notas

Asegúrate de reemplazar `tu_usuario`, `tu_contraseña` y `nombre_de_tu_base_de_datos` en la sección de configuración con los valores reales que uses.