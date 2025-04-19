import React from 'react';
import { Link } from 'react-router-dom';

export function HelpSection() {
  return (
    <div className="footer-column">
      <h3>Help</h3>
      <ul>
        <li><Link to="/help1">Help 1</Link></li>
        <li><Link to="/help2">Help 2</Link></li>
        <li><Link to="/help3">Help 3</Link></li>
      </ul>
    </div>
  );
}


