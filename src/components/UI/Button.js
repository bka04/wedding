import "./Button.css";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`btn ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
