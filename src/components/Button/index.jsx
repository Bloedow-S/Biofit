import './style.css'; 
import PropTypes from "prop-types";

// mudei o nome pra button msm
function Button({ text, type = "button" }) {
  return (
    // Mudamos a classe para button
    <button className="button" type={type}>
      {text}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired, // validando text inves de children
};

export default Button;