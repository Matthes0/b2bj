import React from 'react';
import { Link } from 'react-router-dom';

export function RulesSection() {
  return (
    <div className="footer-column">
      <h3>Rules</h3>
      <ul>
        <li><Link to="/rules1">Rule 1</Link></li>
        <li><Link to="/rules2">Rule 2</Link></li>
        <li><Link to="/rules3">Rule 3</Link></li>
      </ul>
    </div>
  );
}

