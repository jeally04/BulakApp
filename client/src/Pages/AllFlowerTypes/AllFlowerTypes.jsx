import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AllFlowerTypes.css'; // Import the specific CSS file

const AllFlowerTypes = () => {
  const [flowerTypes, setFlowerTypes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  // Fetch all flower types from the backend
  useEffect(() => {
    axios.get('http://localhost:3002/flower-types')
      .then((response) => {
        setFlowerTypes(response.data);  
      })
      .catch((err) => {
        setError('Error fetching flower types.');
        console.error(err);
      });
  }, []);

  return (
    <div className="all-flower-types-container">
      {error && <p className="error-message">{error}</p>}

      <div className="top-bar">
        <div className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft className="back-icon" />
          <span>Back</span>
        </div>
        <h2>All Flower Types</h2>
      </div>

      <div className="flower-types-scroll">
        {flowerTypes.map((type, index) => (
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
  );
};

export default AllFlowerTypes;
