type ButtonProps = {
  className?: string,
  type?: "button" | "submit" | "reset"
  children?: string
}

const Button = ({className = "", type = "button", isDisabled, onClick, children}: ButtonProps) => {
  return (
    <button onClick={onClick}
      className={`button ${className}`}
      type={type}
      disabled={isDisabled}
    >
        {children}
    </button>
  )
}

export default Button