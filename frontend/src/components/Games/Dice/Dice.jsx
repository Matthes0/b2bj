import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Dice/styles/dice.css';

export function Dice() {
  const [sliderValue, setSliderValue] = useState(50);
  const [generatedValue, setGeneratedValue] = useState(null);
  const [gameStatus, setGameStatus] = useState('');
  const [betAmount, setBetAmount] = useState(10);
  const [isAbove, setIsAbove] = useState(true);
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserBalance();
  }, []);

  const fetchUserBalance = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users/balance/', {
        withCredentials: true
      });
      setBalance(res.data.balance);
      setIsLoading(false);
    } catch (err) {
      console.error("Błąd podczas pobierania balansu:", err);
      setIsLoading(false);
    }
  };

  const updateBalance = async (amount, action) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/users/balance/',
        { amount, action },
        { withCredentials: true }
      );
      setBalance(res.data.new_balance);
      return true;
    } catch (err) {
      console.error(`Błąd podczas ${action} balansu:`, err);
      alert(`Nie udało się zaktualizować balansu: ${err.response?.data?.message || err.message}`);
      return false;
    }
  };

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value));
  };

  const multiplyBet = (multiplier) => {
    const newBet = Math.max(1, Math.floor(betAmount * multiplier));
    setBetAmount(newBet);
  };

  const handleButtonClick = async () => {
    if (betAmount < 1) {
      alert('Minimalny zakład to 1');
      return;
    }

    if (betAmount > balance) {
      alert('Nie masz wystarczającej ilości środków');
      return;
    }

    // Odejmij środki przed rozpoczęciem gry
    const success = await updateBalance(betAmount, 'subtract');
    if (!success) return;

    const randomValue = parseFloat((Math.random() * 100).toFixed(2));
    setGeneratedValue(randomValue);
    const win = (isAbove && randomValue > sliderValue) || (!isAbove && randomValue <= sliderValue);
    setGameStatus(win ? 'win' : 'lose');

    if (win) {
      const payout = betAmount * (100 / (isAbove ? (100 - sliderValue) : sliderValue));
      await updateBalance(payout, 'add');
    }

    const newEntry = {
      result: randomValue,
      isWin: win
    };

    setHistory([newEntry, ...history.slice(0, 9)]); // max 10 ostatnich
  };

  const calculatePayout = () => {
    const chance = isAbove ? 100 - sliderValue : sliderValue;
    return chance > 0 ? (100 / chance).toFixed(2) : '∞';
  };

  return (
    <div className="kontener-gra">
      <div className="panel-zaklad">
        <h3>Saldo: {isLoading ? 'Ładowanie...' : balance.toFixed(2)}</h3>
        <div className="bet-controls">
          <inputs
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value) || 1)}
            min="1"
          />
          <div className="bet-multipliers">
            <button onClick={() => multiplyBet(0.5)} className="multiplier-btn">1/2</button>
            <button onClick={() => multiplyBet(2)} className="multiplier-btn">x2</button>
          </div>
        </div>
        <button onClick={handleButtonClick} className="generate-button">
          Losuj
        </button>
      </div>

      <div className="controls-panel">
        <div className="history-panel">
          <h4>Ostatnie wyniki</h4>
          <div className="history-items">
            {history.map((entry, index) => (
              <div
                key={index}
                className={`history-item ${entry.isWin ? 'win' : 'lose'}`}
              >
                {entry.result}
              </div>
            ))}
          </div>
        </div>

        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="99"
            step="1"
            value={sliderValue}
            onChange={handleSliderChange}
            className={`slider ${isAbove ? 'above' : 'below'}`}
            style={{ '--value': sliderValue }}
          />
          <div className="slider-value" style={{ color: sliderValue === generatedValue ? 'green' : 'gray' }}>
            {sliderValue}
          </div>
          {generatedValue !== null && (
            <div
              className="generated-point"
              style={{ left: `${generatedValue}%` }}
            ></div>
          )}
        </div>

        <button className="mode-toggle" onClick={() => setIsAbove(!isAbove)}>
          Tryb: {isAbove ? 'Powyżej' : 'Poniżej'}
        </button>

        <div className="info-bar">
          <div className="info-item">
            <strong>Wygrana:</strong> x{calculatePayout()}
          </div>
          <div className="info-item">
            <strong>{isAbove ? 'Powyżej' : 'Poniżej'}:</strong> {sliderValue}
          </div>
          <div className="info-item">
            <strong>Szanse:</strong> {isAbove ? (100 - sliderValue) : sliderValue}%
          </div>
        </div>

        {generatedValue !== null && (
          <div className="result-panel">
            <div className="result-box">
              <h2>Wylosowano: {generatedValue}</h2>
              <h2 className={`result-message ${gameStatus}`}>
                {gameStatus === 'win' ? 'Wygrałeś!' : 'Przegrałeś!'}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}