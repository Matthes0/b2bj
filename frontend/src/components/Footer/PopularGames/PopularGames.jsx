import React from 'react';
import { Link } from 'react-router-dom';

export function PopularGames() {
  return (
    <div className="footer-column">
      <h3>Popularne Gry</h3>
      <ul>
        <li><Link to="/bj">Blackjack</Link></li>
        <li><Link to="/hilo">HiLo</Link></li>
        <li><Link to="/mines">Mines</Link></li>
      </ul>
    </div>
  );
}