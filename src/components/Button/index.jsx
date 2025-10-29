import './style.css'; 
import PropTypes from "prop-types";

function Botao({ type = "button", children, ...rest }) {
  return (
    <button className="custom-button" type={type} {...rest}>
      {children}
    </button>
  );
}

Botao.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Botao;
