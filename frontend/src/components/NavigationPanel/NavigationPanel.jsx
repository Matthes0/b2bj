import "./NavigationPanel.css"

import React from 'react';
import { Link } from 'react-router-dom';



export function NavigationPanel() {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {/* <li><Link to="/bj">BJ</Link></li> */}
      </ul>
    </nav>
  );
}


