import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { jobService } from '../../services/jobService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import TextArea from '../../components/common/TextArea'
import Alert from '../../components/common/Alert'

const CreateJob = () => {
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [creating, setCreating] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!description.trim()) {
      setError('La descripcion no puede estar vacia')
      return
    }

    try {
      setCreating(true)
      setError(null)
      const data = await jobService.createJob(description)
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al crear el Job')
      console.error(err)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/jobs" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
          ← Volver a Jobs
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Oferta de Trabajo</h1>
        <p className="mt-2 text-gray-600">
          Ingresa la descripcion del trabajo para estructurarla automaticamente
        </p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {result && (
        <Alert type="success" message={`Job creado exitosamente: ${result.titulo}`}>
          <div className="mt-4 flex gap-2">
            <Link to={`/jobs/${result.job_id}`}>
              <Button>Ver Job</Button>
            </Link>
            <Button variant="secondary" onClick={() => setResult(null)}>
              Crear Otro
            </Button>
          </div>
        </Alert>
      )}

      {!result && (
        <form onSubmit={handleSubmit}>
          <Card>
            <TextArea
              label="Descripcion del Trabajo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Pega aqui la descripcion completa del trabajo..."
              rows={15}
              required
            />

            <div className="mt-6 flex gap-4">
              <Button type="submit" variant="primary" disabled={creating}>
                {creating ? 'Procesando...' : 'Crear Job'}
              </Button>
              <Link to="/jobs">
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </Link>
            </div>

            {creating && (
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                  <span className="ml-3 text-gray-600">Estructurando descripcion...</span>
                </div>
              </div>
            )}
          </Card>
        </form>
      )}
    </div>
  )
}

export default CreateJob

