type ButtonProps = {
  className?: string,
  type?: "button" | "submit" | "reset"
  children?: string
}

const Button = ({className = "", type = "button", onClick, children}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`button ${className}`} type={type}>{children}</button>
  )
}

export default Button