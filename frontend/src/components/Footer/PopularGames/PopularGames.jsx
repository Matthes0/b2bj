import React from 'react';
import { Link } from 'react-router-dom';

export function PopularGames() {
  return (
    <div className="footer-column">
      <h3>Popular Games</h3>
      <ul>
        <li><Link to="/game1">Game 1</Link></li>
        <li><Link to="/game2">Game 2</Link></li>
        <li><Link to="/game3">Game 3</Link></li>
      </ul>
    </div>
  );
}

