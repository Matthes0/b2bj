import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "./api/auth";
import { useNavigate } from "react-router-dom";
export default function UserPage() {
  const [user, setUser] = useState(null);
    const navigate = useNavigate();
  async function handleLogout() {
    await logout();
    navigate("/login");
  }
  useEffect(() => {
    getCurrentUser().then(data => {
      setUser(data);
    });
  }, []);

  if (!user) return <p>Nie jesteś zalogowany.</p>;
  return (
      <div>
          <p>Zalogowany jako: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Saldo: {user.profile.balance} zł</p>
          <button onClick={handleLogout}>Wyloguj się</button>
      </div>
  );
}