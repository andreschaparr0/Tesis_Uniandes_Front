# Grafica de Dispersion de Candidatos

## Proposito

La grafica de dispersion ayuda a visualizar la **calidad y completitud** de los analisis de candidatos para una posicion, evitando interpretaciones enganosas de los scores.

## El Problema que Resuelve

### Situacion Enganosa
Un candidato puede tener un **score alto (ej. 90%)** pero ese score puede ser enganoso si:
- Solo se evaluaron 3 de 10 criterios posibles
- Los otros 7 criterios fueron ignorados (score = -1) porque no habia datos

### Ejemplo Comparativo

**Candidato A:**
- Score: 90%
- Criterios evaluados: 3/10 (30%)
- **RIESGO:** Alto score pero poca informacion

**Candidato B:**
- Score: 75%
- Criterios evaluados: 10/10 (100%)
- **IDEAL:** Score bueno con informacion completa

Sin la grafica, el Candidato A parece mejor. Con la grafica, se ve claramente que el Candidato B tiene un perfil mas completo.

## Como Funciona

### Ejes de la Grafica

**Eje X: Porcentaje de Criterios Evaluados**
- Se calcula: (criterios con score != -1) / (total de criterios) * 100
- Ejemplo: Si hay 10 criterios y 7 tienen score != -1, entonces: 7/10 * 100 = 70%

**Eje Y: Score Obtenido**
- Es el score final del analisis en porcentaje
- Ejemplo: 85%

### Zonas de la Grafica

La grafica se divide en 4 zonas principales:

```
100%|                    |
    |  ADVERTENCIA  |  IDEAL      |
    |  (amarillo)   |  (verde)    |
70% |---------------|-------------|
    |  BAJO MATCH   |  MEDIO      |
    |  (rojo)       |  (azul)     |
  0%|---------------|-------------|
    0%             70%           100%
         Criterios Evaluados
```

#### Zona Verde (Arriba-Derecha)
- **Score >= 70%**
- **Criterios >= 70%**
- **Interpretacion:** Candidatos ideales
- Buen match con informacion completa

#### Zona Amarilla (Arriba-Izquierda)
- **Score >= 70%**
- **Criterios < 70%**
- **Interpretacion:** ADVERTENCIA - Score posiblemente enganoso
- Parece buen candidato pero falta mucha informacion

#### Zona Azul (Medio)
- **Score entre 50-70%**
- **Interpretacion:** Candidatos medios
- Pueden ser considerados dependiendo del contexto

#### Zona Roja (Abajo)
- **Score < 50%**
- **Interpretacion:** Bajo match
- No recomendados para la posicion

## Colores de los Puntos

Cada punto (candidato) se colorea automaticamente:

- **Verde**: Candidatos ideales (score >= 70% y criterios >= 70%)
- **Amarillo**: Advertencia (score >= 70% pero criterios < 70%)
- **Azul**: Candidatos medios (score >= 50%)
- **Rojo**: Bajo match (score < 50%)

## Como Usar la Grafica

### 1. Identificar Candidatos Ideales
Busca puntos en la zona verde (arriba-derecha):
- Alto score
- Muchos criterios evaluados
- **DECISION:** Estos son tus mejores candidatos

### 2. Detectar Scores Enganosos
Busca puntos en la zona amarilla (arriba-izquierda):
- Alto score pero pocos criterios
- **DECISION:** Investigar mas. Puede que falten datos importantes del CV o que el CV no tenga la informacion necesaria.

### 3. Considerar Contexto
Para puntos en zona amarilla:
- Ver el detalle del analisis
- Identificar que criterios se ignoraron
- Decidir si esos criterios son criticos para la posicion
- Si los criterios ignorados no son criticos, el candidato puede ser bueno
- Si los criterios ignorados son criticos, el candidato es riesgoso

### 4. Comparar Candidatos
La grafica permite comparar facilmente:
- Candidato con 90% en 3 criterios vs 75% en 10 criterios
- Visualizar trade-offs entre score y completitud
- Tomar decisiones mas informadas

## Tooltip Interactivo

Al pasar el mouse sobre un punto, se muestra:
- Nombre del candidato
- Score obtenido
- Criterios usados (X/Total)
- Porcentaje de criterios usados

## Lineas de Referencia

Las lineas punteadas en 70% (tanto X como Y) ayudan a dividir visualmente las zonas.

## Ejemplo de Uso Real

### Escenario
Tienes 5 candidatos para una posicion de "Senior Developer":

1. **Juan Perez**: 92% score, 40% criterios
2. **Maria Garcia**: 85% score, 90% criterios
3. **Carlos Lopez**: 78% score, 100% criterios
4. **Ana Martinez**: 65% score, 85% criterios
5. **Pedro Sanchez**: 45% score, 95% criterios

### Analisis con la Grafica

**Puntos Verde:**
- Maria Garcia (85%, 90%)
- Carlos Lopez (78%, 100%)

**Punto Amarillo:**
- Juan Perez (92%, 40%) - ADVERTENCIA!

**Punto Azul:**
- Ana Martinez (65%, 85%)

**Punto Rojo:**
- Pedro Sanchez (45%, 95%)

### Decision
Aunque Juan Perez tiene el score mas alto (92%), la grafica muestra que solo se evaluaron 40% de los criterios. Maria Garcia y Carlos Lopez son mejores opciones porque tienen:
- Scores buenos (85% y 78%)
- Informacion casi completa (90% y 100%)

Debes investigar que criterios se ignoraron en Juan Perez antes de descartarlo o priorizarlo.

## Implementacion Tecnica

### Ubicacion
La grafica aparece en:
- Pagina de detalle de Job
- Pestana "Top Candidatos"
- Arriba de la lista de candidatos

### Componente
`src/components/Analysis/CandidatesScatterChart.jsx`

### Datos Necesarios
La grafica requiere el `score_breakdown` de cada analisis, por lo que usa el endpoint:
- `GET /jobs/{id}/analyses` (no el de top-candidatos)

### Libreria
- Recharts (ScatterChart)

## Beneficios

1. **Evita decisiones enganosas:** No te dejes llevar solo por el score final
2. **Identifica gaps de informacion:** Ve rapidamente que candidatos tienen CVs incompletos
3. **Mejora la calidad de contratacion:** Toma decisiones basadas en informacion completa
4. **Visualizacion intuitiva:** Entiendes la situacion de un vistazo
5. **Comparacion justa:** Compara candidatos con el mismo nivel de informacion

## Recomendaciones

1. **Siempre revisa la grafica** antes de tomar una decision final
2. **Prioriza zona verde** para los mejores candidatos
3. **Investiga zona amarilla** - pueden ser buenos candidatos con informacion faltante
4. **Solicita mas informacion** a candidatos en zona amarilla si el CV esta incompleto
5. **No descartes automaticamente** por estar en zona amarilla - analiza el contexto

## Limitaciones

- La grafica solo es util cuando hay **multiples candidatos analizados** para el mismo job
- Si solo hay 1-2 candidatos, la grafica no aporta mucho valor
- Requiere que los CVs tengan la estructura de datos completa para calculos precisos

