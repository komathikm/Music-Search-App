import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlist" activeClassName="active-link">
            Playlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
