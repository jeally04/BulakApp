import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaArrowLeft, FaSearch } from 'react-icons/fa';  // Import FaArrowLeft and FaSearch
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './AllFlowers.css';

const AllFlowers = () => {
  const [flowers, setFlowers] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');  // State for search input
  const navigate = useNavigate(); // Hook to navigate

  // Fetch all flowers from the backend
  useEffect(() => {
    axios.get('http://localhost:3002/flowers')
      .then((response) => {
        setFlowers(response.data);  // Set flowers data
      })
      .catch((err) => {
        setError('Error fetching flowers.');
        console.error(err);
      });
  }, []);

  // Handle flower click to navigate to Flower.jsx
  const handleFlowerClick = (flowerId) => {
    navigate(`/dashboard/flower/${flowerId}`); // Navigate to Flower.jsx with the flower id
  };

  // Handle back navigation
  const handleBackClick = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  // Filter flowers based on search query
  const filteredFlowers = flowers.filter(flower =>
    flower.flower_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="all-flowers-container">
      {/* Back button */}
      <div className="top-bar">
        <div className="back-button" onClick={handleBackClick}>
          <FaArrowLeft className="back-icon" /> {/* Back icon */}
          <span>Back</span>
        </div>

        {/* Search button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search flowers..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  // Update search query on change
          />
          <FaSearch className="search-icon" /> {/* Search icon */}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <h2>All Flowers</h2>

      <div className="flowers-scroll">
        {filteredFlowers.map((flower, index) => (
          <div 
            key={index} 
            className="flower-container1" 
            onClick={() => handleFlowerClick(flower.id)} // On click navigate to flower details page
          >
            <div className="flower-box">
              <FaRegHeart className="heart-icon iconn" />
              <img 
                src={flower.image_url}  // Assuming `image_url` is a field in `flowers`
                alt={flower.flower_name} 
                className="flower-image1" 
              />
            </div>
            <p className="flower-text">{flower.flower_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFlowers;
