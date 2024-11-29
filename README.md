# **PQRS Management API**

Esta es una API REST desarrollada para gestionar PQRS (Peticiones, Quejas, Reclamos y Sugerencias). Construida con **Node.js** y **Express**, utiliza **Supabase** con **PostgreSQL** como base de datos. La arquitectura sigue un enfoque de **Modelo-Controlador-Ruta** y está configurada para realizar pruebas unitarias con **Jest**. Además, el código es analizado con **SonarQube** para garantizar su calidad y está desplegado en **Render**.

## **Características Principales**

- **Gestión de PQRS:** 
  - Crear, leer, actualizar y eliminar registros de PQRS.
  - Gestión completa por parte de administradores y usuarios autenticados.
- **Autenticación de Usuarios:**
  - Inicio de sesión y gestión de usuarios.
- **Arquitectura Escalable:**
  - Modelo-Controlador-Ruta para un desarrollo modular y mantenible.
- **Pruebas Automatizadas:** 
  - Pruebas unitarias e integración con **Jest**.
- **Integración Continua:** Configuración de workflows para CI/CD con GitHub Actions.
- **Despliegue en Render:** La API está disponible públicamente gracias al hosting en Render.

## **Estructura del Proyecto**

- **`.github/workflows/`**: Configuración de CI/CD.
- **`env/`**: Archivos de configuración del entorno.
- **`public/`**: Archivos públicos estáticos.
- **`src/`**:
  - **`controllers/`**: Lógica para manejar las peticiones HTTP.
    - `pqrsController.js`: Controlador para gestionar las PQRS.
    - `userController.js`: Controlador para la gestión de usuarios.
  - **`db/`**: Configuración de la conexión con la base de datos (Supabase).
  - **`models/`**: Lógica de negocio y consultas a la base de datos.
    - **`pqrsd/`**: Modelos relacionados con las PQRS.
    - **`user/`**: Modelos relacionados con los usuarios.
  - **`routes/`**: Definición de endpoints de la API.
  - `index.js`: Punto de entrada de la aplicación.
- **`__tests__/`**:
  - Pruebas unitarias para controladores, modelos y rutas.

## **Tecnologías Utilizadas**

- **Backend:**
  - Node.js con Express para la API REST.
  - PostgreSQL a través de Supabase para la persistencia de datos.
- **Pruebas:**
  - Jest para pruebas unitarias.
- **Calidad del Código:**
  - SonarQube para análisis estático.
  - ESLint para mantener estándares de codificación.
- **Despliegue y Configuración:**
  - CI/CD configurado con GitHub Actions.
  - Despliegue en **Render**.

## **Cómo Ejecutar el Proyecto Localmente**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/agro123/ds2_2024_api.git
   ```
2. **Instalar las dependencias:**
   ```bash
   npm install
   ```
3. **Configurar las variables de entorno:**
   - Configura las variables necesarias, como la conexión a la base de datos.
4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
5. **Pruebas:**
   - Ejecutar las pruebas unitarias con Jest:
     ```bash
     npm test
     ```
      ```bash
     npm test:coverage
     ```

## **Endpoints Principales**

### **PQRS**
- **GET `/api/pqrsd`**: Obtener todas las PQRS.
- **GET `/api/pqrsd/:id`**: Obtener una PQRS por ID.
- **POST `/api/pqrsd`**: Crear una nueva PQRS.
- **PUT `/api/pqrsd/:id`**: Actualizar una PQRS existente.
- **DELETE `/api/pqrsd/:id`**: Eliminar una PQRS.

### **Usuarios**
- **POST `/api/auth/login`**: Inicio de sesión.
- **GET `/api/users`**: Obtener todos los usuarios.
- **GET `/api/users/:id`**: Obtener un usuario por ID.
- **POST `/api/users`**: Crear un nuevo usuario.
- **PUT `/api/users/:id`**: Actualizar un usuario existente.
- **DELETE `/api/users/:id`**: Eliminar un usuario.

## **Despliegue**

La API está desplegada en **Render** y es accesible públicamente. Puedes probar los endpoints en el siguiente enlace:

- **URL Base:** [https://ds2-2024-api.onrender.com](https://ds2-2024-api.onrender.com)
