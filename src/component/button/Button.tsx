import { ButtonProps } from "./types";
import "./button.scss";

const Button = ({ children, onClick, disabled, icon, className = "" }: ButtonProps) => {
  
  const classes = ["default-button", className].join(" ");
  
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;