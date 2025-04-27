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


// import React from 'react';
// import './Header.css';

// export function Header({ balance, togglePanel }) {
//   return (
//     <header className="header-bar">
//       <div className="wallet-header" onClick={togglePanel}>
//         <div className="wallet-info">
//           <span className="currency">PLN {balance.toFixed(2)}</span>
//           <span className="wallet-icon">🪙</span>
//           <span className="arrow">▼</span>
//         </div>
//         <button className="wallet-button">Portfel</button>
//       </div>
//     </header>
//   );
// }


import React, {useEffect, useState} from 'react';
import './Header.css';
import { UserProfile } from '../UserProfile/UserProfile';
import { Logo } from './Logo/Logo';
import {getCurrentUser} from "../../api/auth.jsx";

export function Header({ togglePanel }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
    getCurrentUser().then(data => {
      setUser(data);
    });
    }, []);


  return (
    <header className="header-bar">
      <Logo />

      <div className="header-controls">
          {user && (
              <>
        <div className="wallet-header" onClick={togglePanel}>
          <div className="wallet-info">
          <span className="currency">
            PLN {user?.profile?.balance != null ? user.profile.balance.toFixed(2) : '0.00'}
          </span>
            <span className="wallet-icon">🪙</span>
            <span className="arrow">▼</span>
          </div>
          <button className="wallet-button">Portfel</button>
        </div>
                                    </>
              )}
        <UserProfile />
      </div>
    </header>
  );
}
