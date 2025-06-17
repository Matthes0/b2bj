import React from 'react';
import './Rules.css';
export function HiLoRules() {
  return (
    <div className="rules-page">
      <h1>Zasady HiLo</h1>
      <div className="rules-content">
        <ol>
          <li>Zgadnij czy następna karta będzie wyższa czy niższa</li>
          <li>Za każdą poprawną odpowiedź zwiększasz wygraną</li>
          <li>Możesz zakończyć grę w dowolnym momencie</li>
        </ol>
      </div>
    </div>
  );
}