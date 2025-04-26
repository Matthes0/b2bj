// import React from 'react';

// export function ControlPanel({ betAmount, setBetAmount, difficulty, setDifficulty, startGame, profit, multiplier, cashout, gameStarted }) {
//   return (
//     <div className="control-panel">
//       <div className="panel-section">
//         <button className="panel-button active">Manual</button>
//       </div>
//       <div className="panel-section">
//         <label>Amount</label>
//         <input
//           type="number"
//           placeholder="0.00"
//           className="bet-input"
//           value={betAmount}
//           min="0"
//           onChange={(e) => setBetAmount(Number(e.target.value))}
//         />
//         <div className="bet-actions">
//           <button onClick={() => setBetAmount(prev => prev / 2)}>½</button>
//           <button onClick={() => setBetAmount(prev => prev * 2)}>2×</button>
//         </div>
//       </div>
//       <div className="panel-section">
//         <label>Difficulty</label>
//         <select
//           className="difficulty-select"
//           value={difficulty}
//           onChange={(e) => setDifficulty(e.target.value)}
//           disabled={gameStarted} // <--- dodane!
//         >
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//           <option>Extreme</option>
//         </select>
//       </div>

//       {!gameStarted ? (
//         <button className="play-button" onClick={startGame}>Play</button>
//       ) : (
//         <button className="cashout-button" onClick={cashout}>Cashout</button>
//       )}

//       <div className="panel-section">
//         <p>Profit: {profit.toFixed(2)}</p>
//         <p>Multiplier: {multiplier.toFixed(2)}x</p>
//       </div>
//     </div>
//   );
// }

import React from 'react';

export function ControlPanel({ betAmount, setBetAmount, difficulty, setDifficulty, startGame, profit, multiplier, cashout, gameStarted }) {
  return (
    <div className="control-panel">
      <div className="panel-section">
        <button className="panel-button active">Manual</button>
      </div>
      <div className="panel-section">
        <label>Amount</label>
        <input
          type="number"
          placeholder="0.00"
          className="bet-input"
          value={betAmount}
          min="0"
          onChange={(e) => setBetAmount(Number(e.target.value))}
          disabled={gameStarted} 
        />
<div className="bet-actions">
  <button
    onClick={() => setBetAmount(prev => prev > 0 ? Math.max(0.01, +(prev / 2).toFixed(2)) : 0)}
    disabled={gameStarted}
  >
    ½
  </button>
  <button
    onClick={() => setBetAmount(prev => +(prev * 2).toFixed(2))}
    disabled={gameStarted}
  >
    2×
  </button>
</div>


      </div>
      <div className="panel-section">
        <label>Difficulty</label>
        <select
          className="difficulty-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={gameStarted} 
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
          <option>Extreme</option>
        </select>
      </div>

      {!gameStarted ? (
        <button className="play-button" onClick={startGame}>Play</button>
      ) : (
        <button className="cashout-button" onClick={cashout}>Cashout</button>
      )}

      <div className="panel-section">
        <p>Profit: {profit.toFixed(2)}</p>
        <p>Multiplier: {multiplier.toFixed(2)}x</p>
      </div>
    </div>
  );
}
