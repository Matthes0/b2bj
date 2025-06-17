import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "./api/auth";
import { Link } from "react-router-dom";
import './UserPage.css';

export default function UserPage() {
  const [user, setUser] = useState(null);

  async function handleLogout() {
    await logout();
    window.location.reload();
  }

  useEffect(() => {
    getCurrentUser().then(data => {
      setUser(data);
    });
  }, []);

  if (!user) {
    return (
      <div className="user-container not-logged">
        <h2>Nie jesteś zalogowany</h2>
        <div className="auth-links">
          <Link to="/login" className="auth-btn login-btn">Zaloguj się</Link>
          <Link to="/register" className="auth-btn register-btn">Zarejestruj się</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-container">
      <div className="user-header">
        <h2>Twój profil</h2>
        <div className="user-avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="user-info-grid">
        <div className="info-card">
          <span className="info-label">Nazwa użytkownika</span>
          <span className="info-value">{user.username}</span>
        </div>

        <div className="info-card">
          <span className="info-label">Email</span>
          <span className="info-value">{user.email}</span>
        </div>

        <div className="info-card highlight">
          <span className="info-label">Saldo</span>
          <span className="info-value">{user.profile.balance} zł</span>
        </div>

        <div className="info-card">
          <span className="info-label">Data urodzenia</span>
          <span className="info-value">{user.profile.date_of_birth}</span>
        </div>

        <div className="info-card">
          <span className="info-label">Kraj</span>
          <span className="info-value">{user.profile.country}</span>
        </div>

        <div className="info-card stat-card">
          <span className="info-label">Rozegrane gry</span>
          <span className="info-value">{user.profile.games_played}</span>
        </div>

        <div className="info-card stat-card">
          <span className="info-label">Wygrane gry</span>
          <span className="info-value">{user.profile.games_won}</span>
        </div>

        <div className="info-card stat-card highlight">
          <span className="info-label">Łączne wygrane</span>
          <span className="info-value">{user.profile.total_winnings} zł</span>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-btn">Wyloguj się</button>
    </div>
  );
}