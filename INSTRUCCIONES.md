# Instrucciones de Instalacion y Ejecucion

## Paso 1: Instalar Dependencias

Abre una terminal en esta carpeta y ejecuta:

```bash
npm install
```

Este comando instalara todas las dependencias necesarias (React, Vite, TailwindCSS, etc.)

## Paso 2: Verificar Backend

Asegurate de que el backend este ejecutandose en `http://localhost:8000`

Para ejecutar el backend, ve a la carpeta del backend y ejecuta:
```bash
python run_api.py
```

## Paso 3: Ejecutar el Frontend

Con el backend corriendo, ejecuta:

```bash
npm run dev
```

La aplicacion estara disponible en: `http://localhost:3000`

## Estructura de Navegacion

1. **Dashboard** (`/`) - Vista general con estadisticas
2. **CVs** (`/cvs`) - Lista de CVs procesados
   - Click en "Subir Nuevo CV" para cargar un PDF
   - Click en cualquier CV para ver detalles
3. **Jobs** (`/jobs`) - Lista de ofertas de trabajo
   - Click en "Crear Nuevo Job" para agregar una oferta
   - Click en cualquier Job para ver detalles
4. **Analisis** (`/analysis`) - Realizar analisis CV vs Job
   - Selecciona un CV y un Job
   - Opcionalmente configura pesos personalizados
   - Click en "Realizar Analisis"
5. **Historial** (`/analysis/history`) - Ver todos los analisis realizados

## Flujo de Uso Recomendado

1. Subir al menos un CV (PDF)
2. Crear al menos un Job (descripcion de texto)
3. Ir a Analisis
4. Seleccionar CV y Job
5. Realizar analisis
6. Ver resultados detallados

## Troubleshooting

Si hay errores:
1. Verifica que el backend este corriendo
2. Verifica que la URL del backend sea correcta en `.env`
3. Revisa la consola del navegador (F12) para errores
4. Revisa la terminal donde corre el frontend

## Comandos Utiles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Crear version de produccion
- `npm run preview` - Previsualizar version de produccion

