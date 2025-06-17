import React from 'react';
import './Help.css';
export function Regulamin() {
  return (
    <div className="help-page">
      <h1>Regulamin</h1>
      <div className="help-content">
        <h2>Zasady korzystania z serwisu:</h2>
        <ol>
          <li>Zakaz oszukiwania</li>
          <li>Minimalny wiek: 18 lat</li>
          <li>Gra na własną odpowiedzialność</li>
        </ol>
      </div>
    </div>
  );
}