import React from 'react';
import './Help.css';

export function Regulamin() {
  return (
    <div className="help-page">
      <h1>Regulamin Blik2Blackjack</h1>
      <div className="help-content">
        <h2>§1. Postanowienia ogólne</h2>
        <ol>
          <li>Niniejszy regulamin określa zasady korzystania z serwisu gier online dostępnego pod adresem www.blik2blackjack.com</li>
          <li>Kasyno działa na podstawie licencji wydanej przez Urząd miar i Wiar nr 2137420 </li>
          <li>Administratorem danych osobowych jest SAMSON.SA z siedzibą w Morenka 13</li>
        </ol>

        <h2>§2. Warunki uczestnictwa</h2>
        <ol>
          <li>Minimalny wiek gracza to 18 lat. Rejestracja osób niepełnoletnich jest zabroniona.</li>
          <li>Gracz może posiadać tylko jedno konto. W przypadku wykrycia wielu kont, wszystkie mogą zostać zablokowane.</li>
          <li>Zabronione jest korzystanie z konta przez osoby trzecie.</li>
          <li>Gracz zobowiązany jest podać prawdziwe dane osobowe podczas rejestracji.</li>
        </ol>

        <h2>§3. Zasady gier</h2>
        <ol>
          <li>Wszystkie gry w kasynie działają na zasadzie losowości potwierdzonej certyfikatami niezależnych organizacji.</li>
          <li>Kasyno zastrzega sobie prawo do zmian w ofercie gier bez wcześniejszego powiadomienia.</li>
          <li>Zabronione jest korzystanie z jakichkolwiek zewnętrznych narzędzi mogących wpływać na wynik gry.</li>
          <li>W przypadku wystąpienia błędu technicznego, kasyno zastrzega sobie prawo do unieważnienia rozgrywki.</li>
        </ol>

        <h2>§4. Wpłaty i wypłaty</h2>
        <ol>
          <li>Minimalna wpłata wynosi 10 PLN, a minimalna wypłata 50 PLN.</li>
          <li>Czas przetwarzania wypłat wynosi do 3 dni roboczych.</li>
          <li>Kasyno może wymagać weryfikacji tożsamości przed przetworzeniem pierwszej wypłaty.</li>
          <li>Wypłaty są realizowane tylko na konta należące do właściciela konta gracza.</li>
        </ol>


        <h2>§5. Odpowiedzialność</h2>
        <ol>
          <li>Kasyno nie ponosi odpowiedzialności za straty poniesione podczas gry.</li>
          <li>Gracz ponosi pełną odpowiedzialność za podatki wynikające z wygranych.</li>
        </ol>

        <h2>§6. Postanowienia końcowe</h2>
        <ol>
          <li>Kasyno zastrzega sobie prawo do zmian w regulaminie z 7-dniowym wyprzedzeniem.</li>
          <li>Spory będą rozstrzygane przez sąd właściwy dla siedziby operatora.</li>
          <li>Regulamin wchodzi w życie z dniem 17.06.2025 .</li>
        </ol>

        <p className="last-update">Ostatnia aktualizacja: 17.06.2025</p>
      </div>
    </div>
  );
}