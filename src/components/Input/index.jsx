import PropTypes from 'prop-types';
import './style.css';

function Input({ type = 'text', placeholder, name, ...rest }) {
  return (
    <input
      className="custom-input" 
      type={type}
      placeholder={placeholder}
      name={name}
      {...rest} 
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Input;
