import { Link } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sistema de Recomendacion de CVs</h1>
        <p className="mt-2 text-gray-600">
          Bienvenido al sistema de analisis y recomendacion de candidatos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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

      <Card title="Como Empezar">
        <div className="prose max-w-none">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Sube al menos un CV en formato PDF</li>
            <li>Crea una descripcion de trabajo</li>
            <li>Realiza un analisis para comparar el CV con el trabajo</li>
            <li>Revisa los resultados y el score de compatibilidad</li>
          </ol>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard

