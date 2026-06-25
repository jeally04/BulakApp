import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Favorite.css';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`/favorites/${userId}`)
        .then((res) => { setFavorites(res.data); setLoading(false); })
        .catch((err) => { console.error("Error fetching favorites:", err); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);
  };

  const handleRemove = async (e, flowerIdToRemove) => {
    e.stopPropagation();
    setRemoving(flowerIdToRemove);
    try {
      await axios.post('/favorites/remove', { user_id: userId, flower_id: flowerIdToRemove });
      setFavorites((prev) => prev.filter((f) => f.flower_id !== flowerIdToRemove));
    } catch (error) {
      console.error("Error removing favorite:", error);
    } finally {
      setRemoving(null);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="fav-state">
          <AiOutlineLoading3Quarters size={28} className="fav-spin" />
          <p>Loading favorites…</p>
        </div>
      );
    }

    if (favorites.length === 0) {
      return (
        <div className="fav-empty">
          <AiOutlineHeart size={48} className="fav-empty-icon" />
          <p className="fav-empty-title">No favorites yet</p>
          <p className="fav-empty-sub">Tap the heart icon on any flower page to save it here</p>
        </div>
      );
    }

    return (
      <div className="fav-grid">
        {favorites.map((flower) => (
          <div
            key={flower.id}
            className="fav-card"
            onClick={() => handleFlowerClick(flower.flower_id)}
          >
            <AiFillHeart className="fav-heart-icon" />
            <div className="fav-img-wrap">
              <img src={flower.image_url} alt={flower.flower_name} />
              <div className="fav-img-overlay">
                <button
                  className={`fav-remove-btn${removing === flower.flower_id ? " removing" : ""}`}
                  onClick={(e) => handleRemove(e, flower.flower_id)}
                  title="Remove from favorites"
                >
                  {removing === flower.flower_id
                    ? <AiOutlineLoading3Quarters size={14} className="fav-spin" />
                    : <MdDelete size={16} />}
                </button>
              </div>
            </div>
            <div className="fav-card-info">
              <h3 className="fav-name">{flower.flower_name}</h3>
              {flower.scientific_name && (
                <p className="fav-sci">{flower.scientific_name}</p>
              )}
              {flower.family && (
                <p className="fav-family">
                  <span className="fav-fam-tag">Family</span>
                  {flower.family}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fav-page">
      <div className="fav-section">
        <div className="fav-heading flex">
          <h1>
            My Favorites
            {!loading && favorites.length > 0 && (
              <span className="fav-count-badge">{favorites.length}</span>
            )}
          </h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Favorite;
