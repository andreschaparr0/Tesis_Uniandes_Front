# Guia de Pruebas Completa del Frontend

## Pre-requisitos

1. **Backend corriendo:**
```bash
cd ../backend  # o la carpeta donde este tu backend
python run_api.py
```

Verificar en: `http://localhost:8000/health`

2. **Frontend corriendo:**
```bash
npm run dev
```

Acceder en: `http://localhost:3000`

---

## Prueba 1: Dashboard

### Objetivo
Verificar que el Dashboard muestra las estadisticas correctamente.

### Pasos

1. Abrir: `http://localhost:3000/`
2. Abrir consola del navegador (F12)
3. Buscar el mensaje: "Stats recibidas del backend:"
4. Verificar que muestre el objeto con los datos

### Resultados Esperados

**Si HAY datos en la BD:**
- Debe mostrar numeros correctos en las 4 tarjetas
- Total CVs: numero > 0
- Total Jobs: numero > 0
- Total Analisis: numero > 0
- Score Promedio: porcentaje

**Si NO hay datos en la BD:**
- Debe mostrar 0 en todas las tarjetas
- No debe mostrar errores en consola

### Debugging

Si muestra 0 cuando deberia mostrar datos:

1. Verificar endpoint directamente:
```bash
curl http://localhost:8000/stats
```

2. Ver respuesta esperada:
```json
{
  "total_cvs": 5,
  "total_jobs": 3,
  "total_analyses": 10,
  "score_promedio": 0.75,
  "score_promedio_porcentaje": 75.0
}
```

3. Si el curl funciona pero el Dashboard no:
   - Verificar `.env` tiene `VITE_API_URL=http://localhost:8000`
   - Reiniciar el frontend
   - Limpiar cache del navegador

---

## Prueba 2: Subir CV

### Objetivo
Verificar que se puede subir un PDF y se procesa correctamente.

### Pasos

1. Ir a: `http://localhost:3000/cvs/upload`
2. Arrastrar un PDF de CV o hacer click para seleccionar
3. Esperar el procesamiento (2-5 segundos)
4. Verificar mensaje de exito

### Resultados Esperados

- Mensaje: "CV procesado exitosamente: [Nombre]"
- Boton "Ver CV" disponible
- Boton "Subir Otro" disponible

### Verificacion

- Click en "Ver CV" debe mostrar el CV estructurado
- Verificar tabs: Personal, Educacion, Experiencia, Habilidades, etc.
- Todos los datos deben estar correctamente extraidos

---

## Prueba 3: Crear Job

### Objetivo
Verificar que se puede crear una oferta de trabajo desde texto.

### Pasos

1. Ir a: `http://localhost:3000/jobs/create`
2. Pegar una descripcion de trabajo completa
3. Click en "Crear Job"
4. Esperar el procesamiento (2-5 segundos)
5. Verificar mensaje de exito

### Resultados Esperados

- Mensaje: "Job creado exitosamente: [Titulo]"
- Boton "Ver Job" disponible
- Boton "Crear Otro" disponible

### Verificacion

- Click en "Ver Job" debe mostrar el job estructurado
- Verificar tabs: Informacion General, Requisitos, Top Candidatos
- Todos los datos deben estar correctamente extraidos

---

## Prueba 4: Realizar Analisis (Pesos Predeterminados)

### Objetivo
Analizar un CV vs Job usando pesos predeterminados.

### Pasos

1. Ir a: `http://localhost:3000/analysis`
2. Seleccionar un CV del dropdown
3. Seleccionar un Job del dropdown
4. NO marcar la casilla de pesos personalizados
5. Click en "Realizar Analisis"
6. Esperar resultado (5-10 segundos)

### Resultados Esperados

- Redirige a la pagina de detalle del analisis
- Muestra score grande y destacado (ej: 82%)
- Muestra grafico radial con 8 aspectos
- Muestra tabla detallada con scores individuales
- Muestra razones de cada comparador

### Verificacion

- Score debe estar entre 0-100%
- Todos los aspectos deben tener score, peso y contribucion
- Razones deben ser explicativas (no "Error en respuesta de IA")

---

## Prueba 5: Realizar Analisis (Pesos Personalizados)

### Objetivo
Analizar un CV vs Job usando pesos personalizados.

### Pasos

