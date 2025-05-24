import React, { useState, useEffect } from 'react';
import { MinesSidebar } from './MinesSidebar';
import { MinesBoard } from './MinesBoard';
import './Mines.css';
import {getCurrentUser} from "../../../api/auth.jsx";
import  {fetchUserBalance, subtractBalance, addBalance} from "../../../AnimatedCard.jsx";

export function Mines() {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0); // <- To jest setBalance
    useEffect(() => {
    fetchUserBalance().then(balance => {
      if (balance !== null) {
        setBalance(balance);
      }
    });
  }, []);

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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => setMines(totalTiles - diamonds), [diamonds]);
  useEffect(() => setDiamonds(totalTiles - mines), [mines]);


//   const baseMultiplier = 1 + (mines / 50);
//   const multiplier = (baseMultiplier + revealedDiamonds * 0.05).toFixed(2);
//   const updatedProfit = revealedDiamonds > 0 ? (bet * multiplier).toFixed(2) : 0;
  
// BAZA: zawsze 1.0
// np. przy 5 diamentach: 1 / 5 = 0.2 → większy przyrost
// przy 20 diamentach: 1 / 20 = 0.05 → mniejszy przyrost

// const baseMultiplier = 1.0;
// const multiplierPerDiamond = 1 / diamonds;

// const multiplier = (baseMultiplier + revealedDiamonds * multiplierPerDiamond).toFixed(2);
// const updatedProfit = revealedDiamonds > 0 ? (bet * multiplier).toFixed(2) : 0;

function calculateMultiplier(revealedDiamonds, diamonds, totalTiles) {
    const base = 1.0;
    const riskFactor = Math.log10((totalTiles - diamonds) / diamonds + 1); // zależne od proporcji bomb do diamentów
  
    const growth = Math.pow(1 + riskFactor, revealedDiamonds); // wzrost logarytmiczny
    return (base * growth).toFixed(2);
  }
  
  const multiplier = calculateMultiplier(revealedDiamonds, diamonds, totalTiles);
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
  
  
//   const handleStartGame = () => {
//     if (bet > 0 && bet <= balance) {
//       setBalance(prev => prev - bet);
//       setRevealedDiamonds(0);
//       setCurrentProfit(0);
//       setGameOver(false);
//       setGameStarted(true);
//       setLossMessage("");
//       setClickedMineIndex(null); 
//     }
//   };
  
  
const handleStartGame = () => {
    if (bet > 0 && bet <= balance && !isAnimating) {
        subtractBalance(bet).then(newBalance => {
            setBalance(newBalance);
            setRevealedDiamonds(0);
            setCurrentProfit(0);
            setGameOver(false);
            setGameStarted(true);
            setLossMessage("");
            setClickedMineIndex(null);
        }).catch(err => {
            console.error("Błąd podczas odejmowania balansu:", err);
        });
    }
}
  


  const onRevealDiamond = () => {
    setRevealedDiamonds(prev => prev + 1);
  };

  const onHitMine = () => {
    setGameOver(true);
    setLossMessage("💥 You lost!");
  };

  const handleCashout = () => {
    addBalance(parseFloat(currentProfit)).then(newBalance => {
        setBalance(newBalance);
        setGameOver(true);
        setGameStarted(false);
    }).catch(err => {
        console.error("Błąd podczas dodawania balansu:", err);
    });
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
        isAnimating={isAnimating}
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
        setIsAnimating={setIsAnimating}
      />
    </div>
  );
}
