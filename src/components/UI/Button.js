import "./Button.css";

const Button = (props) => {
  const disabled = (props.disabled === "true");

  return (
    <button 
      onClick={props.onClick} 
      className={`btn ${props.className}`}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
