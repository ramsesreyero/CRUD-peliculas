# Aplicación CRUD de Películas

## Descripción
Sistema web completo para la gestión de una biblioteca de películas, permitiendo crear, leer, actualizar y eliminar información de películas, incluyendo manejo de imágenes y categorización.

## Características Principales
- CRUD completo de películas
- Carga y gestión de imágenes usando Cloudinary
- Filtrado por géneros
- Búsqueda de películas
- Interfaz responsiva
- Visualización de películas relacionadas

## Tecnologías Utilizadas
- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Bootstrap
- Backend:
  - Node.js
  - Express.js
  - MySQL
- Servicios:
  - Cloudinary (almacenamiento de imágenes)

## Estructura del Proyecto
movie-crud/
├── api/ # Controladores y lógica de negocio
├── config/ # Configuraciones (DB, Cloudinary)
├── public/ # Archivos estáticos
│ ├── css/ # Estilos
│ ├── js/ # JavaScript del cliente
│ └── carruselimg/ # Imágenes del carrusel
├── routes/ # Rutas de la API
└── server.js # Punto de entrada

## Requisitos Previos
- Node.js (v14 o superior)
- MySQL (v8.0 o superior)
- Cuenta en Cloudinary

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd movie-crud
```
Instalar dependencias:
```bash
npm install
```
Configurar variables de entorno:
Entrar al archivo `.env` con:
```makefile
DB_HOST=localhost
DB_USER=root (usuario por defecto de MySQL)
DB_PASSWORD=tu_contraseña
DB_NAME=movie_db
Lo relacionado con CLOUDINARY no necesita modificaciones.
```
Importar la base de datos en MySQL llamada movie_db

Uso
Iniciar el servidor:
```bash
npm start
```
Acceder a la aplicación:
Abrir navegador en `http://localhost:8080`

## API Endpoints
### Películas
- `GET /api/peliculas` - Obtener todas las películas
- `GET /api/peliculas/:id` - Obtener película por ID
- `POST /api/peliculas` - Crear nueva película
- `PUT /api/peliculas/:id` - Actualizar película existente
- `DELETE /api/peliculas/:id` - Eliminar película

### Géneros
- `GET /api/generos` - Obtener lista de géneros

## Estructura de la Base de Datos
Tabla: `peliculas`
- `id` (INT, PRIMARY KEY)
- `titulo` (VARCHAR)
- `contenido` (TEXT)
- `categoria` (VARCHAR)
- `anio` (INT)
- `genero` (VARCHAR)
- `imageUrl` (VARCHAR)
- `bannerUrl` (VARCHAR)
- `watchUrl` (VARCHAR)

## Características Detalladas
### Gestión de Imágenes
- Soporte para imágenes de portada y banners
- Integración con Cloudinary para almacenamiento
- Optimización automática de imágenes

### Interfaz de Usuario
- Diseño responsivo
- Carrusel de películas destacadas
- Filtrado por géneros
- Búsqueda en tiempo real
- Visualización de películas relacionadas

### Seguridad
- Validación de datos de entrada
- Sanitización de consultas SQL
- Manejo seguro de archivos

### Mantenimiento
- Logs de errores
- Variables de entorno para configuración
- Estructura modular para fácil actualización