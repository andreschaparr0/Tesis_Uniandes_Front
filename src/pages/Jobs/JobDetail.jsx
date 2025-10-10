import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { jobService } from '../../services/jobService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import Alert from '../../components/common/Alert'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [topCandidates, setTopCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('info')

  useEffect(() => {
    loadJob()
    loadTopCandidates()
  }, [id])

  const loadJob = async () => {
    try {
      const data = await jobService.getJobById(id)
      setJob(data)
    } catch (err) {
      setError('Error al cargar el Job')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadTopCandidates = async () => {
    try {
      const data = await jobService.getTopCandidates(id, 10)
      setTopCandidates(data)
    } catch (err) {
      console.error('Error loading candidates:', err)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('¿Estas seguro de eliminar este Job?')) {
      return
    }

    try {
      await jobService.deleteJob(id)
      navigate('/jobs')
    } catch (err) {
      setError('Error al eliminar el Job')
      console.error(err)
    }
  }

  if (loading) {
    return <Loading message="Cargando Job..." />
  }

  if (!job) {
    return (
      <Alert type="error" message="Job no encontrado">
        <Link to="/jobs">
          <Button>Volver a la lista</Button>
        </Link>
      </Alert>
    )
  }

  const tabs = [
    { id: 'info', name: 'Informacion General' },
    { id: 'requirements', name: 'Requisitos' },
    { id: 'candidates', name: `Top Candidatos (${topCandidates.length})` },
  ]

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
            ← Volver a Jobs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {job.titulo}
          </h1>
          <p className="text-gray-600">{job.empresa}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/analysis">
            <Button variant="primary">Analizar Candidatos</Button>
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
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Informacion Basica</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Titulo</p>
                  <p className="text-gray-900">{job.job_data?.basic_info?.job_title || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Empresa</p>
                  <p className="text-gray-900">{job.job_data?.basic_info?.company_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Modalidad</p>
                  <p className="text-gray-900">{job.job_data?.basic_info?.work_modality || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo de Contrato</p>
                  <p className="text-gray-900">{job.job_data?.basic_info?.contract_type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Salario</p>
                  <p className="text-gray-900">{job.job_data?.basic_info?.salary || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ubicacion</p>
                  <p className="text-gray-900">{job.job_data?.location || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resumen</h3>
              <p className="text-gray-700">{job.job_data?.basic_info?.summary || 'N/A'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Responsabilidades</h3>
              {job.job_data?.responsibilities?.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {job.job_data.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-700">{resp}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No especificadas</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Beneficios</h3>
              {job.job_data?.benefits?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {job.job_data.benefits.map((benefit, idx) => (
                    <span key={idx} className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm">
                      {benefit}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No especificados</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Educacion</h3>
              <p className="text-gray-700">{job.job_data?.education || 'No especificada'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Experiencia</h3>
              <p className="text-gray-700">{job.job_data?.experience || 'No especificada'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Habilidades Tecnicas</h3>
              {job.job_data?.technical_skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {job.job_data.technical_skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No especificadas</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Habilidades Blandas</h3>
              {job.job_data?.soft_skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {job.job_data.soft_skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No especificadas</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Certificaciones</h3>
              {job.job_data?.certifications?.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {job.job_data.certifications.map((cert, idx) => (
                    <li key={idx} className="text-gray-700">{cert}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No especificadas</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Idiomas</h3>
              {job.job_data?.languages && Object.keys(job.job_data.languages).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(job.job_data.languages).map(([lang, level], idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium text-gray-900">{lang}</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {level}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No especificados</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Candidatos</h3>
            {topCandidates.length > 0 ? (
              <div className="space-y-3">
                {topCandidates.map((candidate) => (
                  <Link
                    key={candidate.analysis_id}
                    to={`/analysis/${candidate.analysis_id}`}
                    className="block p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-gray-400">
                            #{candidate.rank}
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">{candidate.candidato}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(candidate.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          {candidate.score_porcentaje}%
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay candidatos analizados para este job</p>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

export default JobDetail

