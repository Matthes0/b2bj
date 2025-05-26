import React, { useState, useEffect } from 'react';
import { ControlPanel } from './ControlPanel';
import { DragonGrid } from './DragonGrid';
import './styles/dragonTower.css';
import  {fetchUserBalance, subtractBalance, addBalance} from "../../../AnimatedCard.jsx";

export function DragonTower() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchUserBalance().then(balance => {
      if (balance !== null) {
        setBalance(balance);
      }
    }).catch(err => console.error("Failed to fetch balance:", err));
  }, []);
  const [grid, setGrid] = useState([]);
  const [betAmount, setBetAmount] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRow, setCurrentRow] = useState(8);
  const [profit, setProfit] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [highlightRow, setHighlightRow] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [clickedBomb, setClickedBomb] = useState(null);
  const [revealAll, setRevealAll] = useState(false);
  const [clickedTiles, setClickedTiles] = useState([]);

  useEffect(() => {
    prepareNewBoard();
  }, [difficulty]);

  const prepareNewBoard = () => {
    let columns = 4;
    if (difficulty === 'Medium') columns = 3;
    if (difficulty === 'Hard') columns = 2;
    if (difficulty === 'Extreme') columns = 4;

    const newBoard = Array.from({ length: 9 }, () => generateRow(columns));
    setGrid(newBoard);
    setCurrentRow(8);
    setHighlightRow(8);
    setClickedTiles([]);
    setClickedBomb(null);
    setRevealAll(false);
    setGameOver(false);
  };

//   const generateRow = (columns) => {
//     let row = Array(columns).fill('gemstone');

//     if (difficulty === 'Easy' || difficulty === 'Medium') {
//       const bombIndex = Math.floor(Math.random() * columns);
//       row[bombIndex] = 'bomb';
//     } else if (difficulty === 'Hard') {
//       row = row.map(() => (Math.random() < 0.5 ? 'bomb' : 'gemstone'));
//     } else if (difficulty === 'Extreme') {
//       let bombsPlaced = 0;
//       while (bombsPlaced < 3) {
//         const index = Math.floor(Math.random() * columns);
//         if (row[index] !== 'bomb') {
//           row[index] = 'bomb';
//           bombsPlaced++;
//         }
//       }
//       // reszta jajka
//       row = row.map(cell => (cell === 'bomb' ? 'bomb' : 'gemstone'));
//     }

//     return row;
//   };

const generateRow = (columns) => {
    let row = Array(columns).fill('gemstone');
  
    if (difficulty === 'Easy' || difficulty === 'Medium') {
      const bombIndex = Math.floor(Math.random() * columns);
      row[bombIndex] = 'bomb';
    } else if (difficulty === 'Hard') {
      // Zawsze jedna bomba i jedna jajko
      const bombIndex = Math.floor(Math.random() * columns);
      const eggIndex = (bombIndex + 1) % columns; // inny index (prosty sposób)
  
      row = row.map((_, idx) => (idx === bombIndex ? 'bomb' : 'gemstone'));
      row[eggIndex] = 'gemstone'; // upewnijmy się że jedno jajko
    } else if (difficulty === 'Extreme') {
      let bombsPlaced = 0;
      while (bombsPlaced < 3) {
        const index = Math.floor(Math.random() * columns);
        if (row[index] !== 'bomb') {
          row[index] = 'bomb';
          bombsPlaced++;
        }
      }
    }
  
    return row;
  };
  

  const startGame = () => {
    if (betAmount > 0 && betAmount <= balance) {
  subtractBalance(betAmount).then(newBalance => {
    setBalance(newBalance);
    prepareNewBoard();
    setGameStarted(true);
    setProfit(0);
    setMultiplier(1);
    }).catch(err => {
      console.error("Failed to subtract balance:", err);
      alert("Bet failed – check your balance.");
    });
  } else {
    alert('Invalid bet amount.');
  }
  };

  const handleTileClick = (row, col) => {
    if (!gameStarted || row !== currentRow || gameOver) return;

    const selectedTile = grid[row][col];

    if (selectedTile === 'bomb') {
      setClickedBomb({ row, col });
      revealBoard();
    } else {
      setProfit(prev => prev + betAmount * (multiplier * 0.1));
      setMultiplier(prev => prev + 0.2);
      setClickedTiles(prev => [...prev, { row, col }]);

      if (row > 0) {
        setCurrentRow(row - 1);
        setHighlightRow(row - 1);
      } else {
        revealBoard();
      }
    }
  };

  const revealBoard = () => {
    setRevealAll(true);
    setGameStarted(false);
    setGameOver(true);
    setHighlightRow(null);
  };

  const cashout = () => {
    if (profit > 0) {
      addBalance(profit).then(newBalance => {
        setBalance(newBalance);
        revealBoard();
      }).catch(err => {
        console.error("Failed to cash out:", err);
        alert("Cashout failed.");
      });
    }
  }

  return (
    <div className="dragon-tower-wrapper">
      <div className="dragon-tower-container">
        <ControlPanel
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startGame={startGame}
          profit={profit}
          multiplier={multiplier}
          cashout={cashout}
          gameStarted={gameStarted}
          balance={balance}
        />
        <DragonGrid
          grid={grid}
          onTileClick={handleTileClick}
          currentRow={highlightRow}
          clickedBomb={clickedBomb}
          revealAllGems={revealAll}
          clickedTiles={clickedTiles}
        />
      </div>
    </div>
  );
}
