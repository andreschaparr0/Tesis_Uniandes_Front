const TextArea = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  required = false,
  rows = 4,
  error,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`input ${error ? 'border-danger-500' : ''}`}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  )
}

export default TextArea

