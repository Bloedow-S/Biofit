import PropTypes from 'prop-types';
import './style.css'; 

function Select({ name, value, onChange, children, ...rest }) {
  return (
    <select
      className="custom-select" 
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
    >
      {children}
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Select;