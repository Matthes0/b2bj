import React from 'react';
import diamondImg from '../../../assets/gemstone.png';
import bombImg from '../../../assets/bomb.png';

export function MinesTile({ type, onClick, isMineHit }) {
  let content = '?';
  if (type === 'diamond') content = <img src={diamondImg} alt="Diamond" />;
  if (type === 'mine') content = <img src={bombImg} alt="Mine" />;

  return (
    <div
      className={`tile ${type} ${isMineHit ? 'mine-hit' : ''}`}
      onClick={onClick}
    >
      {type === 'hidden' ? '?' : content}
    </div>
  );
}
