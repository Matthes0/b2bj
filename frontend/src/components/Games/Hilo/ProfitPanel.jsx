import React from "react";

export function ProfitPanel({ profit, gameStatus, resetGame }) {
  return (
    <div className="profit-panel">
      <h3>Total Profit: {profit}</h3>
      {gameStatus !== "playing" && (
        <div>
          <h2>{gameStatus === "won" ? "You Won!" : "You Lost!"}</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
