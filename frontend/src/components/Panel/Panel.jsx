import React from 'react';

export function Panel({ isPanelOpen, closePanel }) {
  if (!isPanelOpen) return null;

  return (
    <div className="overlay" onClick={closePanel}>
      <div className="panel" onClick={function (e) { e.stopPropagation(); }}>
        <h2>Panel Content</h2>
        <button onClick={closePanel}>Close Panel</button>
      </div>
    </div>
  );
}


