import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { analysisService } from '../../services/analysisService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import Alert from '../../components/common/Alert'

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadAnalyses()
  }, [])

  const loadAnalyses = async () => {
    try {
      const data = await analysisService.getAllAnalyses()
      setAnalyses(data)
    } catch (err) {
      setError('Error al cargar el historial')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!window.confirm('¿Estas seguro de eliminar este analisis?')) {
      return
    }

    try {
      await analysisService.deleteAnalysis(id)
      loadAnalyses()
    } catch (err) {
      setError('Error al eliminar el analisis')
      console.error(err)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-success-100 text-success-800'
    if (score >= 60) return 'bg-primary-100 text-primary-800'
    if (score >= 40) return 'bg-warning-100 text-warning-800'
    return 'bg-danger-100 text-danger-800'
  }

  if (loading) {
    return <Loading message="Cargando historial..." />
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historial de Analisis</h1>
          <p className="mt-2 text-gray-600">
            Total: {analyses.length} analisis realizados
          </p>
        </div>
        <Link to="/analysis">
          <Button variant="primary">Nuevo Analisis</Button>
        </Link>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {analyses.length > 0 ? (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="relative">
              <Link to={`/analysis/${analysis.id}`}>
                <Card className="hover:shadow-lg transition cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${getScoreColor(analysis.score_porcentaje)}`}>
                            {analysis.score_porcentaje}%
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {analysis.candidato}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {analysis.trabajo}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(analysis.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => handleDelete(analysis.id, e)}
                      >
                        Eliminar
                      </Button>
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No hay analisis en el historial</p>
            <Link to="/analysis">
              <Button variant="primary">Realizar Primer Analisis</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}

export default AnalysisHistory

