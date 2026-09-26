# Lab 6 - CRUD de publicaciones

**Estudiante:** Bellido Rony  
**Curso:** Desarrollo de Aplicaciones Web Avanzado: Introducción a Bases de Datos No SQL.

Aplicación web desarrollada con Node.js, Express, EJS y MongoDB para administrar publicaciones.

## Requisitos

- Node.js 18 o superior
- MongoDB en ejecución, local o remoto
- npm

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:

```bash
npm install
```

3. Configura la conexión a MongoDB creando un archivo `.env` en la raíz:

```env
MONGO_URI=mongodb://localhost:27017/socialmedia
PORT=3001
```

Si no se define `MONGO_URI`, la aplicación usa por defecto `mongodb://localhost:27017/socialmedia`.

## Ejecutar el proyecto

Para iniciar la aplicación:

```bash
npm start
```

Para desarrollo con reinicio automático:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3001
```

## Funcionalidades

- Visualización de publicaciones.
- Creación de publicaciones con título, contenido, hashtags, imagen y autor.
- Edición de publicaciones.
- Eliminación de publicaciones.
- Validaciones de los modelos `User` y `Post` mediante Mongoose.

## Rutas principales

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/` | Página de inicio |
| `GET` | `/posts` | Listar publicaciones |
| `GET` | `/posts/create` | Formulario de creación |
| `POST` | `/posts/create` | Crear publicación |
| `GET` | `/posts/edit/:id` | Formulario de edición |
| `POST` | `/posts/edit/:id` | Actualizar publicación |
| `POST` | `/posts/delete/:id` | Eliminar publicación |

## Estructura principal

- `app.js`: configuración e inicio del servidor.
- `src/models`: esquemas de Mongoose.
- `src/repositories`: acceso a datos.
- `src/services`: lógica de negocio.
- `src/controllers`: controladores HTTP.
- `src/routes`: rutas de la aplicación.
- `src/views`: vistas EJS.
