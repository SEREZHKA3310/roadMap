type ButtonProps = {
  className?: string,
  type?: "button" | "submit" | "reset"
  children?: string
}

const Button = ({className = "", type = "button", children}: ButtonProps) => {
  return (
    <button className={`button ${className}`} type={type}>{children}</button>
  )
}

export default Button