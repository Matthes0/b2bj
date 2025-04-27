import React from "react";

export function GameResult({ gameStatus, resetGame }) {
  if (gameStatus !== "lost") return null;

  return (
    <div className="game-lost-message">
      <h2>YOU LOST!</h2>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
}
