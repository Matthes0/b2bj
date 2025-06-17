import React from 'react';
import './Rules.css';

export function BlackjackRules() {
  return (
    <div className="rules-page">
      <h1>Zasady Blackjacka</h1>
      <div className="rules-content">

        <section className="rules-section">
          <h2>Podstawowe zasady</h2>
          <ol>
            <li><strong>Cel gry:</strong> Uzyskać wynik bliższy 21 niż krupier, nie przekraczając 21 punktów.</li>
            <li><strong>Wartości kart:</strong>
              <ul>
                <li>Karty 2-10 = wartość nominalna</li>
                <li>Walet (J), Dama (Q), Król (K) = 10 punktów</li>
                <li>As (A) = 1 lub 11 punktów (automatycznie wybierana najlepsza wartość)</li>
              </ul>
            </li>
            <li><strong>Blackjack:</strong> As + 10 (lub figura) w pierwszych dwóch kartach - płaci 3:2</li>
          </ol>
        </section>

        <section className="rules-section">
          <h2>Przebieg gry</h2>
          <ol>
            <li>Gracze dokonują zakładów przed rozdaniem kart</li>
            <li>Każdy gracz otrzymuje 2 karty odkryte, krupier 1 kartę odkrytą i 1 zakrytą</li>
            <li>Gracze podejmują decyzje:
              <ul>
                <li><strong>Dobierz (Hit):</strong> Weź dodatkową kartę</li>
                <li><strong>Stój (Stand):</strong> Zatrzymaj aktualną wartość</li>
                <li><strong>Podwój (Double):</strong> Podwój zakład i dobierz 1 kartę</li>
                <li><strong>Podziel (Split):</strong> Jeśli masz parę, możesz podzielić na 2 ręce</li>
              </ul>
            </li>
            <li>Krupier odkrywa zakrytą kartę i dobiera do 17 punktów</li>
            <li>Porównanie wyników i rozliczenie zakładów</li>
          </ol>
        </section>


        <section className="rules-section">
          <h2>Wyniki i wypłaty</h2>
          <table className="payout-table">
            <thead>
              <tr>
                <th>Wynik</th>
                <th>Wypłata</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Blackjack (As + 10)</td>
                <td>3:2 (1.5x zakład)</td>
              </tr>
              <tr>
                <td>Wygrana</td>
                <td>1:1 (równowartość zakładu)</td>
              </tr>
              <tr>
                <td>Remis</td>
                <td>Zwrot zakładu</td>
              </tr>
              <tr>
                <td>Przegrana</td>
                <td>Utracony zakład</td>
              </tr>
            </tbody>
          </table>
        </section>


      </div>
    </div>
  );
}