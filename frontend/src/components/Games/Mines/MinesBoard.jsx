import React, { useEffect, useState } from 'react';
import { MinesTile } from './MinesTile';

function generateBoard(size, minesCount) {
  const total = size * size;
  const board = Array(total).fill('diamond');
  for (let i = 0; i < minesCount; i++) {
    let idx;
    do {
      idx = Math.floor(Math.random() * total);
    } while (board[idx] === 'mine');
    board[idx] = 'mine';
  }
  return board;
}

export function MinesBoard({ size, mines, onRevealDiamond, onHitMine, gameOver, gameStarted,clickedMineIndex,
    setClickedMineIndex }) {
    const [tiles, setTiles] = useState(Array(size * size).fill('hidden'));
    // const [clickedMineIndex, setClickedMineIndex] = useState(null);
    const [revealed, setRevealed] = useState(Array(size * size).fill(false));
  
    useEffect(() => {
      setTiles(generateBoard(size, mines));
      setRevealed(Array(size * size).fill(false));
    }, [size, mines, gameStarted]);
  

    useEffect(() => {
        if (gameOver) {
          const revealAll = (index = 0) => {
            if (index >= size * size) return;
      
            setRevealed(prev => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
      
            setTimeout(() => {
              revealAll(index + 1);
            }, 40); // Tempo fali (ms)
          };
      
          revealAll(); // Start
        }
      }, [gameOver, size]);
      
      
      

    // useEffect(() => {
    //     if (gameOver) {
    //       setRevealed(Array(size * size).fill(true));
    //     }
    //   }, [gameOver, size]);
      

    // const handleReveal = (index) => {
    //   if (revealed[index] || gameOver || !gameStarted) return;
    //   const updated = [...revealed];
    //   updated[index] = true;
    //   setRevealed(updated);
    //   if (tiles[index] === 'mine') onHitMine();
    //   else onRevealDiamond();
    // };
  
    const handleReveal = (index) => {
        if (revealed[index] || gameOver || !gameStarted) return;
        const updated = [...revealed];
        updated[index] = true;
        setRevealed(updated);
      
        if (tiles[index] === 'mine') {
          setClickedMineIndex(index); // zapisz indeks klikniętej miny
          onHitMine();
        } else {
          onRevealDiamond();
        }
      };
      

    return (
      <div className="mines-board" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {tiles.map((type, i) => (
            <MinesTile
                key={i}
                type={revealed[i] ? tiles[i] : 'hidden'}
                onClick={() => handleReveal(i)}
                isMineHit={tiles[i] === 'mine' && clickedMineIndex === i}
                />
        ))}
      </div>
    );
  }
  
  
