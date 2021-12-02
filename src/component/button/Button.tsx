import { ButtonProps } from "./types";
import "./button.scss";

const Button = ({ text, onClick, disabled, icon, className = "" }: ButtonProps) => {
  
  const classes = ["default-button", className].join(" ");
  
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {text}
    </button>
  );
};

export default Button;