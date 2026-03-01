type FieldProps = {
  className: string,
  id: string,
  label: string,
  type?: string,
  value?: string,
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void
}


const Field = ({className, id, label, type = "text", value, onInput}: FieldProps) => {
  return (
    <div className={`"field" ${className}`}>
      <label className="field_control" htmlFor={id}>
        {label}
      </label>
      <input className="field__input"
        id="new-task"
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        onInput={onInput}
      />
    </div>
  )
}

export default Field