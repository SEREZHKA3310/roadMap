import React from "react"

type FieldProps = {
  className: string,
  id: string,
  label: string,
  type?: string,
  value?: string,
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ className, id, label, type = "text", value, onInput }, ref) => {
    return (
      <div className={`"field" ${className}`}>
        <label className="field_control" htmlFor={id}>
          {label}
        </label>
        <input 
          className="field__input"
          id={id}
          placeholder=" "
          autoComplete="off"
          type={type}
          value={value}
          onInput={onInput}
          ref={ref}
        />
      </div>
    )
  }
)

export default Field