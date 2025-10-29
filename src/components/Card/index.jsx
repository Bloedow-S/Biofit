import PropTypes from "prop-types";
import "./style.css";

function Card({ children }) {
  return (
    <div className="custom-card">
      {children} {/* */}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;