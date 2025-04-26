import React from 'react';
import deathImg from "../../../assets/DragonTower/death.png";
import dragonEggImg from "../../../assets/DragonTower/creature.png";

export function Tile({ value, onClick, highlight, clickedBomb, revealAllGems, row, col, clickedTiles }) {
  const wasClicked = clickedTiles?.some(tile => tile.row === row && tile.col === col);
  const isClickedBomb = clickedBomb && clickedBomb.row === row && clickedBomb.col === col;

  let tileClass = "tile";

  if (highlight) {
    tileClass += " tile-highlight";
  }

  if (revealAllGems) {
    if (!wasClicked && !(clickedBomb?.row === row && clickedBomb?.col === col)) {
      tileClass += " tile-faded"; // Wyszarzamy NIEkliknięte
    }
    if (value === 'bomb' && isClickedBomb) {
      tileClass += " tile-bomb-hit"; // Kliknięta bomba ma mocne czerwone tło
    }
  }

  const shouldShowImage = revealAllGems || wasClicked || isClickedBomb;

  return (
    <div className={tileClass} onClick={onClick}>
      {shouldShowImage && value === 'gemstone' && <img src={dragonEggImg} alt="Gemstone" />}
      {shouldShowImage && value === 'bomb' && (
        <img
          src={deathImg}
          alt="Bomb"
          style={{ backgroundColor: isClickedBomb ? 'red' : 'transparent', borderRadius: '5px' }}
        />
      )}
    </div>
  );
}
