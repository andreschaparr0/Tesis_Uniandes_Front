import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { analysisService } from '../../services/analysisService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import Alert from '../../components/common/Alert'
import ScoreBreakdownChart from '../../components/Analysis/ScoreBreakdownChart'

const AnalysisDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadAnalysis()
  }, [id])

  const loadAnalysis = async () => {
    try {
      const data = await analysisService.getAnalysisById(id)
      setAnalysis(data)
    } catch (err) {
      setError('Error al cargar el analisis')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('¿Estas seguro de eliminar este analisis?')) {
      return
    }

    try {
      await analysisService.deleteAnalysis(id)
      navigate('/analysis/history')
    } catch (err) {
      setError('Error al eliminar el analisis')
      console.error(err)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 0.8) return 'text-success-600'
    if (score >= 0.6) return 'text-primary-600'
    if (score >= 0.4) return 'text-warning-600'
    return 'text-danger-600'
  }

  if (loading) {
    return <Loading message="Cargando analisis..." />
  }

  if (!analysis) {
    return (
      <Alert type="error" message="Analisis no encontrado">
        <Link to="/analysis/history">
          <Button>Volver al historial</Button>
        </Link>
      </Alert>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <Link to="/analysis/history" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
            ← Volver al historial
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Resultados del Analisis</h1>
          <p className="mt-2 text-gray-600">
            {analysis.candidato} vs {analysis.trabajo}
          </p>
        </div>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar Analisis
        </Button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Score Final</p>
            <p className={`text-6xl font-bold ${getScoreColor(analysis.score)}`}>
              {analysis.score_porcentaje}%
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Tiempo de procesamiento: {analysis.processing_time}s
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Informacion del Analisis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Candidato</p>
              <Link to={`/cvs/${analysis.cv_id}`} className="text-primary-600 hover:text-primary-700">
                {analysis.candidato}
              </Link>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Trabajo</p>
              <Link to={`/jobs/${analysis.job_id}`} className="text-primary-600 hover:text-primary-700">
                {analysis.trabajo}
              </Link>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha del Analisis</p>
              <p className="text-gray-900">{new Date(analysis.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">ID del Analisis</p>
              <p className="text-gray-900">#{analysis.id}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Desglose del Score" className="mb-6">
        <ScoreBreakdownChart breakdown={analysis.score_breakdown} />
      </Card>

      <Card title="Detalles por Aspecto">
        <div className="space-y-4">
          {Object.entries(analysis.score_breakdown || {}).map(([aspect, data]) => {
            const labels = {
              experience: 'Experiencia',
              technical_skills: 'Habilidades Tecnicas',
              education: 'Educacion',
              responsibilities: 'Responsabilidades',
              certifications: 'Certificaciones',
              soft_skills: 'Habilidades Blandas',
              languages: 'Idiomas',
              location: 'Ubicacion',
            }

            if (data.ignored) return null

            return (
              <div key={aspect} className="border-b pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{labels[aspect] || aspect}</h4>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${getScoreColor(data.score)}`}>
                      {(data.score * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      Peso: {(data.weight * 100).toFixed(0)}% | Contribucion: {data.contribution.toFixed(3)}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    {analysis.resultado_completo?.comparison_results?.[aspect]?.reason || 'No disponible'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {analysis.resultado_completo?.final_score_data?.ignored_aspects?.length > 0 && (
        <Alert type="info" message={`Aspectos ignorados (sin datos): ${analysis.resultado_completo.final_score_data.ignored_aspects.join(', ')}`} />
      )}
    </div>
  )
}

export default AnalysisDetail

