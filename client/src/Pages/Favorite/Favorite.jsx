import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import './Favorite.css';

const Favorite = () => {
  const flowers = [
    { id: 1, name: 'FLOWER 1' },
    { id: 2, name: 'FLOWER 2' },
    { id: 3, name: 'FLOWER 3' },
    { id: 4, name: 'FLOWER 4' },
    { id: 5, name: 'FLOWER 5' },
    { id: 6, name: 'FLOWER 6' },
    { id: 7, name: 'FLOWER 7' },
    { id: 8, name: 'FLOWER 8' },
    { id: 9, name: 'FLOWER 9' },
    { id: 10, name: 'FLOWER 10' },
    { id: 11, name: 'FLOWER 11' },
    { id: 12, name: 'FLOWER 12' },
    { id: 13, name: 'FLOWER 13' },
    { id: 14, name: 'FLOWER 14' },
    { id: 15, name: 'FLOWER 15' },
    { id: 16, name: 'FLOWER 16' },
    { id: 17, name: 'FLOWER 17' },
    { id: 18, name: 'FLOWER 18' },
    { id: 19, name: 'FLOWER 19' },
  ];

  return (
    <div className="favorite-page">
      <h2>FAVORITE</h2>
      <div className="favorite-grid">
        {flowers.map((flower) => (
          <div key={flower.id} className="favorite-item">
            <AiFillHeart className="heart-icon" />
            <div className="flower-name">{flower.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
