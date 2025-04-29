import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Favorite.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("user_id"), 10);

    if (!storedUserId || isNaN(storedUserId)) {
      navigate("/login"); // Redirect if user ID is missing or invalid
      return;
    }

    axios.get(`https://problema-qjrc.onrender.com/favorites/${storedUserId}`)
      .then((response) => {
        setFavorites(response.data);  // Set favorites data
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites.");  // Error handling
      })
      .finally(() => {
        setLoading(false);  // Set loading state to false after fetching
      });
  }, [navigate]);

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);  // Navigate to the flower detail page
  };

  return (
    <div className="favorite-page11">
      <h2>MY FAVORITES</h2>
      <div className="favorite-grid11">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : favorites.length > 0 ? (
          favorites.map((flower) => (
            <div 
              key={flower.flower_id} 
              className="favorite-item11" 
              onClick={() => handleFlowerClick(flower.flower_id)}
            >
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
