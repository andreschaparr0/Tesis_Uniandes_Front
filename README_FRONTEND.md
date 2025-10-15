# CV Recommendation System - Frontend

Frontend desarrollado con React, Vite y TailwindCSS para el sistema de recomendacion de CVs.

## Tecnologias Utilizadas

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework de estilos
- **React Router** - Navegacion
- **Axios** - Cliente HTTP
- **Recharts** - Graficos y visualizaciones
- **React Dropzone** - Upload de archivos
- **Zustand** - State management (si es necesario)

## Requisitos Previos

- Node.js 16 o superior
- npm o yarn
- Backend ejecutandose en `http://localhost:8000`

## Instalacion

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo de configuracion:
```bash
cp .env.example .env
```

3. Editar `.env` si el backend esta en otra URL:
```
VITE_API_URL=http://localhost:8000
```

## Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:3000`

## Build para Produccion

```bash
npm run build
```

Los archivos de produccion se generaran en la carpeta `dist/`

Para previsualizar el build:
```bash
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Analysis/        # Componentes de analisis
│   ├── common/          # Componentes comunes
│   └── Layout/          # Layout principal
├── pages/               # Paginas/vistas
│   ├── CVs/            # Gestion de CVs
│   ├── Jobs/           # Gestion de Jobs
│   └── Analysis/       # Analisis y resultados
├── services/           # Servicios API
│   ├── cvService.js
│   ├── jobService.js
│   └── analysisService.js
├── config/             # Configuracion
│   └── api.js
├── App.jsx            # Componente principal
├── main.jsx           # Entry point
└── index.css          # Estilos globales
```

## Funcionalidades

### Pagina de Inicio
- Bienvenida al sistema
- Accesos rapidos a las funcionalidades principales
- Navegacion intuitiva
- Guia "Como Empezar" para nuevos usuarios

### Gestion de CVs
- Listar todos los CVs procesados
- Buscar CVs por nombre
- Subir nuevos CVs (PDF)
- Ver detalle completo del CV estructurado
- Eliminar CVs
- Ver historial de analisis por CV

### Gestion de Jobs
- Listar ofertas de trabajo
- Buscar jobs por titulo
- Crear nuevas ofertas (texto libre)
- Ver detalle completo del job estructurado
- Eliminar jobs
- Ver top candidatos por job
- Grafica de dispersion: visualiza score vs % de criterios evaluados

### Analisis
- Seleccionar CV y Job para analizar
- Configurar pesos personalizados (opcional)
- Ver resultados con score final
- Grafico radial con breakdown por categoria
- Detalles y razones de cada comparador
- Historial completo de analisis
- Eliminar analisis (desde historial o detalle)

## API Endpoints Utilizados

### CVs
- `POST /cvs` - Subir CV
- `GET /cvs` - Listar CVs
- `GET /cvs/{id}` - Detalle de CV
- `GET /cvs/search/{name}` - Buscar CVs
- `DELETE /cvs/{id}` - Eliminar CV
- `GET /cvs/{id}/analyses` - Analisis del CV

### Jobs
- `POST /jobs` - Crear job
- `GET /jobs` - Listar jobs
- `GET /jobs/{id}` - Detalle de job
- `GET /jobs/search/{title}` - Buscar jobs
- `DELETE /jobs/{id}` - Eliminar job
- `GET /jobs/{id}/analyses` - Analisis del job
- `GET /jobs/{id}/top-candidatos` - Top candidatos

### Analisis
- `POST /analyze/{cv_id}/{job_id}` - Realizar analisis
- `GET /analyses` - Historial de analisis
- `GET /analyses/{id}` - Detalle de analisis
- `DELETE /analyses/{id}` - Eliminar analisis
- `GET /stats` - Estadisticas generales

## Configuracion de Pesos

El sistema permite configurar pesos personalizados para el analisis:

```javascript
{
  experience: 0.30,           // 30%
  technical_skills: 0.15,     // 15%
  education: 0.15,            // 15%
  responsibilities: 0.15,     // 15%
  certifications: 0.10,       // 10%
  soft_skills: 0.08,          // 8%
  languages: 0.04,            // 4%
  location: 0.03              // 3%
}
```

Los pesos se normalizan automaticamente si no suman 1.0.

## Troubleshooting

### El frontend no conecta con el backend
- Verificar que el backend este ejecutandose en `http://localhost:8000`
- Revisar la variable `VITE_API_URL` en `.env`
- Verificar que no haya problemas de CORS en el backend
- Reiniciar el frontend despues de cambiar `.env`

### Errores al subir archivos PDF
- Verificar que el archivo sea efectivamente un PDF
- Revisar el tamano maximo de archivo permitido por el backend
- Comprobar los permisos de la carpeta temporal en el backend

### Graficos no se muestran
- Verificar que los datos de analisis tengan el formato correcto
- Revisar la consola del navegador para errores de Recharts

### Error al eliminar analisis
- Verificar que el backend tenga el endpoint `DELETE /analyses/{id}`
- Revisar la consola para mensajes de error detallados
- El endpoint debe retornar: `{"message": "Analisis X eliminado"}`

## Proximas Mejoras

- Exportar resultados a PDF/Excel
- Comparar multiples candidatos lado a lado
- Filtros avanzados en listas
- Graficos adicionales de estadisticas
- Modo oscuro
- Internacionalizacion (i18n)

