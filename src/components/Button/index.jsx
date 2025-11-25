import './style.css'; 
import PropTypes from "prop-types";

function Button({ text, children, type = "button", className = "", ...rest }) {
  return (
    // Combina a classe padrão 'button' com qualquer classe extra passada (ex: perfil-edit-button)
    // {...rest} espalha propriedades como onClick, disabled, etc.
    <button className={`button ${className}`} type={type} {...rest}>
      {text || children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;