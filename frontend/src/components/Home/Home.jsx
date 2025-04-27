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
      <h1 className="home-title">Lista Gier z Django API</h1>

          <div className="featured-game">
      <Link to="/bj" className="featured-link">
        <span className="game-icon">🎰</span> <span className="game-text">Zagraj w Blackjack</span>
      </Link>
    </div>

    <div className="featured-game">
      <Link to="/mines" className="featured-link">
        <span className="game-icon">💣</span> <span className="game-text">Zagraj w Mines</span>
      </Link>
    </div>

      <div className="featured-game">
        <Link to="/dragontower" className="featured-link">
          <span className="game-icon">🐉</span> <span className="game-text">Zagraj w Dragon Tower</span>
        </Link>
      </div>

          <div className="featured-game">
        <Link to="/dice" className="featured-link">
          <span className="game-icon">🎲</span> <span className="game-text">Zagraj w Dragon Dice</span>
        </Link>
      </div>

      <div className="featured-game">
        <Link to="/hilo" className="featured-link">
          <span className="game-icon">🃏</span> <span className="game-text">Zagraj w HiLo</span>
        </Link>
      </div>


      <GameList games={games} />
    </div>
  );
}
