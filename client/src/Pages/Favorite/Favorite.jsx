import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Favorite.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [allFlowers, setAllFlowers] = useState([]);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`https://problema-qjrc.onrender.com/favorites/${userId}`)
        .then((res) => setFavorites(res.data.map(f => f.flower_id)))
        .catch((err) => console.error("Error fetching favorites:", err));
    }

    axios.get('https://problema-qjrc.onrender.com/flowers')
      .then((res) => setAllFlowers(res.data))
      .catch((err) => console.error("Error fetching flowers:", err));
  }, [userId]);

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);
  };

  const handleToggleFavorite = (flowerId, e) => {
    e.stopPropagation(); // prevent clicking the flower card

    const isFavorite = favorites.includes(flowerId);
    const endpoint = isFavorite ? 'remove' : 'add';

    axios.post(`https://problema-qjrc.onrender.com/favorites/${endpoint}`, {
      user_id: userId,
      flower_id: flowerId
    })
      .then(() => {
        setFavorites(prev =>
          isFavorite ? prev.filter(id => id !== flowerId) : [...prev, flowerId]
        );
      })
      .catch(err => console.error(`Error toggling favorite:`, err));
  };

  return (
    <div className="favorite-page11">
      <h2>MY FAVORITES</h2>
      <div className="favorite-grid11">
        {allFlowers.length > 0 ? (
          allFlowers.map((flower) => (
            <div key={flower.id} className="favorite-item11" onClick={() => handleFlowerClick(flower.id)}>
              {
                favorites.includes(flower.id)
                  ? <AiFillHeart className="heart-icon11 filled" onClick={(e) => handleToggleFavorite(flower.id, e)} />
                  : <AiOutlineHeart className="heart-icon11" onClick={(e) => handleToggleFavorite(flower.id, e)} />
              }
              <img src={flower.image_url} alt={flower.flower_name} className="favorite-image11" />
              <div className="flower-name11">{flower.flower_name}</div>
            </div>
          ))
        ) : (
          <p>Loading flowers...</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
