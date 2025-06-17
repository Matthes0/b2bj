import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GameList } from './GameList/GameList';
import './Home.css';

export function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/games/')
      .then(res => setGames(res.data))
      .catch(err => console.error('Błąd ładowania gier:', err));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Nasze gry:</h1>

      <div className="games-grid">
        <div className="game-card">
          <Link to="/bj" className="game-link">
            <span className="game-icon">🎰</span>
            <span className="game-title">Blackjack</span>
            <span className="game-description">Klasyczna gra karciana</span>
          </Link>
        </div>

        <div className="game-card">
          <Link to="/mines" className="game-link">
            <span className="game-icon">💣</span>
            <span className="game-title">Mines</span>
            <span className="game-description">Uważaj na bomby!</span>
          </Link>
        </div>

        <div className="game-card">
          <Link to="/dragontower" className="game-link">
            <span className="game-icon">🐉</span>
            <span className="game-title">Dragon Tower</span>
            <span className="game-description">Czy uda ci się dojść na szczyt?</span>
          </Link>
        </div>

        <div className="game-card">
          <Link to="/dice" className="game-link">
            <span className="game-icon">🎲</span>
            <span className="game-title">Dragon Dice</span>
            <span className="game-description">Czy kostka okaże się szczęśliwa?</span>
          </Link>
        </div>

        <div className="game-card">
          <Link to="/hilo" className="game-link">
            <span className="game-icon">🃏</span>
            <span className="game-title">HiLo</span>
            <span className="game-description">Więcej czy mniej?</span>
          </Link>
        </div>
      </div>

      <GameList games={games} />
    </div>
  );
}