1. Ir a: `http://localhost:3000/analysis`
2. Seleccionar CV y Job
3. Marcar "Usar pesos personalizados"
4. Ajustar sliders (ej: Experiencia 40%, Habilidades Tecnicas 30%)
5. Verificar que el total muestre porcentaje
6. Click en "Realizar Analisis"
7. Esperar resultado

### Resultados Esperados

- Analisis se completa exitosamente
- Score puede ser diferente al analisis con pesos predeterminados
- En el detalle, "Pesos usados" debe mostrar los pesos personalizados

### Verificacion

- Comparar con analisis usando pesos predeterminados
- El score deberia ser diferente si los pesos son muy distintos

---

## Prueba 6: Ver Historial de Analisis

### Objetivo
Verificar que el historial muestra todos los analisis.

### Pasos

1. Realizar al menos 3 analisis diferentes
2. Ir a: `http://localhost:3000/analysis/history`
3. Verificar la lista

### Resultados Esperados

- Muestra todos los analisis realizados
- Cada card muestra:
  - Score grande con color segun porcentaje
  - Nombre del candidato
  - Nombre del trabajo
  - Fecha y hora
  - Boton "Eliminar"
- Ordenado por fecha (mas reciente primero)

---

## Prueba 7: Eliminar CV

### Objetivo
Verificar que se puede eliminar un CV.

### Pasos

1. Ir a: `http://localhost:3000/cvs`
2. En cualquier CV, click en "Eliminar"
3. Confirmar en el dialogo
4. Verificar que se elimina

### Resultados Esperados

- Dialogo de confirmacion: "¿Estas seguro de eliminar este CV?"
- Despues de confirmar, el CV desaparece de la lista
- La lista se actualiza automaticamente

### Verificacion

- Ir al Dashboard y verificar que "Total CVs" disminuyo en 1
- Verificar en el backend: `curl http://localhost:8000/cvs`

---

## Prueba 8: Eliminar Job

### Objetivo
Verificar que se puede eliminar un Job.

### Pasos

1. Ir a: `http://localhost:3000/jobs`
2. En cualquier Job, click en "Eliminar"
3. Confirmar en el dialogo
4. Verificar que se elimina

### Resultados Esperados

- Dialogo de confirmacion
- Job desaparece de la lista
- Lista se actualiza

### Verificacion

- Dashboard debe mostrar "Total Jobs" disminuido en 1

---

## Prueba 9: Eliminar Analisis (desde Historial)

### Objetivo
Verificar que se puede eliminar un analisis desde el historial.

### Pasos

1. Ir a: `http://localhost:3000/analysis/history`
2. En cualquier analisis, click en "Eliminar"
3. Confirmar en el dialogo
4. Verificar que se elimina

### Resultados Esperados

- Dialogo de confirmacion
- Analisis desaparece de la lista
- Lista se actualiza automaticamente
- No navega a otra pagina

### Verificacion

- Dashboard debe mostrar "Total Analisis" disminuido en 1
- Verificar: `curl http://localhost:8000/analyses`

---

## Prueba 10: Eliminar Analisis (desde Detalle)

### Objetivo
Verificar que se puede eliminar un analisis desde su detalle.

### Pasos

1. Ir a cualquier analisis (click en un analisis del historial)
2. En la parte superior, click en "Eliminar Analisis"
3. Confirmar en el dialogo
4. Verificar que redirige

### Resultados Esperados

- Dialogo de confirmacion
- Despues de confirmar, redirige a `/analysis/history`
- El analisis ya no aparece en la lista

---

## Prueba 11: Buscar CVs

### Objetivo
Verificar la funcionalidad de busqueda de CVs.

### Pasos

1. Ir a: `http://localhost:3000/cvs`
2. En el campo de busqueda, escribir parte de un nombre
3. Click en "Buscar" o presionar Enter
4. Verificar resultados

### Resultados Esperados

- Muestra solo CVs que coinciden con el termino
- Busqueda es case-insensitive
- Boton "Limpiar" restaura la lista completa

---

## Prueba 12: Buscar Jobs

### Objetivo
Verificar la funcionalidad de busqueda de Jobs.

### Pasos

1. Ir a: `http://localhost:3000/jobs`
2. En el campo de busqueda, escribir parte de un titulo
3. Click en "Buscar" o presionar Enter
4. Verificar resultados

### Resultados Esperados

- Muestra solo Jobs que coinciden con el termino
- Boton "Limpiar" restaura la lista completa

---

## Prueba 13: Top Candidatos

