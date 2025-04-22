// import React from 'react';
// import "./Panel.css"



// export function Panel({ isPanelOpen, closePanel }) {
//   if (!isPanelOpen) return null;

//   return (
//     <div className="overlay" onClick={closePanel}>
//       <div className="panel" onClick={function (e) { e.stopPropagation(); }}>
//         <h2>Panel Content</h2>
//         <button onClick={closePanel}>Close Panel</button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import './Panel.css';

export function Panel({ isPanelOpen, closePanel }) {
  if (!isPanelOpen) return null;

  return (
    <div className="overlay" onClick={closePanel}>
      <div className="wallet-popup" onClick={(e) => e.stopPropagation()}>
        <h3>Portfel (tu pojawi się zawartość)</h3>
      </div>
    </div>
  );
}
