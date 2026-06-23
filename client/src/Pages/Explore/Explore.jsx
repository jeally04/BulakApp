import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Explore.css';

const Explore = () => {
  const [flowerTypes, setFlowerTypes] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch data from the backend
  useEffect(() => {
    axios.get('/flower-types')
      .then((response) => setFlowerTypes(response.data))
      .catch((err) => {
        setError('Error fetching flower types.');
        console.error(err);
      });

    axios.get('/flowers')
      .then((response) => setFlowers(response.data))
      .catch((err) => {
        setError('Error fetching flowers.');
        console.error(err);
      });
  }, []);

  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`);
  };

  const handleSeeAllFlowers = () => {
    navigate('/dashboard/all-flowers');
  };

  const handleSeeAllFlowerTypes = () => {
    navigate('/dashboard/all-flower-types');
  };

  return (
    <div className="explore-container">
      {error && <p className="error-message">{error}</p>}

      {/* Section 1: Flower Types */}
      <h2>EXPLORE</h2>
      <div className="section">
        <div className="section-header">
          <h2>Discover different types of flowers in the Philippines</h2>
          <button className="see-all" onClick={handleSeeAllFlowerTypes}>
            See all
          </button>
        </div>
        <div className="flower-types-scroll">
          {flowerTypes.slice(0, 5).map((type, index) => (
            <div key={index} className="flower-type-container">
              <div className="flower-type-box">
                <img 
                  src={type.imgs} 
                  alt={type.type_name} 
                  className="flower-image1" 
                />
              </div>
              <p className="flower-text">{type.type_name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Flowers */}
      <div className="section">
        <div className="section-header">
          <h2>Discover flowers in the Philippines</h2>
          <button className="see-all" onClick={handleSeeAllFlowers}>
            See all
          </button>
        </div>
        <div className="flowers-scroll">
          {flowers.slice(0, 5).map((flower, index) => (
            <div 
              key={index} 
              className="flower-type-container" 
              onClick={() => handleFlowerClick(flower.id)}
            >
              <div className="flower-type-box">
                {/* <FaRegHeart className="heart-icon iconn" /> */}
                <img 
                  src={flower.image_url}
                  alt={flower.flower_name}
                  className="flower-image1"
                />
              </div>
              <p className="flower-text">{flower.flower_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
