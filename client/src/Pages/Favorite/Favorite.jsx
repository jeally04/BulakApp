import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Favorite.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`/favorites/${userId}`)
        .then((response) => setFavorites(response.data))
        .catch((err) => console.error("Error fetching favorites:", err));
    }
  }, [userId]);

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);
  };

  return (
    <div className="favorite-page11">
      <h2>MY FAVORITES</h2>
      <div className="favorite-grid11">
        {favorites.length > 0 ? (
          favorites.map((flower) => (
            <div key={flower.id} className="favorite-item11" onClick={() => handleFlowerClick(flower.flower_id)}>
              <AiFillHeart className="heart-icon11" />
              <img src={flower.image_url} alt={flower.flower_name} className="favorite-image11" />
              <div className="flower-name11">{flower.flower_name}</div>
            </div>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
