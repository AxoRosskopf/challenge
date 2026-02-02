# Challenge Técnico

Este repositorio contiene la solución completa para el desafío técnico, implementando una aplicación moderna para la visualización y gestión de propiedades inmobiliarias.

El proyecto está estructurado en dos partes principales:
- **back**: API Backend construida con NestJS.
- **front**: Frontend SPA construido con Next.js.

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
La aplicación frontend estará disponible en `http://localhost:3000`

## Características Principales

* **Búsqueda Avanzada**: Sistema de búsqueda de propiedades con soporte para filtros dinámicos, paginación y búsqueda por texto optimizada.
* **Visualización en Mapa**: Interfaz de ubicación interactiva para propiedades integrada con **Leaflet**.
* **Estadísticas**: Visualización de datos, gráficos de precios y distribución de mercado mediante **Recharts**.
* **Documentación de la API**:
    * [Postman Documentation](https://documenter.getpostman.com/view/19823718/2sBXVoAoVT)
    * [Swagger UI (Local)](http://localhost:3001/api/docs)



