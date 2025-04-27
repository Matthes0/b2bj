import React from "react";
import { Card } from "./Card";

export function GameBoard({ game }) {
  const { currentCard, gameStatus } = game;

  return (
    <div className="game-board">
      <h2>HiLo Game</h2>
      <div className="current-card">
        {currentCard && <Card card={currentCard} gameStatus={gameStatus} />}
      </div>
      {gameStatus === "lost" && (
        <div className="subtle-lost-text">
          You lost. Try again!
        </div>
      )}
    </div>
  );
}
