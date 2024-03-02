// Sidebar.js
import '../styles.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowRight, faArrowsH, faListAlt,faTasks } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <FontAwesomeIcon icon={faHome} size="2x" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/home">
            <FontAwesomeIcon icon={faTasks} />
            <span> Pending</span>
          </Link>
        </li>
        <li>
          <Link to="/formwarded">
            <FontAwesomeIcon icon={faArrowRight} />
            <span> Forwarded</span>
          </Link>
        </li>
        <li>
          <Link to="/completed">
            <FontAwesomeIcon icon={faListAlt} />
            <span> Completed</span>
          </Link>
        </li>
        <li>
          <Link to="/flow">
            <FontAwesomeIcon icon={faArrowsH} />
            <span> Flows</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