### Objetivo
Verificar que se muestra el ranking de candidatos por job.

### Pasos

1. Realizar analisis de varios CVs contra el mismo Job
2. Ir al detalle del Job
3. Click en tab "Top Candidatos"

### Resultados Esperados

- Muestra lista ordenada por score (mayor a menor)
- Cada candidato muestra:
  - Ranking (#1, #2, #3, etc.)
  - Nombre del candidato
  - Score porcentaje
  - Fecha del analisis
- Click en un candidato lleva al detalle del analisis

---

## Prueba 14: Navegacion entre Paginas

### Objetivo
Verificar que toda la navegacion funciona correctamente.

### Rutas a Probar

- `/` - Dashboard
- `/cvs` - Lista de CVs
- `/cvs/upload` - Subir CV
- `/cvs/1` - Detalle de CV
- `/jobs` - Lista de Jobs
- `/jobs/create` - Crear Job
- `/jobs/1` - Detalle de Job
- `/analysis` - Realizar analisis
- `/analysis/history` - Historial
- `/analysis/1` - Detalle de analisis

### Resultados Esperados

- Todas las rutas cargan correctamente
- Menu de navegacion marca la seccion activa
- Links "Volver" funcionan correctamente

---

## Prueba 15: Manejo de Errores

### Objetivo
Verificar que los errores se manejan correctamente.

### Casos a Probar

**1. Subir archivo que no es PDF:**
- Intenta subir un .txt o .jpg
- Deberia mostrar error o no permitir

**2. Analizar sin seleccionar CV o Job:**
- No seleccionar CV o Job
- Click en "Realizar Analisis"
- Debe mostrar error: "Debes seleccionar un CV y un Job"

**3. Backend apagado:**
- Detener el backend
- Intentar cargar el Dashboard
- Debe mostrar 0 en todas las estadisticas
- Consola debe mostrar error de conexion

**4. CV o Job no encontrado:**
- Ir manualmente a `/cvs/999` (ID que no existe)
- Debe mostrar mensaje: "CV no encontrado"

---

## Checklist Final

Antes de considerar el sistema completo, verificar:

- [ ] Dashboard muestra estadisticas correctas
- [ ] Se pueden subir CVs (PDF)
- [ ] Se pueden crear Jobs (texto)
- [ ] Se pueden realizar analisis
- [ ] Pesos personalizados funcionan
- [ ] Graficos se muestran correctamente
- [ ] Se pueden eliminar CVs
- [ ] Se pueden eliminar Jobs
- [ ] Se pueden eliminar Analisis (historial)
- [ ] Se pueden eliminar Analisis (detalle)
- [ ] Busqueda de CVs funciona
- [ ] Busqueda de Jobs funciona
- [ ] Top candidatos se muestra correctamente
- [ ] Navegacion entre paginas funciona
- [ ] Botones "Volver" funcionan
- [ ] Mensajes de error se muestran apropiadamente
- [ ] Loading states se muestran durante procesamiento
- [ ] Confirmaciones de eliminacion funcionan
- [ ] Actualizacion automatica de listas despues de eliminar
- [ ] Todas las tabs en detalles funcionan
- [ ] Responsive design funciona en diferentes tamanos

---

## Reporte de Problemas

Si encuentras algun problema durante las pruebas:

1. **Anotar:**
   - Que estabas haciendo
   - Que esperabas que pasara
   - Que paso en realidad
   - Mensajes de error (consola y pantalla)

2. **Capturar:**
   - Screenshot del error
   - Console logs (F12)
   - Network tab (F12) mostrando la peticion fallida

3. **Verificar:**
   - Backend corriendo y sin errores
   - Frontend corriendo en puerto correcto
   - Variable `.env` configurada correctamente

---

## Performance

### Tiempos Esperados

- **Subir CV:** 2-5 segundos
- **Crear Job:** 2-5 segundos
- **Realizar Analisis:** 5-10 segundos
- **Cargar listas:** < 1 segundo
- **Eliminar items:** < 1 segundo
- **Buscar:** < 1 segundo

Si los tiempos son significativamente mayores, verificar:
- Conexion a internet (Azure OpenAI requiere internet)
- Estado del servidor Azure OpenAI
- Tamano de los PDFs (PDFs muy grandes toman mas tiempo)

---

**Ultima actualizacion:** Version 2.0.0 con DELETE de analisis implementado

