import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts'

const CandidatesScatterChart = ({ analyses }) => {
  // Calcular los datos para la grafica
  const chartData = analyses.map((analysis) => {
    // Acceder al score_breakdown directamente
    const breakdown = analysis.score_breakdown || {}
    
    // Contar total de criterios y criterios usados (score !== -1 y ignored !== true)
    const totalCriteria = Object.keys(breakdown).length
    const usedCriteria = Object.values(breakdown).filter(
      item => item.score !== -1 && !item.ignored
    ).length
    const criteriaUsagePercent = totalCriteria > 0 ? (usedCriteria / totalCriteria) * 100 : 0

    return {
      name: analysis.candidato,
      criteriaUsage: parseFloat(criteriaUsagePercent.toFixed(1)),
      score: analysis.score_porcentaje,
      analysisId: analysis.id,
      usedCount: usedCriteria,
      totalCount: totalCriteria
    }
  })

  // Determinar color segun la posicion en el grafico
  const getPointColor = (criteriaUsage, score) => {
    // Zona ideal: Alto score + Alto uso de criterios
    if (score >= 70 && criteriaUsage >= 70) return '#10b981' // Verde (success)
    
    // Zona sospechosa: Alto score pero pocos criterios
    if (score >= 70 && criteriaUsage < 70) return '#f59e0b' // Naranja (warning)
    
    // Zona media
    if (score >= 50) return '#3b82f6' // Azul (primary)
    
    // Zona baja
    return '#ef4444' // Rojo (danger)
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Score: {data.score}%</p>
          <p className="text-sm text-gray-600">
            Criterios usados: {data.usedCount}/{data.totalCount} ({data.criteriaUsage}%)
          </p>
        </div>
      )
    }
    return null
  }

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay datos suficientes para mostrar la grafica
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Como Interpretar esta Grafica</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>Eje X:</strong> Porcentaje de criterios evaluados (mayor = mas informacion disponible)</p>
          <p><strong>Eje Y:</strong> Score obtenido (mayor = mejor compatibilidad)</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Candidatos ideales (alto score + muchos criterios)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Advertencia (alto score pero pocos criterios evaluados)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Candidatos medios</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Bajo match</span>
            </div>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="criteriaUsage" 
            name="Criterios Usados"
            unit="%"
            domain={[0, 100]}
            label={{ value: 'Porcentaje de Criterios Evaluados (%)', position: 'bottom', offset: 40 }}
          />
          <YAxis 
            type="number" 
            dataKey="score" 
            name="Score"
            unit="%"
            domain={[0, 100]}
            label={{ value: 'Score Obtenido (%)', angle: -90, position: 'insideLeft', offset: -45 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          
          {/* Lineas de referencia para dividir zonas */}
          <ReferenceLine y={70} stroke="#94a3b8" strokeDasharray="3 3" />
          <ReferenceLine x={70} stroke="#94a3b8" strokeDasharray="3 3" />
          
          <Scatter name="Candidatos" data={chartData}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getPointColor(entry.criteriaUsage, entry.score)}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div className="text-xs text-gray-500 text-center">
        Total de candidatos: {chartData.length}
      </div>
    </div>
  )
}

export default CandidatesScatterChart

