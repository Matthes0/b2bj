import React from 'react';
import './Rules.css';

export function HiLoRules() {
  return (
    <div className="rules-page">
      <h1>Zasady Gry Hi-Lo</h1>
      <div className="rules-content">

        <section className="rules-section">
          <h2>Podstawy Gry</h2>
          <ol>
            <li><strong>Cel gry:</strong> Poprawnie przewidzieć czy następna karta będzie miała wyższą czy niższą wartość niż aktualna karta.</li>
            <li><strong>Wartości kart:</strong>
              <ul>
                <li>As(A) = najniższa wartość</li>
                <li>Król(K) = najwyższa wartość</li>
                <li>Karty 3-10 = wartość nominalna</li>
                <li>Walet (J), Dama (Q)= odpowiednio 11, 12</li>
              </ul>
            </li>
            <li><strong>Start:</strong> Gra rozpoczyna się od losowej karty z talii 52 kart.</li>
          </ol>
        </section>

        <section className="rules-section">
          <h2>Przebieg Rozgrywki</h2>
          <div className="rules-grid">
            <div className="rule-card">
              <h3>Wybór "Wyższa" (Hi)</h3>
              <p>Jeśli uważasz, że następna karta będzie miała wyższą wartość niż aktualna.</p>
            </div>
            <div className="rule-card">
              <h3>Wybór "Niższa" (Lo)</h3>
              <p>Jeśli uważasz, że następna karta będzie miała niższą wartość niż aktualna.</p>
            </div>
            <div className="rule-card">
              <h3>Remis</h3>
              <p>Jeśli następna karta ma tę samą wartość, masz do wyboru zakończyć grę lub kontynuować bez zmiany mnożnika.</p>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}