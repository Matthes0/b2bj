import React from 'react';

export function Header({ balance, togglePanel }) {
  return (
    <header>
      <div className="header-content">
        <div className="balance">{balance}</div>
        <button className="open-panel-button" onClick={togglePanel}>
          Open Panel
        </button>
      </div>
    </header>
  );
}


