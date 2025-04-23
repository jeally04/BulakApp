import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Favorite.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect if user ID is missing
      return;
    }

    // Make sure the backend URL is correct
    axios.get(`http://problema-qjrc.onrender.com/favorites/${userId}`)
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
  }, [userId, navigate]);

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);  // Navigate to the flower detail page
  };

  return (
    <div className="favorite-page11">
      <h2>MY FAVORITES</h2>
      <div className="favorite-grid11">
        {loading ? (
          <p>Loading...</p>  // Loading state
        ) : error ? (
          <p className="error-message">{error}</p>  // Error message if fetching fails
        ) : favorites.length > 0 ? (
          favorites.map((flower) => (
            <div 
              key={flower.id} 
              className="favorite-item11" 
              onClick={() => handleFlowerClick(flower.flower_id)}  // Flower click handling
            >
              <AiFillHeart className="heart-icon11" />
              <img src={flower.image_url} alt={flower.flower_name} className="favorite-image11" />
              <div className="flower-name11">{flower.flower_name}</div>
            </div>
          ))
        ) : (
          <p>No favorites yet.</p>  // No favorites message
        )}
      </div>
    </div>
  );
};

export default Favorite;
