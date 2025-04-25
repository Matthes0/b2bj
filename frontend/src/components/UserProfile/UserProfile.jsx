import React, {useEffect, useState} from 'react';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import {getCurrentUser} from "../../api/auth.jsx";

export function UserProfile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
    getCurrentUser().then(data => {
      setUser(data);
    });
    }, []);
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/user');
  };

  return (
    <div className="user-panel" onClick={goToProfile}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
        alt="User Avatar"
        className="avatar"
      />
      <span className="username">{user ? user.username : "Nie jesteś zalogowany"}</span>
    </div>
  );
}
