import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To get the flower type id from URL
import axios from 'axios';
import './FlowerLists.css';  // Import the CSS for the styling

const FlowerLists = () => {
  const { flower_type_id } = useParams();  // Get flower type id from the URL
  const [flowers, setFlowers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch flowers based on the flower type
    axios.get(`http://localhost:3002/flowers?type=${flower_type_id}`) // Assuming the API endpoint supports querying by type
      .then((response) => {
        setFlowers(response.data);  // Set flowers data
      })
      .catch((err) => {
        setError('Error fetching flowers.');
        console.error(err);
      });
  }, [flower_type_id]);

  return (
    <div className="flower-lists-container">
      {error && <p className="error-message">{error}</p>}
      <h1>Flowers of Type {flower_type_id}</h1>  {/* Display the type */}
      
      {/* Search bar */}
      <div className="search-bar">
        <label htmlFor="search">Search bar: </label>
        <input type="text" id="search" />
      </div>

      <div className="flowers-grid">
        {flowers.map((flower, index) => (
          <div key={index} className="flower-card">
            <div className="flower-box">
              <img 
                src={flower.image_url}  // Assuming `image_url` is a field in `flowers`
                alt={flower.flower_name} 
                className="flower-image" 
              />
              <div className="heart-icon">❤️</div> {/* Placeholder heart icon */}
            </div>
            <p className="flower-name">{flower.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowerLists;
