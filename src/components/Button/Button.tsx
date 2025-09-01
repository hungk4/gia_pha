import "./Button.css";
import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  icon?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ text, icon, onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {icon && (
        <span
          className="material-symbols-outlined button-icon"
          style={{ marginRight: 8 }}
        >
          {icon}
        </span>
      )}
      <span className="button-text p2-r">{text}</span>
    </button>
  );
}

export default Button;
