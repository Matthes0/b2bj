import React, { useEffect, useState, useRef } from 'react';
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

export function MinesBoard({ size, mines, onRevealDiamond, onHitMine, gameOver, gameStarted,
  clickedMineIndex, setClickedMineIndex, setIsAnimating }) {

  const [tiles, setTiles] = useState(Array(size * size).fill('hidden'));
  const [revealed, setRevealed] = useState(Array(size * size).fill(false));
  const timeouts = useRef([]); // ⬅️ PRZECHOWUJEMY timeouty

  useEffect(() => {
    // 🔁 Reset planszy
    setTiles(generateBoard(size, mines));
    setRevealed(Array(size * size).fill(false));
    setClickedMineIndex(null);

    // ❌ CZYSZCZENIE ANIMACJI
    timeouts.current.forEach(t => clearTimeout(t));
    timeouts.current = [];
  }, [size, mines, gameStarted]);

  useEffect(() => {
    if (gameOver) {
      setIsAnimating(true);
      const revealAll = [...Array(size * size).keys()];

      revealAll.forEach((tileIndex, delayIndex) => {
        const timeout = setTimeout(() => {
          setRevealed(prev => {
            const updated = [...prev];
            updated[tileIndex] = true;
            return updated;
          });

          // ⏱ Ostatni kafelek kończy animację
          if (delayIndex === revealAll.length - 1) {
            const end = setTimeout(() => setIsAnimating(false), 200);
            timeouts.current.push(end);
          }
        }, delayIndex * 50);

        timeouts.current.push(timeout); // 📌 zapisz timeout
      });
    }
  }, [gameOver, size, setIsAnimating]);

  const handleReveal = (index) => {
    if (revealed[index] || gameOver || !gameStarted) return;

    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);

    if (tiles[index] === 'mine') {
      setClickedMineIndex(index);
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
