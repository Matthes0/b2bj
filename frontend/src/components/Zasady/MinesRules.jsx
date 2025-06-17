import React from 'react';
import './Rules.css';

export function MinesRules() {
  return (
    <div className="rules-page">
      <h1>Zasady Gry Mines</h1>
      <div className="rules-content">

        <section className="rules-section">
          <h2>Podstawy Gry</h2>
          <ol>
            <li><strong>Cel gry:</strong> Odkrywać bezpieczne pola na planszy, unikając min i zbierając diamenty.</li>
            <li><strong>Plansza:</strong> 5x5 pól (25 pól w sumie) z ukrytymi minami i diamentami.</li>
            <li><strong>Rozpoczęcie:</strong> Wybierasz liczbę min (1-24) - im więcej min, tym wyższe potencjalne wygrane.</li>
          </ol>
        </section>

        <section className="rules-section">
          <h2>Przebieg Rozgrywki</h2>
          <div className="rules-grid">
            <div className="rule-card">
              <h3>Odkrywanie Pól</h3>
              <p>Kliknij na dowolne pole, aby je odkryć. Każde bezpieczne pole zwiększa Twoją wygraną.</p>
            </div>
            <div className="rule-card">
              <h3>Diamenty</h3>
              <p>Za każde odkryte pole z diamentem otrzymujesz mnożnik wygranej zgodnie z aktualnym poziomem ryzyka.</p>
            </div>
            <div className="rule-card">
              <h3>Miny</h3>
              <p>Odkrycie miny natychmiast kończy grę i powoduje utratę zakładu.</p>
            </div>
          </div>
        </section>



        <section className="rules-section">
          <h2>Strategia i Porady</h2>
          <ol>
            <li>Im więcej min wybierzesz, tym wyższe potencjalne wygrane, ale też większe ryzyko.</li>
            <li>Możesz zakończyć grę w dowolnym momencie, zatrzymując aktualną wygraną.</li>
            <li>Pola są losowane przy każdym kliknięciu - nie ma ukrytych schematów.</li>
          </ol>
        </section>

        <section className="rules-section">
          <h2>Przykładowa Rozgrywka</h2>
          <div className="mines-example">
            <div className="mines-grid">
              {[...Array(25)].map((_, i) => (
                <div key={i} className={`mines-cell ${i === 12 ? 'mine' : i % 5 === 0 ? 'diamond' : ''}`}>
                  {i === 12 ? '💣' : i % 5 === 0 ? '💎' : '🟦'}
                </div>
              ))}
            </div>
            <div className="mines-example-text">
              <p><strong>Przykład:</strong> Na planszy 5x5 z 5 minami. Niebieskie pola są bezpieczne, 💎 to diament (+mnożnik), 💣 to mina (koniec gry).</p>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}