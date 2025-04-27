import React from "react";
import { BetPanel } from "./BetPanel";
import { GameBoard } from "./GameBoard";
import { History } from "./History";
import { useHiloGame } from "./useHiloGame";
import "./hilo.css";

export function HiloGame() {
  const game = useHiloGame();

  return (
    <div className="hilo-wrapper">
      <div className="hilo-grid">
        <div className="hilo-left">
          <BetPanel game={game} />
        </div>
        <div className="hilo-center">
          <GameBoard game={game} />
          <History history={game.history} />
        </div>
      </div>
    </div>
  );
}
