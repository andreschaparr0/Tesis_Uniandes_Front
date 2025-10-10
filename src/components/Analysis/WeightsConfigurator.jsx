import { useState } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'

const WeightsConfigurator = ({ onWeightsChange }) => {
  const defaultWeights = {
    experience: 0.30,
    technical_skills: 0.15,
    education: 0.15,
    responsibilities: 0.15,
    certifications: 0.10,
    soft_skills: 0.08,
    languages: 0.04,
    location: 0.03,
  }

  const [weights, setWeights] = useState(defaultWeights)
  const [useCustom, setUseCustom] = useState(false)

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

  const handleWeightChange = (key, value) => {
    const newWeights = {
      ...weights,
      [key]: parseFloat(value),
    }
    setWeights(newWeights)
    if (onWeightsChange) {
      onWeightsChange(useCustom ? newWeights : null)
    }
  }

  const handleReset = () => {
    setWeights(defaultWeights)
    if (onWeightsChange) {
      onWeightsChange(null)
    }
  }

  const handleToggleCustom = (enabled) => {
    setUseCustom(enabled)
    if (onWeightsChange) {
      onWeightsChange(enabled ? weights : null)
    }
  }

  const total = Object.values(weights).reduce((sum, val) => sum + val, 0)

  return (
    <Card title="Configuracion de Pesos">
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={useCustom}
            onChange={(e) => handleToggleCustom(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Usar pesos personalizados</span>
        </label>
      </div>

      {useCustom && (
        <>
          <div className="space-y-4 mb-4">
            {Object.entries(weights).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    {labels[key]}
                  </label>
                  <span className="text-sm text-gray-600">
                    {(value * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={value}
                  onChange={(e) => handleWeightChange(key, e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-4">
            <span className="font-medium text-gray-700">Total:</span>
            <span className={`font-bold ${total === 1.0 ? 'text-success-600' : 'text-warning-600'}`}>
              {(total * 100).toFixed(0)}%
            </span>
          </div>

          {total !== 1.0 && (
            <p className="text-sm text-warning-600 mb-4">
              Nota: Los pesos se normalizaran automaticamente si no suman 100%
            </p>
          )}

          <Button variant="secondary" onClick={handleReset} size="sm">
            Restaurar Valores Predeterminados
          </Button>
        </>
      )}

      {!useCustom && (
        <div className="text-sm text-gray-600">
          <p>Se usaran los pesos predeterminados del sistema.</p>
        </div>
      )}
    </Card>
  )
}

export default WeightsConfigurator

