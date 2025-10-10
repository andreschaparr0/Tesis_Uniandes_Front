import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { cvService } from '../../services/cvService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import Alert from '../../components/common/Alert'

const CVDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cv, setCv] = useState(null)
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('personal')

  useEffect(() => {
    loadCV()
    loadAnalyses()
  }, [id])

  const loadCV = async () => {
    try {
      const data = await cvService.getCVById(id)
      setCv(data)
    } catch (err) {
      setError('Error al cargar el CV')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadAnalyses = async () => {
    try {
      const data = await cvService.getCVAnalyses(id)
      setAnalyses(data)
    } catch (err) {
      console.error('Error loading analyses:', err)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('¿Estas seguro de eliminar este CV?')) {
      return
    }

    try {
      await cvService.deleteCV(id)
      navigate('/cvs')
    } catch (err) {
      setError('Error al eliminar el CV')
      console.error(err)
    }
  }

  if (loading) {
    return <Loading message="Cargando CV..." />
  }

  if (!cv) {
    return (
      <Alert type="error" message="CV no encontrado">
        <Link to="/cvs">
          <Button>Volver a la lista</Button>
        </Link>
      </Alert>
    )
  }

  const tabs = [
    { id: 'personal', name: 'Informacion Personal' },
    { id: 'education', name: 'Educacion' },
    { id: 'experience', name: 'Experiencia' },
    { id: 'skills', name: 'Habilidades' },
    { id: 'certifications', name: 'Certificaciones' },
    { id: 'languages', name: 'Idiomas' },
    { id: 'analyses', name: `Analisis (${analyses.length})` },
  ]

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/cvs" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
            ← Volver a CVs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {cv.nombre}
          </h1>
          <p className="text-gray-600">{cv.email}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/analysis">
            <Button variant="primary">Analizar CV</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <div className="mb-4 border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <Card>
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Informacion Personal</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre</p>
                <p className="text-gray-900">{cv.cv_data?.personal?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{cv.cv_data?.personal?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Telefono</p>
                <p className="text-gray-900">{cv.cv_data?.personal?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ubicacion</p>
                <p className="text-gray-900">{cv.cv_data?.personal?.location || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Educacion</h3>
            {cv.cv_data?.education?.length > 0 ? (
              <div className="space-y-4">
                {cv.cv_data.education.map((edu, idx) => (
                  <div key={idx} className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.field} - {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay informacion educativa</p>
            )}
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Experiencia Laboral</h3>
            {cv.cv_data?.experience?.length > 0 ? (
              <div className="space-y-4">
                {cv.cv_data.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-success-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay experiencia registrada</p>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Habilidades Tecnicas</h3>
              {cv.cv_data?.technical_skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {cv.cv_data.technical_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay habilidades tecnicas</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Habilidades Blandas</h3>
              {cv.cv_data?.soft_skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {cv.cv_data.soft_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay habilidades blandas</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Certificaciones</h3>
            {cv.cv_data?.certifications?.length > 0 ? (
              <div className="space-y-3">
                {cv.cv_data.certifications.map((cert, idx) => (
                  <div key={idx} className="border-l-4 border-warning-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500">{cert.year}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay certificaciones</p>
            )}
          </div>
        )}

        {activeTab === 'languages' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Idiomas</h3>
            {cv.cv_data?.languages && Object.keys(cv.cv_data.languages).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(cv.cv_data.languages).map(([lang, level], idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium text-gray-900">{lang}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay idiomas registrados</p>
            )}
          </div>
        )}

        {activeTab === 'analyses' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Analisis Realizados</h3>
            {analyses.length > 0 ? (
              <div className="space-y-3">
                {analyses.map((analysis) => (
                  <Link
                    key={analysis.id}
                    to={`/analysis/${analysis.id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{analysis.trabajo}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(analysis.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          {analysis.score_porcentaje}%
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay analisis para este CV</p>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

export default CVDetail

