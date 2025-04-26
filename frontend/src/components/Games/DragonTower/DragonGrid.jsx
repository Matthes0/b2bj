import React from 'react';
import { Tile } from './Tile';

export function DragonGrid({ grid, onTileClick, currentRow, clickedBomb, revealAllGems, clickedTiles }) {
  return (
    <div
      className="dragon-grid"
      style={{
        gridTemplateColumns: `repeat(${grid[0]?.length || 4}, 1fr)`
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            value={tile}
            onClick={() => onTileClick(rowIndex, colIndex)}
            highlight={rowIndex === currentRow}
            clickedBomb={clickedBomb}
            revealAllGems={revealAllGems}
            clickedTiles={clickedTiles}
            row={rowIndex}
            col={colIndex}
          />
        ))
      )}
    </div>
  );
}
