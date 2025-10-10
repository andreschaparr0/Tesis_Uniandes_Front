import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cvService } from '../../services/cvService'
import { jobService } from '../../services/jobService'
import { analysisService } from '../../services/analysisService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import Alert from '../../components/common/Alert'
import WeightsConfigurator from '../../components/Analysis/WeightsConfigurator'

const Analysis = () => {
  const navigate = useNavigate()
  const [cvs, setCvs] = useState([])
  const [jobs, setJobs] = useState([])
  const [selectedCV, setSelectedCV] = useState('')
  const [selectedJob, setSelectedJob] = useState('')
  const [customWeights, setCustomWeights] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [cvsData, jobsData] = await Promise.all([
        cvService.getAllCVs(),
        jobService.getAllJobs()
      ])
      setCvs(cvsData)
      setJobs(jobsData)
    } catch (err) {
      setError('Error al cargar datos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedCV || !selectedJob) {
      setError('Debes seleccionar un CV y un Job')
      return
    }

    try {
      setAnalyzing(true)
      setError(null)
      const result = await analysisService.analyzeCV(
        parseInt(selectedCV),
        parseInt(selectedJob),
        customWeights
      )
      
      navigate(`/analysis/${result.analysis_id}`)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al realizar el analisis')
      console.error(err)
    } finally {
      setAnalyzing(false)
    }
  }

  if (loading) {
    return <Loading message="Cargando datos..." />
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Realizar Analisis</h1>
        <p className="mt-2 text-gray-600">
          Compara un CV con una oferta de trabajo
        </p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {(cvs.length === 0 || jobs.length === 0) && (
        <Alert type="warning" message="Necesitas al menos 1 CV y 1 Job para realizar un analisis">
          <div className="mt-4 flex gap-2">
            {cvs.length === 0 && (
              <Link to="/cvs/upload">
                <Button>Subir CV</Button>
              </Link>
            )}
            {jobs.length === 0 && (
              <Link to="/jobs/create">
                <Button>Crear Job</Button>
              </Link>
            )}
          </div>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Seleccionar CV">
          <select
            value={selectedCV}
            onChange={(e) => setSelectedCV(e.target.value)}
            className="input"
          >
            <option value="">-- Selecciona un CV --</option>
            {cvs.map((cv) => (
              <option key={cv.id} value={cv.id}>
                {cv.nombre} - {cv.email}
              </option>
            ))}
          </select>

          {selectedCV && (
            <div className="mt-4">
              <Link to={`/cvs/${selectedCV}`}>
                <Button variant="secondary" size="sm">
                  Ver Detalle del CV
                </Button>
              </Link>
            </div>
          )}
        </Card>

        <Card title="Seleccionar Job">
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="input"
          >
            <option value="">-- Selecciona un Job --</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.titulo} - {job.empresa}
              </option>
            ))}
          </select>

          {selectedJob && (
            <div className="mt-4">
              <Link to={`/jobs/${selectedJob}`}>
                <Button variant="secondary" size="sm">
                  Ver Detalle del Job
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>

      <WeightsConfigurator onWeightsChange={setCustomWeights} />

      <div className="mt-6">
        <Button
          variant="primary"
          onClick={handleAnalyze}
          disabled={!selectedCV || !selectedJob || analyzing}
          size="lg"
          className="w-full"
        >
          {analyzing ? 'Analizando...' : 'Realizar Analisis'}
        </Button>
      </div>

      {analyzing && (
        <div className="mt-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">
              Procesando analisis con IA... Esto puede tomar unos segundos
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Analysis

