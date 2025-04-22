// import React from 'react';

// export function Header({ balance, togglePanel }) {
//   return (
//     <header>
//       <div className="header-content">
//         <div className="balance">{balance}</div>
//         <button className="open-panel-button" onClick={togglePanel}>
//           Open Panel
//         </button>
//       </div>
//     </header>
//   );
// }


import React from 'react';
import './Header.css';

export function Header({ balance, togglePanel }) {
  return (
    <header className="header-bar">
      <div className="wallet-header" onClick={togglePanel}>
        <div className="wallet-info">
          <span className="currency">PLN {balance.toFixed(2)}</span>
          <span className="wallet-icon">🪙</span>
          <span className="arrow">▼</span>
        </div>
        <button className="wallet-button">Portfel</button>
      </div>
    </header>
  );
}
