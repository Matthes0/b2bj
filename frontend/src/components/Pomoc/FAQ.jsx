import React from 'react';
import './Help.css';
export function FAQ() {
  return (
    <div className="help-page">
      <h1>Najczęstsze pytania</h1>
      <div className="help-content">
        <h3>Jak grać w Blackjacka?</h3>
        <p>Celem jest zdobycie 21 punktów bez przekroczenia tej wartości.</p>

        <h3>Jak wypłacić wygrane?</h3>
        <p>Wygrane są wypłacane automatycznie na Twoje konto.</p>
      </div>
    </div>
  );
}