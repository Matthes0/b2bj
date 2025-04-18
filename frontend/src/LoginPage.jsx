// src/pages/LoginPage.jsx
import { useState } from "react";
import { login } from "./api/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate("/user");
    } else {
      setError(result.error || "Błąd logowania");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Zaloguj się</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button type="submit">Zaloguj</button>
    </form>
  );
}