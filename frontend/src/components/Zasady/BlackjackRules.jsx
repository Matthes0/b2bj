import React from 'react';
import './Rules.css';
export function BlackjackRules() {
  return (
    <div className="rules-page">
      <h1>Zasady Blackjacka</h1>
      <div className="rules-content">
        <ol>
          <li>Cel: uzyskać wynik bliższy 21 niż krupier, nie przekraczając 21</li>
          <li>Wartości kart: 2-10 = wartość nominalna, J/Q/K = 10, A = 1 lub 11</li>
          <li>Blackjack (A + 10) płaci 3:2</li>
        </ol>
      </div>
    </div>
  );
}