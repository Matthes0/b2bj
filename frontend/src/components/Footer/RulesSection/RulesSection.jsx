import React from 'react';
import { Link } from 'react-router-dom';

export function RulesSection() {
  return (
    <div className="footer-column">
      <h3>Zasady Gier</h3>
      <ul>
        <li><Link to="/zasady/blackjack">Blackjack</Link></li>
        <li><Link to="/zasady/hilo">HiLo</Link></li>
        <li><Link to="/zasady/mines">Mines</Link></li>
      </ul>
    </div>
  );
}