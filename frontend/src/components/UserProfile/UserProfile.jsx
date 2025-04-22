import React from 'react';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {
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
      <span className="username">użytkownik</span>
    </div>
  );
}
