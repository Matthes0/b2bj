// import React from 'react';
// import "./Panel.css"



// export function Panel({ isPanelOpen, closePanel }) {
//   if (!isPanelOpen) return null;

//   return (
//     <div className="overlay" onClick={closePanel}>
//       <div className="panel" onClick={function (e) { e.stopPropagation(); }}>
//         <h2>Panel Content</h2>
//         <button onClick={closePanel}>Close Panel</button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import './Panel.css';

import { useState } from 'react';
import creditCard from '../../assets//Panel/creditCard.png';
import coinHand from '../../assets//Panel/coinHand.png';
import coin from '../../assets/Panel/coin.png';

export function Panel({ isPanelOpen, closePanel }) {
  const [activePanel, setActivePanel] = useState('deposit');

  if (!isPanelOpen) return null;

  return (
    <div className="overlay" onClick={closePanel}>
      <div className="wallet-popup" onClick={(e) => e.stopPropagation()}>
        <div className="left-panel">
          <button onClick={() => setActivePanel('deposit')}>
            Depozyt
            <img src={creditCard} alt="Depozyt" />
          </button>
          <button onClick={() => setActivePanel('withdraw')}>
            Wypłata
            <img src={coinHand} alt="Wypłata" />
          </button>
          <button onClick={() => setActivePanel('freeCoins')}>
            Darmowe monety
             <img src={coin} alt="Darmowe monety" />
          </button>
        </div>
        <div className="right-panel">
          {activePanel === 'deposit' && <h3>Depozyt (tu pojawi się zawartość)</h3>}
          {activePanel === 'withdraw' && <h3>Wypłata (tu pojawi się zawartość)</h3>}
          {activePanel === 'freeCoins' && <h3>Darmowe monety (tu pojawi się zawartość)</h3>}
        </div>
      </div>
    </div>
  );
}
