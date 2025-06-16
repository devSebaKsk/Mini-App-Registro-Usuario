# Mini-App-Registro-Usuario

Aplicación fullstack para el registro y listado de usuarios, construida con **React** (frontend) y **Flask** + **PostgreSQL** (backend).

## Estructura del proyecto

```
Mini-App-Registro-Usuario/
│
├── backend/         # Backend Flask + SQLAlchemy
│   ├── app.py
│   ├── models.py
│   └── requirements.txt
│
├── frontend/        # Frontend React + Vite
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .devcontainer/   # Configuración para entorno de desarrollo en contenedor
│
├── .vscode/         # Tareas para VSCode
│
├── Pipfile          # Dependencias Python
└── README.md
```

## Requisitos

La aplicacion funciona automaticamente con CODESPACE de GITHUB. Lo unico que tienen que realizar es abrir los puertos del front y back en el caso de que se queden en Private. 

- Docker y Docker Compose (si usas el devcontainer)
- Node.js y npm (si corres el frontend fuera del contenedor)
- Python 3.10+ y pipenv (si corres el backend fuera del contenedor)

## Levantar el entorno de desarrollo

### Opción recomendada: Dev Container (VSCode)

1. Abre el proyecto en VSCode.
2. Abre el proyecto en un **Dev Container** (VSCode te lo sugerirá automáticamente).
3. Espera a que se instalen las dependencias automáticamente (`pipenv install` y `npm install`).
4. Espera a que se ejecute el front y el back (`pipenv run start`y `npm run dev`)

Esto levantará:
- Backend Flask en [http://localhost:5000](http://localhost:5000)
- Frontend React en [http://localhost:5173](http://localhost:5173)
- Base de datos PostgreSQL en el contenedor

### Manual (sin contenedor)

1. Instala dependencias backend:
   ```sh
   pipenv install
   ```
2. Instala dependencias frontend:
   ```sh
   cd frontend
   npm install
   ```
3. Levanta la base de datos PostgreSQL (puedes usar Docker Compose).
4. Inicia el backend:
   ```sh
   pipenv run start
   ```
5. Inicia el frontend:
   ```sh
   cd frontend
   npm run dev
   ```

## Endpoints principales (backend)

- `POST /createUser` — Crea un nuevo usuario.
- `GET /users` — Lista todos los usuarios registrados.

## Variables de entorno

El backend usa la variable `DATABASE_URL` para conectarse a PostgreSQL. Ya está configurada en el devcontainer.

## Tecnologías usadas

- **Frontend:** React, Vite, React Router, React Toastify, Sass, GSAP
- **Backend:** Flask, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-Bcrypt, Flask-CORS, PostgreSQL
- **Dev:** Docker, Dev Containers, VSCode Tasks