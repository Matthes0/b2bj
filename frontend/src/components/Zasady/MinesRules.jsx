import React from 'react';
import './Rules.css';
export function MinesRules() {
  return (
    <div className="rules-page">
      <h1>Zasady Mines</h1>
      <div className="rules-content">
        <ol>
          <li>Na planszy ukryte są bomby i diamenty</li>
          <li>Odkrywaj pola, aby zbierać diamenty</li>
          <li>Każdy diament zwiększa Twoją wygraną</li>
          <li>Trafienie na bombę kończy grę i powoduje utratę zakładu</li>
          <li>Możesz zakończyć grę w dowolnym momencie, zachowując wygraną</li>
        </ol>
      </div>
    </div>
  );
}