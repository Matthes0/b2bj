import React from "react";

export function GameActions({ placeBet, skipCard, selectedOption }) {
  return (
    <div className="game-actions">
      <button className="skip-btn" onClick={skipCard}>Skip</button>
      <button 
        className="bet-btn" 
        onClick={() => placeBet(selectedOption)}
        disabled={!selectedOption}
      >
        Bet
      </button>
    </div>
  );
}
