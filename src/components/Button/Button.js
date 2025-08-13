import "./Button.css"
function Button(props) {
  return (
    <button className="button">
      <span className="button-text p2-r">{props.text}</span>
    </button>
  );
}
export default Button;