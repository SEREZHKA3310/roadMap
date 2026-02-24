type FieldProps = {
  className: string,
  id: string,
  label: string,
  type?: string
}


const Field = ({className, id, label, type = "text"}: FieldProps) => {
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
      />
    </div>
  )
}

export default Field