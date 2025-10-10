import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts'

const ScoreBreakdownChart = ({ breakdown }) => {
  const labels = {
    experience: 'Experiencia',
    technical_skills: 'Hab. Tecnicas',
    education: 'Educacion',
    responsibilities: 'Responsabilidades',
    certifications: 'Certificaciones',
    soft_skills: 'Hab. Blandas',
    languages: 'Idiomas',
    location: 'Ubicacion',
  }

  const data = Object.entries(breakdown || {})
    .filter(([_, value]) => !value.ignored)
    .map(([key, value]) => ({
      aspect: labels[key] || key,
      score: value.score * 100,
    }))

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No hay datos para mostrar
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="aspect" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#2563eb"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default ScoreBreakdownChart

