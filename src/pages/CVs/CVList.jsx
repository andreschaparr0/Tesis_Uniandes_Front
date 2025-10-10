import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cvService } from '../../services/cvService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Loading from '../../components/common/Loading'
import Alert from '../../components/common/Alert'

const CVList = () => {
  const [cvs, setCvs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCVs()
  }, [])

  const loadCVs = async () => {
    try {
      setLoading(true)
      const data = await cvService.getAllCVs()
      setCvs(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los CVs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadCVs()
      return
    }

    try {
      setLoading(true)
      const data = await cvService.searchCVs(searchTerm)
      setCvs(data)
      setError(null)
    } catch (err) {
      setError('Error en la busqueda')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estas seguro de eliminar este CV?')) {
      return
    }

    try {
      await cvService.deleteCV(id)
      loadCVs()
    } catch (err) {
      setError('Error al eliminar el CV')
      console.error(err)
    }
  }

  if (loading && cvs.length === 0) {
    return <Loading message="Cargando CVs..." />
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion de CVs</h1>
          <p className="mt-2 text-gray-600">
            Total: {cvs.length} CVs procesados
          </p>
        </div>
        <Link to="/cvs/upload">
          <Button variant="primary">Subir Nuevo CV</Button>
        </Link>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <Card className="mb-6">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch}>Buscar</Button>
          <Button variant="secondary" onClick={loadCVs}>
            Limpiar
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cvs.map((cv) => (
          <Card key={cv.id}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {cv.nombre || 'Sin nombre'}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Email:</span> {cv.email || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Ubicacion:</span> {cv.ubicacion || 'N/A'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Creado: {new Date(cv.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/cvs/${cv.id}`} className="flex-1">
                <Button variant="primary" className="w-full" size="sm">
                  Ver Detalle
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(cv.id)}
              >
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {cvs.length === 0 && !loading && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron CVs</p>
            <Link to="/cvs/upload">
              <Button variant="primary" className="mt-4">
                Subir Primer CV
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}

export default CVList

