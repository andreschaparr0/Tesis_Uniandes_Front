import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { analysisService } from '../services/analysisService'
import StatCard from '../components/common/StatCard'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Loading from '../components/common/Loading'

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_cvs: 0,
    total_jobs: 0,
    total_analyses: 0,
    score_promedio_porcentaje: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await analysisService.getStatistics()
      console.log('Stats recibidas del backend:', data)
      
      setStats({
        total_cvs: data.total_cvs ?? 0,
        total_jobs: data.total_jobs ?? 0,
        total_analyses: data.total_analyses ?? 0,
        score_promedio_porcentaje: data.score_promedio_porcentaje ?? 0
      })
    } catch (error) {
      console.error('Error al cargar estadisticas:', error)
      console.error('Detalles del error:', error.response || error.message)
      
      setStats({
        total_cvs: 0,
        total_jobs: 0,
        total_analyses: 0,
        score_promedio_porcentaje: 0
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading message="Cargando estadisticas..." />
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Sistema de Recomendacion de CVs - Vista General
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total CVs"
          value={stats.total_cvs}
          subtitle="CVs procesados"
          color="primary"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />

        <StatCard
          title="Total Jobs"
          value={stats.total_jobs}
          subtitle="Ofertas de trabajo"
          color="success"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />

        <StatCard
          title="Analisis Realizados"
          value={stats.total_analyses}
          subtitle="Comparaciones completadas"
          color="warning"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />

        <StatCard
          title="Score Promedio"
          value={`${stats.score_promedio_porcentaje}%`}
          subtitle="Compatibilidad media"
          color="success"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Acciones Rapidas">
          <div className="space-y-3">
            <Link to="/cvs/upload" className="block">
              <Button variant="primary" className="w-full">
                Subir Nuevo CV
              </Button>
            </Link>
            <Link to="/jobs/create" className="block">
              <Button variant="success" className="w-full">
                Crear Nueva Oferta
              </Button>
            </Link>
            <Link to="/analysis" className="block">
              <Button variant="secondary" className="w-full">
                Realizar Analisis
              </Button>
            </Link>
          </div>
        </Card>

        <Card title="Navegacion">
          <div className="space-y-3">
            <Link to="/cvs" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <h4 className="font-medium text-gray-900">Ver CVs</h4>
              <p className="text-sm text-gray-600">Explorar todos los CVs procesados</p>
            </Link>
            <Link to="/jobs" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <h4 className="font-medium text-gray-900">Ver Jobs</h4>
              <p className="text-sm text-gray-600">Explorar ofertas de trabajo</p>
            </Link>
            <Link to="/analysis/history" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <h4 className="font-medium text-gray-900">Historial de Analisis</h4>
              <p className="text-sm text-gray-600">Ver todos los analisis realizados</p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

