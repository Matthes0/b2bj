import React from "react";

export function BetOptions({ selectedOption, setSelectedOption, chances }) {
  return (
    <div className="bet-options">
      <button 
        className={selectedOption === 'higher' ? "selected" : ""}
        onClick={() => setSelectedOption('higher')}
      >
        Higher ({chances.higher}%)
      </button>
      <button 
        className={selectedOption === 'same' ? "selected" : ""}
        onClick={() => setSelectedOption('same')}
      >
        Same ({chances.same}%)
      </button>
      <button 
        className={selectedOption === 'lower' ? "selected" : ""}
        onClick={() => setSelectedOption('lower')}
      >
        Lower ({chances.lower}%)
      </button>
    </div>
  );
}
