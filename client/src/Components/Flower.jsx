import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import './Styles/Flower.css';

const Flower = () => {
  const { id } = useParams();
  const [flower, setFlower] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    axios.get(`/flower/${id}`)
      .then((response) => setFlower(response.data))
      .catch((err) => {
        setError('Error fetching flower data.');
        console.error(err);
      });

    if (userId) {
      axios.get(`/favorites/${userId}`)
        .then((response) => {
          const favoriteIds = response.data.map(fav => fav.flower_id);
          setIsFavorite(favoriteIds.includes(parseInt(id)));
        })
        .catch((err) => console.error("Error fetching favorites:", err));
    }
  }, [id, userId]);

  const toggleFavorite = async () => {
    if (!userId) { alert("Please log in to save favorites."); return; }
    const url = isFavorite ? "/favorites/remove" : "/favorites/add";
    try {
      await axios.post(url, { user_id: userId, flower_id: id });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="flower-page">
      {flower ? (
        <>
          {/* Sticky header */}
          <div className="header">
            <FaArrowLeft className="icon-back" onClick={() => navigate(-1)} />
            <FaHeart className={`icon-favorite ${isFavorite ? 'favorite' : ''}`} onClick={toggleFavorite} />
          </div>

          {/* Image + identity */}
          <div className="flower-section" id="section-1">
            <div className="flower-image-container">
              <img className="flower-image" src={flower.image_url} alt={flower.flower_name} />
            </div>
            <div className="flower-info">
              <h1 className="flower-name">{flower.flower_name}</h1>
              <p className="flower-scientific"><i>{flower.scientific_name}</i></p>
              <div className="flower-meta">
                {flower.family && (
                  <span className="flower-meta-item">
                    <span className="meta-label">Family</span>
                    <span className="meta-value">{flower.family}</span>
                  </span>
                )}
                {flower.other_names && (
                  <span className="flower-meta-item">
                    <span className="meta-label">Also known as</span>
                    <span className="meta-value">{flower.other_names}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="flower-section" id="section-2">
            <h2 className="section-title">Characteristics</h2>
            <div className="char-grid">
              {flower.lifespan && (
                <div className="char-item">
                  <span className="char-label">Life Span</span>
                  <span className="char-value">{flower.lifespan}</span>
                </div>
              )}
              {flower.flower_size && (
                <div className="char-item">
                  <span className="char-label">Flower Size</span>
                  <span className="char-value">{flower.flower_size}</span>
                </div>
              )}
              {flower.bloom_time && (
                <div className="char-item">
                  <span className="char-label">Bloom Time</span>
                  <span className="char-value">{flower.bloom_time}</span>
                </div>
              )}
              {flower.flower_color && (
                <div className="char-item">
                  <span className="char-label">Flower Color</span>
                  <span className="char-value">{flower.flower_color}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flower-section" id="section-3">
            <h2 className="section-title">Description</h2>
            <p className="flower-description">{flower.description}</p>
          </div>

          {/* Extra details */}
          <div className="flower-section" id="section-4">
            {[
              { title: 'Symbolism',         content: flower.symbolism },
              { title: 'Garden Use',        content: flower.garden_use },
              { title: 'Interesting Facts', content: flower.interesting_facts },
              { title: 'Name Story',        content: flower.name_story },
              { title: 'Uses on Events',    content: flower.uses_on_events },
            ].filter(s => s.content).map((s) => (
              <div className="detail-block" key={s.title}>
                <h2 className="section-title">{s.title}</h2>
                <p className="detail-text">{s.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="loading-message">Loading flower data...</p>
      )}
    </div>
  );
};

export default Flower;
