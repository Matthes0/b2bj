import React, { useState, useEffect } from 'react';
import { MinesSidebar } from './MinesSidebar';
import { MinesBoard } from './MinesBoard';
import './Mines.css';

export function Mines({ balance, setBalance }) {
  const totalTiles = 25;
  const [diamonds, setDiamonds] = useState(5);
  const [mines, setMines] = useState(20);
  const [bet, setBet] = useState(0);
  const [revealedDiamonds, setRevealedDiamonds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentProfit, setCurrentProfit] = useState(0);
  const [lossMessage, setLossMessage] = useState("");
  const [clickedMineIndex, setClickedMineIndex] = useState(null);
  
  useEffect(() => setMines(totalTiles - diamonds), [diamonds]);
  useEffect(() => setDiamonds(totalTiles - mines), [mines]);


  const baseMultiplier = 1 + (mines / 50);
  const multiplier = (baseMultiplier + revealedDiamonds * 0.05).toFixed(2);
  const updatedProfit = revealedDiamonds > 0 ? (bet * multiplier).toFixed(2) : 0;
  
  

useEffect(() => {
    if (gameStarted) {
      setCurrentProfit(updatedProfit);
    }
  }, [revealedDiamonds, bet, multiplier, gameStarted]);
  

  const handleResetGame = () => {
    setGameOver(false);
    setGameStarted(false);
    setRevealedDiamonds(0);
    setCurrentProfit(0);
    setLossMessage("");
    setClickedMineIndex(null); 
  };
  
  
  const handleStartGame = () => {
    if (bet > 0 && bet <= balance) {
      setBalance(prev => prev - bet);
      setRevealedDiamonds(0);
      setCurrentProfit(0);
      setGameOver(false);
      setGameStarted(true);
      setLossMessage("");
      setClickedMineIndex(null); 
    }
  };
  
  

  const onRevealDiamond = () => {
    setRevealedDiamonds(prev => prev + 1);
  };

  const onHitMine = () => {
    setGameOver(true);
    setLossMessage("💥 You lost!");
  };

  const handleCashout = () => {
    setBalance(prev => prev + parseFloat(currentProfit));
    setGameOver(true);
    setGameStarted(false);
  };

  return (
    <div className="mines-wrapper">
      <MinesSidebar
        diamonds={diamonds}
        setDiamonds={setDiamonds}
        mines={mines}
        setMines={setMines}
        bet={bet}
        setBet={setBet}
        balance={balance}
        multiplier={multiplier}
        profit={currentProfit}
        onCashout={handleCashout}
        onStart={handleStartGame}
        gameOver={gameOver}
        gameStarted={gameStarted}
        lossMessage={lossMessage}
        onReset={handleResetGame}
        remainingDiamonds={diamonds - revealedDiamonds}
        remainingMines={gameOver && clickedMineIndex !== null ? mines - 1 : mines}
      />
      <MinesBoard
        size={5}
        mines={mines}
        onRevealDiamond={onRevealDiamond}
        onHitMine={onHitMine}
        gameOver={gameOver}
        gameStarted={gameStarted}
        clickedMineIndex={clickedMineIndex}
        setClickedMineIndex={setClickedMineIndex}
      />
    </div>
  );
}
