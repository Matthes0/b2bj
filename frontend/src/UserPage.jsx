import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "./api/auth";
import {Link} from "react-router-dom";
export default function UserPage() {
  const [user, setUser] = useState(null);
   //const navigate = useNavigate();
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
      <div>
        <p>Nie jesteś zalogowany.</p>
        <Link to="/login">Zaloguj się</Link> lub{" "}
        <Link to="/register">Zarejestruj się</Link>
      </div>
    );
  }
  return (
      <div>
          <p>Logged as: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Balance: {user.profile.balance} zł</p>
          <p>Date of birth: {user.profile.date_of_birth}</p>
          <p>Country: {user.profile.country}</p>
          <p>Games played: {user.profile.games_played}</p>
          <p>Games won: {user.profile.games_won}</p>
          <p>Total winnings: {user.profile.total_winnings} zł</p>

          <button onClick={handleLogout}>Wyloguj się</button>
      </div>
  );
}