import React from 'react';
import './Logo.css';
import { useNavigate } from 'react-router-dom';

export function Logo() {
  const navigate = useNavigate();

  return (
    <div className="logo-container" onClick={() => navigate('/')}>
      <span className="casino-logo-text">🎲 B2BJ</span>
    </div>
  );
}
