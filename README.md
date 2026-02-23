# Task Manager

## Descripción
Este repositorio es un monorepo con el backend y el frontend de la aplicación.  

- **Backend**: Carpeta `server`  
- **Frontend**: Carpeta `client`  

<pre> /
├── client/ # Frontend
├── serve/  # Backend
└── README.md  </pre>

- Backend: Django REST Framework para la creación de la API con autenticación requerida.
- Frontend: Vite con React, TypeScript y Material-UI (MUI) para una interfaz moderna y reactiva.


## Instalación y Ejecución

### Backend
1. Ir a la carpeta del backend:

```bash
cd serve
```

2. Crear y activar un entorno virtual de Python

3. Instalar dependencias:

```bash
pip install -r requirements.txt
```

4. Migrar la base de datos:

```bash
python manage.py migrate
```

5. Iniciar servidor:

```bash
python manage.py runserver
```

Backend disponible en http://127.0.0.1:8000/api/tasks/

### Frontend

1. Ir a la carpeta del frontend:

```bash
cd client
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en entorno de desarrollo:

```bash
npm run dev
```

Frontend disponible en http://localhost:5173/
