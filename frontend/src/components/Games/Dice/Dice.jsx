import React, { useState } from 'react';
import '../Dice/styles/dice.css';

export function Dice() {
  const [sliderValue, setSliderValue] = useState(0);
  const [generatedValue, setGeneratedValue] = useState(null);
  const [gameStatus, setGameStatus] = useState('');

  const handleSliderChange = (e) => {
    setSliderValue(parseFloat(e.target.value));
  };

  const handleButtonClick = () => {
    const randomValue = parseFloat((Math.random() * 100).toFixed(2));
    setGeneratedValue(randomValue);
    if (randomValue <= sliderValue) {
      setGameStatus('win');
    } else {
      setGameStatus('lose');
    }
  };

  return (
    <div className="game-container">
      <div className="controls-panel">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            step="0.01"
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider"
          />
          <div className="slider-value" style={{ color: sliderValue === generatedValue ? 'green' : 'gray' }}>
            {sliderValue}
          </div>
          {generatedValue !== null && (
            <div
              className="generated-point"
              style={{ left: `${(generatedValue / 100) * 100}%` }}
            ></div>
          )}
        </div>
        <button onClick={handleButtonClick} className="generate-button">
          Generate Number
        </button>
        {generatedValue !== null && (
          <div className="result-panel">
            <div className="result-box">
              <h2>Generated Value: {generatedValue}</h2>
              <h2 className={`result-message ${gameStatus}`}>
                {gameStatus === 'win' ? 'You Won!' : 'You Lost!'}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
