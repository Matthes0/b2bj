import React from 'react';

export function MinesSidebar({
    diamonds, setDiamonds, mines, setMines,
    bet, setBet, balance,
    multiplier, profit,
    onCashout, onStart, onReset, 
    gameOver, gameStarted,
    lossMessage,  remainingDiamonds,
    remainingMines,  isAnimating
  }) {
  
    const isStartDisabled = bet <= 0 || bet > balance || isAnimating;

  return (
    <div className="mines-sidebar">
      <h2>💣 Mines</h2>
      <div className="stat"><span>Balance:</span> <strong>{balance.toFixed(2)}</strong></div>

      {!gameStarted && (
        <>
          {/* <div className="stat">
            <span>Diamonds:</span>
            <input type="number" value={diamonds} min={1} max={24} onChange={(e) => setDiamonds(Number(e.target.value))} />
          </div> */}
          <div className="stat">
            <span>Mines:</span>
            <input
              type="number"
              value={mines}
              min={1}
              max={24}
              onChange={(e) => {
                const value = Math.max(1, Number(e.target.value));
                setMines(value);
              }}
            />

          </div>
          <div className="stat">
            <span>Bet:</span>
            <input type="number" value={bet} min={0} max={balance} onChange={(e) => setBet(Number(e.target.value))} />
          </div>
          {/* <button onClick={onStart} disabled={bet <= 0 || bet > balance}>🎮 Start</button> */}
          <button onClick={onStart} disabled={isStartDisabled}>🎮 Start</button>
        </>
      )}

{gameStarted && (
  <>
    <div className="stat"><span>Remaining Diamonds:</span> <strong>{remainingDiamonds}</strong></div>
    <div className="stat"><span>Remaining Mines:</span> <strong>{remainingMines}</strong></div>
    <div className="stat"><span>Multiplier:</span> <strong>{multiplier}x</strong></div>
    <div className="stat"><span>Total Profit:</span> <strong>{profit}</strong></div>
    <button onClick={onCashout} disabled={gameOver}>💰 Cashout</button>
  </>
)}


{gameOver && lossMessage && (
  <>
    <div className="loss-message">💥 You lost!</div>
    <button className="reset-button" onClick={onReset} disabled={isAnimating}>🔁 Play Again</button>
  </>
)}


    </div>
  );
}
