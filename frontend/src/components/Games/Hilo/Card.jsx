import React from "react";

export function Card({ card, gameStatus }) {
  if (!card) return null;

  const rank = card.rank.toLowerCase();
  const suit = card.suit.toLowerCase();
  const fileName = `${rank}_of_${suit}.png`;
  const imagePath = `/karty/${fileName}`;

  return (
    <div className={`card ${gameStatus === "lost" ? "lost-card" : ""}`}>
      <img 
        src={imagePath} 
        alt={`${card.rank} of ${card.suit}`} 
        onError={(e) => { e.target.src = "/karty/card_background.png"; }}
      />
    </div>
  );
}
