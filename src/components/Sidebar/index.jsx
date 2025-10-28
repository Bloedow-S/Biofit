import PropTypes from 'prop-types';
import './styles.css';  

export default function Sidebar({ children }) {
  return (
    <aside className="sidebar">
      {children}
    </aside>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node
};
