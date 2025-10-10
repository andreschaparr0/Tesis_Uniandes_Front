const Alert = ({ type = 'info', message, onClose }) => {
  const types = {
    success: {
      bg: 'bg-success-50',
      border: 'border-success-200',
      text: 'text-success-800',
      icon: '✓'
    },
    error: {
      bg: 'bg-danger-50',
      border: 'border-danger-200',
      text: 'text-danger-800',
      icon: '×'
    },
    warning: {
      bg: 'bg-warning-50',
      border: 'border-warning-200',
      text: 'text-warning-800',
      icon: '!'
    },
    info: {
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      text: 'text-primary-800',
      icon: 'i'
    }
  }

  const config = types[type]

  return (
    <div className={`${config.bg} ${config.border} ${config.text} border rounded-lg p-4 mb-4`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-xl font-bold">{config.icon}</span>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-3 text-xl font-bold hover:opacity-70"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert

