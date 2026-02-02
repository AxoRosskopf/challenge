# Challenge Técnico

Este repositorio contiene la solución completa para el desafío técnico, implementando una aplicación moderna para la visualización y gestión de propiedades inmobiliarias.

El proyecto está estructurado en dos partes principales:
- **back**: API Backend construida con NestJS
- **front**: Frontend SPA construido con Next.js

## Tecnologías Utilizadas

### Backend (`/back`)
- **Framework**: [NestJS](https://nestjs.com/)
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM
- **Documentación**: Swagger / OpenAPI
- **Búsqueda**: Full Text Search (PostgreSQL)

### Frontend (`/front`)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Librería UI**: React 19
- **Estilos**: Tailwind CSS v4
- **Componentes**: Radix UI
- **Tablas**: TanStack Table
- **Mapas**: Leaflet / React Leaflet
- **Gráficos**: Recharts

## Requisitos Previos

- Node.js (v20 o superior recomendado)
- Docker y Docker Compose (para la base de datos)
- npm o yarn

## Cómo Ejecutar el Proyecto

### 1. Configuración del Backend

Navega al directorio del backend e instala las dependencias:

```bash
cd back
npm install
```

Crea un archivo `.env` basado en el `.env.example` (si existe) o configura las variables de entorno para la conexión a la base de datos Docker.

Levanta la base de datos con Docker:

```bash

docker-compose up -d
```

Inicia el servidor de desarrollo:

```bash
npm run start:dev
```
El backend estará corriendo usualmente en `http://localhost:3001`.

### 2. Configuración del Frontend

En una nueva terminal, navega al directorio del frontend:

```bash
cd front
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```
La aplicación frontend estará disponible en `http://localhost:3000`.


## Carga de Datos (Seeding)

Para que el dashboard funcione correctamente, es necesario cargar los datos iniciales de barrios y propiedades.

### 1. Cargar Barrios (CABA)
Ejecuta el siguiente comando `curl` desde la raíz del proyecto para cargar los barrios geolocalizados:

```bash
curl -X POST -F "file=@data_generator/data/caba_neighborhoods.json" http://localhost:3001/api/v1/neighborhoods/upload
```

### 2. Cargar Propiedades y Generación de Datos
El proyecto incluye scripts en Python dentro de la carpeta `/data_generator` para la creación y carga masiva de datos.

#### Archivos de Datos Disponibles
En `data_generator/data/` encontrarás datasets pre-generados para diferentes propósitos:
- `generated_properties_50.json`: Dataset ligero con 50 propiedades para **pruebas funcionales**.
- `generated_properties_450k.json`: Dataset masivo con ~450,000 propiedades para **pruebas de estrés**.

Estos datos fueron generados sintéticamente utilizando una distribución normal para los precios, modelando esperanzas (media) y varianzas (desviación estándar) específicas para cada barrio y tipo de zona.

#### Generar Nuevos Datos
Si deseas generar un nuevo dataset personalizado, utiliza el script `main.py` especificando la cantidad de registros:

```bash
# Ejemplo: Generar 1000 propiedades
python3 data_generator/main.py 1000
```
Esto creará (o sobrescribirá) el archivo `data_generator/data/generated_properties.json`.

#### Subir Datos al Backend
Para subir el archivo `generated_properties.json` a la base de datos, utiliza el script `send_data.py`:

```bash
python3 data_generator/send_data.py
```
> Nota: Asegúrate de que el backend esté corriendo en el puerto 3001.

## Características Principales

* **Búsqueda Avanzada**: Sistema de búsqueda de propiedades con soporte para filtros dinámicos, paginación y búsqueda por texto optimizada.
* **Visualización en Mapa**: Interfaz de ubicación interactiva para propiedades integrada con **Leaflet**.
* **Estadísticas**: Visualización de datos, gráficos de precios y distribución de mercado mediante **Recharts**.
* **Documentación de la API**:
    * [Postman Documentation](https://documenter.getpostman.com/view/19823718/2sBXVoAoVT)
    * [Swagger UI (Local)](http://localhost:3001/api/docs)

