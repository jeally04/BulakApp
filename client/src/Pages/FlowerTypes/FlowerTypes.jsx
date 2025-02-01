import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
//import './FlowerTypes.css';

const FlowerTypes = () => {
  const [flowerSubTypes, setFlowerSubTypes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { typeName } = useParams(); // Get type from URL parameters

  // Fetch flower sub-types based on the type
  useEffect(() => {
    axios.get(`http://localhost:3002/flower-types/${typeName}`)
      .then((response) => {
        setFlowerSubTypes(response.data);  // Set flower sub-types data
      })
      .catch((err) => {
        setError('Error fetching flower sub-types.');
        console.error(err);
      });
  }, [typeName]);

  return (
    <div className="flower-types-container">
      <div className="header">
        <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
        <h2>{typeName} Types</h2>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      <div className="flower-types-grid">
        {flowerSubTypes.map((subType, index) => (
          <div key={index} className="flower-type-item">
            <img 
              src={subType.img_url} 
              alt={subType.name} 
              className="flower-type-image" 
            />
            <p className="flower-type-label">{subType.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowerTypes;
