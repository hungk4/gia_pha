import "./Button.css";
import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      <span className="button-text p2-r">{text}</span>
    </button>
  );
}

export default Button;
