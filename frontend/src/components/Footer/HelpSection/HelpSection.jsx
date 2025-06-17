import React from 'react';
import { Link } from 'react-router-dom';

export function HelpSection() {
  return (
    <div className="footer-column">
      <h3>Pomoc</h3>
      <ul>
        <li><Link to="/pomoc/regulamin">Regulamin</Link></li>
        <li><Link to="/pomoc/faq">FAQ</Link></li>
        <li><Link to="/pomoc/kontakt">Kontakt</Link></li>
      </ul>
    </div>
  );
}