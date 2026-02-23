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

En Windows (CMD)

```bash
python -m venv venv
.\venv\Scripts\activate.bat
```

En Windows (PowerShell)

```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

En Linux
```bash
sudo apt update
sudo apt install python3.12-venv
python3 -m venv venv
source venv/bin/activate
```

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

## Elecciones

1. Framework/Librería elegida: 

Backend: Django REST Framework por practicidad en cuanto a la creación de la api y el manejo de errores, además de la documentación existente.

Frontend: React + Vite + MUI + TypeScript por rendimiento, tipado fuerte y en busca de una interfaz intuitiva.  

Base de datos: SQLite por practicidad e integración con Django Rest Framework.

2. Arquitectura del backend: Elegí una API REST con Django REST Framework porque permite construir servicios desacoplados y escalables de forma rápida. Además la estructura refuerza la separación de responsabilidades:

El proyecto project/ contiene la configuración principal de Django, ajustes globales y las URLs raíz.

Mientras que la app tasks/ se encarga de toda la lógica específica de las tareas manejando: modelos, serializadores, vistas y URLs específicas.

Esto facilita mantener el código organizado y sin mezclar responsabilidades.

3. Lo más complicado: Manejo persistente de la autenticación.  
4. Mejoras con más tiempo: Dashborad.
