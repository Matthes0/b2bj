
import React from "react";

export function BetPanel({ game }) {
  const {
    betAmount,
    setBetAmount,
    placeFirstBet,
    gameStarted,
    placeBet,
    skipCard,
    cashout,
    selectedOption,
    setSelectedOption,
    chances,
    profit,
    currentCard
  } = game;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setBetAmount(value);
    }
  };

  const halfBet = () => {
    if (betAmount > 0) setBetAmount((betAmount / 2).toFixed(2));
  };

  const doubleBet = () => {
    if (betAmount > 0) setBetAmount((betAmount * 2).toFixed(2));
  };

  const handleBet = (option) => {
    setSelectedOption(option);
    placeBet(option);
  };

  const renderGameOptions = () => {
    if (!currentCard) return [];

    if (currentCard.value === 1) {
      return [
        { label: "Higher", action: "higher" },
        { label: "Same", action: "same" }
      ];
    } else if (currentCard.value === 13) {
      return [
        { label: "Same", action: "same" },
        { label: "Lower", action: "lower" }
      ];
    } else {
      return [
        { label: "Higher or Same", action: "higherOrSame" },
        { label: "Lower or Same", action: "lowerOrSame" }
      ];
    }
  };

  const gameOptions = renderGameOptions();

  return (
    <div className="bet-panel">
      <h2>Bet Options</h2>

      <input
        type="number"
        min="0.01"
        step="0.01"
        value={betAmount}
        onChange={handleInputChange}
        className="bet-input"
        disabled={gameStarted}
      />

      <div className="bet-modifiers">
        <button onClick={halfBet} disabled={gameStarted}>½</button>
        <button onClick={doubleBet} disabled={gameStarted}>x2</button>
      </div>

      {!gameStarted ? (
        <button className="start-btn" onClick={placeFirstBet}>
          Bet ({betAmount})
        </button>
      ) : (
        <>
          <div className="bet-buttons">
            {gameOptions.map((option, idx) => (
              <button key={idx} onClick={() => handleBet(option.action)}>
                {option.label} ({chances[option.action]}%)
              </button>
            ))}
          </div>

          <div className="action-buttons">
            <button className="skip-btn" onClick={skipCard}>Skip</button>
            <button className="cashout-btn" onClick={cashout}>
              Cashout (Profit: {profit})
            </button>
          </div>
        </>
      )}
    </div>
  );
}
