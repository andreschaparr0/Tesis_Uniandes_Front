# Troubleshooting del Dashboard

## Problema: Dashboard muestra 0 en todas las estadisticas

### Causa Posible 1: Backend no esta corriendo

**Verificar:**
1. Abrir terminal en la carpeta del backend
2. Ejecutar: `python run_api.py`
3. Verificar que diga: "Running on http://0.0.0.0:8000"

**Prueba rapida:**
```bash
# En el navegador, abrir:
http://localhost:8000/health

# Deberia mostrar:
{"status": "ok", "database": "connected"}
```

### Causa Posible 2: URL del backend incorrecta

**Verificar archivo `.env`:**
```
VITE_API_URL=http://localhost:8000
```

**Nota:** Si cambias el `.env`, debes reiniciar el servidor de desarrollo del frontend:
```bash
# Detener con Ctrl+C
# Volver a ejecutar:
npm run dev
```

### Causa Posible 3: Error de CORS

**Sintoma:** En la consola del navegador (F12) ves errores de CORS

**Solucion:** El backend debe tener CORS habilitado para `localhost:3000`

Verificar en `api/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Esto permite cualquier origen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Causa Posible 4: No hay datos en la base de datos

**Verificar:**
1. Ir a `http://localhost:8000/docs`
2. Probar el endpoint `GET /stats`
3. Verificar la respuesta

**Si muestra todos en 0:**
```json
{
  "total_cvs": 0,
  "total_jobs": 0,
  "total_analyses": 0,
  "score_promedio": 0,
  "score_promedio_porcentaje": 0
}
```

**Solucion:** Necesitas crear datos:
1. Subir al menos 1 CV en `/cvs/upload`
2. Crear al menos 1 Job en `/jobs/create`
3. Realizar al menos 1 analisis en `/analysis`

### Causa Posible 5: Error en el endpoint /stats

**Verificar en consola del navegador (F12):**

Si ves algo como:
```
Error al cargar estadisticas: Error: Request failed with status code 500
```

**Solucion:** Hay un error en el backend. Verificar la terminal donde corre el backend para ver el error completo.

## Como Debuggear

### Paso 1: Abrir Consola del Navegador

Presiona `F12` o `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

### Paso 2: Verificar Network Tab

1. Ir a la pestaña "Network"
2. Recargar la pagina del Dashboard
3. Buscar la peticion a `/stats`
4. Ver la respuesta

**Respuesta exitosa (200):**
```json
{
  "total_cvs": 5,
  "total_jobs": 3,
  "total_analyses": 10,
  "score_promedio": 0.75,
  "score_promedio_porcentaje": 75.0
}
```

**Respuesta con error (500, 404, etc):**
- Ver el mensaje de error en "Response"
- Verificar el backend para mas detalles

### Paso 3: Verificar Console Tab

Buscar mensajes del Dashboard:
```
Stats recibidas del backend: {total_cvs: 5, total_jobs: 3, ...}
```

Si ves:
```
Error al cargar estadisticas: ...
Detalles del error: ...
```

Leer el mensaje de error para identificar el problema.

## Solucion Rapida: Test Manual del Endpoint

### Usando curl:

```bash
curl http://localhost:8000/stats
```

**Respuesta esperada:**
```json
{
  "total_cvs": 5,
  "total_jobs": 3,
  "total_analyses": 10,
  "score_promedio": 0.75,
  "score_promedio_porcentaje": 75.0
}
```

### Usando el navegador:

Abrir: `http://localhost:8000/stats`

Deberia mostrar el JSON con las estadisticas.

## Checklist de Verificacion

- [ ] Backend corriendo en http://localhost:8000
- [ ] Endpoint /health responde OK
- [ ] Endpoint /stats responde con datos
- [ ] Variable VITE_API_URL configurada correctamente
- [ ] Frontend reiniciado despues de cambiar .env
- [ ] CORS habilitado en el backend
- [ ] Hay al menos 1 CV, 1 Job y 1 Analisis en la BD
- [ ] Consola del navegador no muestra errores de red
- [ ] Network tab muestra peticion exitosa a /stats

## Si Nada Funciona

### Reiniciar Todo

1. **Backend:**
```bash
# Detener con Ctrl+C
# Ejecutar de nuevo:
python run_api.py
```

2. **Frontend:**
```bash
# Detener con Ctrl+C
# Limpiar cache y reinstalar:
rm -rf node_modules
npm install
npm run dev
```

3. **Navegador:**
- Limpiar cache (Ctrl+Shift+Delete)
- Hacer hard refresh (Ctrl+F5)
- O abrir en ventana de incognito

## Contacto

Si el problema persiste:
1. Copiar el error completo de la consola
2. Copiar la respuesta del endpoint /stats
3. Verificar la version del backend y frontend

