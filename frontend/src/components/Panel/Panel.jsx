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

import blikIcon from '../../assets/Panel/blik.png';
import cardIcon from '../../assets/Panel/card.png';
import paysafecardIcon from '../../assets/Panel/paysafecard.png';

export function Panel({ isPanelOpen, closePanel }) {
  const [activePanel, setActivePanel] = useState('deposit');
  const [activeDepositType, setActiveDepositType] = useState(null);

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
          {activePanel === 'deposit' && (
            <div className="deposit-options">
              <button onClick={() => setActiveDepositType('blik')}>
                Blik
                <img src={blikIcon} alt="Blik" />
              </button>
              <button onClick={() => setActiveDepositType('card')}>
                Karta
                <img src={cardIcon} alt="Karta" />
              </button>
              <button onClick={() => setActiveDepositType('paysafecard')}>
                Paysafecard
                <img src={paysafecardIcon} alt="Paysafecard" />
              </button>
            </div>
          )}
          <div className="deposit-details">
            {activeDepositType === 'blik' && <div>Blik (tu pojawi się zawartość)</div>}
            {activeDepositType === 'card' && <div>Karta (tu pojawi się zawartość)</div>}
            {activeDepositType === 'paysafecard' && <div>Paysafecard (tu pojawi się zawartość)</div>}
          </div>
          {activePanel === 'withdraw' && (
            <div className="withdraw-section">
              <h3>Wypłata na rachunek bankowy</h3>
              <p>Wybierz numer rachunku do wypłaty z listy poniżej i wpisz kwotę wypłaty</p>
              <div className="account-selection">
                <label>Nr konta</label>
                <input type="text" placeholder="Wpisz numer konta" />
              </div>
              <div className="amount-section">
                <label>Kwota w zł</label>
                <input type="number" />
                <br />
                <button>Wypłata</button>
              </div>
            </div>
          )}
          {activePanel === 'freeCoins' && <h3>Darmowe monety (tu pojawi się zawartość)</h3>}
        </div>
      </div>
    </div>
  );
}