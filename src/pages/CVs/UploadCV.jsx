import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { cvService } from '../../services/cvService'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Alert from '../../components/common/Alert'

const UploadCV = () => {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop: (files) => {
      if (files.length > 0) {
        handleUpload(files[0])
      }
    }
  })

  const handleUpload = async (file) => {
    try {
      setUploading(true)
      setError(null)
      const data = await cvService.uploadCV(file)
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al procesar el CV')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/cvs" className="text-primary-600 hover:text-primary-700 mb-2 inline-block">
          ← Volver a CVs
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Subir Nuevo CV</h1>
        <p className="mt-2 text-gray-600">
          Sube un archivo PDF para procesar el CV
        </p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {result && (
        <Alert type="success" message={`CV procesado exitosamente: ${result.nombre}`}>
          <div className="mt-4 flex gap-2">
            <Link to={`/cvs/${result.cv_id}`}>
              <Button>Ver CV</Button>
            </Link>
            <Button variant="secondary" onClick={() => setResult(null)}>
              Subir Otro
            </Button>
          </div>
        </Alert>
      )}

      {!result && (
        <Card>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
              isDragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400'
            }`}
          >
            <input {...getInputProps()} />
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-4 text-sm text-gray-600">
              {isDragActive
                ? 'Suelta el archivo aqui...'
                : 'Arrastra un PDF aqui, o haz click para seleccionar'}
            </p>
            <p className="mt-2 text-xs text-gray-500">Solo archivos PDF</p>
          </div>

          {acceptedFiles.length > 0 && !uploading && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Archivo seleccionado:</p>
              <p className="text-sm text-gray-600">{acceptedFiles[0].name}</p>
            </div>
          )}

          {uploading && (
            <div className="mt-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3 text-gray-600">Procesando CV...</span>
              </div>
              <p className="text-sm text-gray-500 text-center mt-2">
                Extrayendo texto y estructurando informacion
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

export default UploadCV

