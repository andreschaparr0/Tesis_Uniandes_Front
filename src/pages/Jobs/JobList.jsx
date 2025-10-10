import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jobService } from '../../services/jobService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Loading from '../../components/common/Loading'
import Alert from '../../components/common/Alert'

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const data = await jobService.getAllJobs()
      setJobs(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los Jobs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadJobs()
      return
    }

    try {
      setLoading(true)
      const data = await jobService.searchJobs(searchTerm)
      setJobs(data)
      setError(null)
    } catch (err) {
      setError('Error en la busqueda')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estas seguro de eliminar este Job?')) {
      return
    }

    try {
      await jobService.deleteJob(id)
      loadJobs()
    } catch (err) {
      setError('Error al eliminar el Job')
      console.error(err)
    }
  }

  if (loading && jobs.length === 0) {
    return <Loading message="Cargando Jobs..." />
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion de Jobs</h1>
          <p className="mt-2 text-gray-600">
            Total: {jobs.length} ofertas de trabajo
          </p>
        </div>
        <Link to="/jobs/create">
          <Button variant="primary">Crear Nuevo Job</Button>
        </Link>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <Card className="mb-6">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Buscar por titulo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch}>Buscar</Button>
          <Button variant="secondary" onClick={loadJobs}>
            Limpiar
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {job.titulo || 'Sin titulo'}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Empresa:</span> {job.empresa || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Ubicacion:</span> {job.ubicacion || 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Creado: {new Date(job.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/jobs/${job.id}`} className="flex-1">
                <Button variant="primary" className="w-full" size="sm">
                  Ver Detalle
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(job.id)}
              >
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && !loading && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron Jobs</p>
            <Link to="/jobs/create">
              <Button variant="primary" className="mt-4">
                Crear Primer Job
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}

export default JobList

