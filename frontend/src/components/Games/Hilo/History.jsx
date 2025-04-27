import React from "react";

export function History({ history }) {
  return (
    <div className="history">
      <h3>History</h3>
      <div className="history-cards">
        {history.map((card, index) => (
          <img
            key={index}
            src={`/karty/${card.rank.toLowerCase()}_of_${card.suit.toLowerCase()}.png`}
            alt={`${card.rank} of ${card.suit}`}
            className="history-card"
          />
        ))}
      </div>
    </div>
  );
}
