import React, {useEffect} from 'react';
import './Panel.css';
import { useState } from 'react';
import creditCard from '../../assets//Panel/creditCard.png';
import coinHand from '../../assets//Panel/coinHand.png';
import coin from '../../assets/Panel/coin.png';
import axios from 'axios';

export function Panel({ isPanelOpen, closePanel }) {
  const [activePanel, setActivePanel] = useState('deposit');
  const [activeDepositType, setActiveDepositType] = useState(null);
  const [blikAmount, setBlikAmount] = useState(10);
  const [freeCoinsMessage, setFreeCoinsMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [cardAmount, setCardAmount] = useState(10);
  const [paysafeAmount, setPaysafeAmount] = useState(10);
  const [paysafePin, setPaysafePin] = useState('');

  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldown]);

  useEffect(() => {
    setActiveDepositType(null);
  }, [activePanel]);

  if (!isPanelOpen) return null;

  const handleClaimFreeCoins = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/payments/free-coins/',
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setFreeCoinsMessage(response.data.message);
        setCooldown(response.data.next_claim_in);
      } else {
        setFreeCoinsMessage(response.data.message);
        setCooldown(response.data.remaining_seconds);
      }
    } catch (err) {
      setFreeCoinsMessage('Wystąpił błąd podczas odbierania monet.');
    }
  };

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
            <>
              <div className="deposit-options">
                <button onClick={() => setActiveDepositType('blik')}>
                  BLIK
                </button>
                <button onClick={() => setActiveDepositType('card')}>
                  KARTA PŁATNICZA
                </button>
                <button onClick={() => setActiveDepositType('paysafecard')}>
                  PAYSAFECARD
                </button>
              </div>

              {activeDepositType === 'blik' && (
                <div className="deposit-details blik-section">
                  <h3>Doładuj przez Blik</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await axios.post(
                          'http://localhost:8000/api/payments/top-up/',
                          { amount: blikAmount * 100 },
                          { withCredentials: true }
                        );
                        if (response.data.redirect_url) {
                          window.location.href = response.data.redirect_url;
                        }
                      } catch (error) {
                        console.error('Błąd:', error.response?.data || error.message);
                      }
                    }}
                  >
                    <div className="form-group">
                      <label>Kwota doładowania (zł)</label>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={blikAmount}
                        onChange={(e) => setBlikAmount(parseFloat(e.target.value))}
                      />
                    </div>
                    <button type="submit" className="submit-button">Zapłać Blikiem</button>
                  </form>
                </div>
              )}

              {activeDepositType === 'card' && (
                <div className="deposit-details card-section">
                  <h3>Doładuj przez kartę płatniczą</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await axios.post(
                          'http://localhost:8000/api/payments/top-up/',
                          {
                            amount: cardAmount * 100,
                            payment_method: 'card'
                          },
                          { withCredentials: true }
                        );
                        if (response.data.redirect_url) {
                          window.location.href = response.data.redirect_url;
                        }
                      } catch (error) {
                        console.error('Błąd:', error.response?.data || error.message);
                      }
                    }}
                  >
                    <div className="form-group">
                      <label>Kwota doładowania (zł)</label>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={cardAmount}
                        onChange={(e) => setCardAmount(parseFloat(e.target.value))}
                      />
                    </div>

                    <div className="card-inputs">
                      <div className="form-group">
                        <label>Numer karty</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          pattern="[0-9\s]{16,19}"
                          required
                        />
                      </div>

                      <div className="card-details">
                        <div className="form-group">
                          <label>Data ważności</label>
                          <input
                            type="text"
                            placeholder="MM/RR"
                            pattern="\d{2}/\d{2}"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            pattern="\d{3}"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Imię i nazwisko na karcie</label>
                        <input
                          type="text"
                          placeholder="JAN KOWALSKI"
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="submit-button">Zapłać kartą</button>
                  </form>
                </div>
              )}

              {activeDepositType === 'paysafecard' && (
                <div className="deposit-details paysafe-section">
                  <h3>Doładuj przez Paysafecard</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await axios.post(
                          'http://localhost:8000/api/payments/top-up/',
                          {
                            amount: paysafeAmount * 100,
                            payment_method: 'paysafecard',
                            pin: paysafePin
                          },
                          { withCredentials: true }
                        );
                        if (response.data.success) {
                          alert('Płatność zakończona sukcesem!');
                        }
                      } catch (error) {
                        console.error('Błąd:', error.response?.data || error.message);
                      }
                    }}
                  >
                    <div className="form-group">
                      <label>Kwota doładowania (zł)</label>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={paysafeAmount}
                        onChange={(e) => setPaysafeAmount(parseFloat(e.target.value))}
                      />
                    </div>

                    <div className="form-group">
                      <label>Kod PIN Paysafecard</label>
                      <input
                        type="text"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        value={paysafePin}
                        onChange={(e) => setPaysafePin(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="submit-button">Zapłać Paysafecard</button>
                  </form>
                </div>
              )}
            </>
          )}

          {activePanel === 'withdraw' && (
            <div className="withdraw-section">
              <h3>Wypłata na rachunek bankowy</h3>
              <p>Wpisz numer rachunku do wypłaty i podaj kwotę wypłaty</p>
              <div className="account-selection">
                <label>Nr konta</label>
                <input type="text" placeholder="Wpisz numer konta" />
              </div>
              <div className="amount-section">
                <label>Kwota w zł</label>
                <input type="number" />
                <br />
                <button type="submit" className="submit-button">Wypłata</button>
              </div>
            </div>
          )}

          {activePanel === 'freeCoins' && (
            <div className="free-coins-section">
              <h3>Darmowe monety</h3>
              <p>Raz na 10 minut możesz odebrać darmowe 10 zł.</p>
              <button
                onClick={handleClaimFreeCoins}
                disabled={cooldown > 0}
                className="submit-button"
              >
                {cooldown > 0 ? `Spróbuj za ${cooldown}s` : 'Odbierz 10 zł'}
              </button>
              <p className="message">{freeCoinsMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}