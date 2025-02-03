import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import { FaArrowLeft, FaHeart } from 'react-icons/fa'; // React Icons for back and heart
import './Styles/Flower.css'; // Importing the updated CSS

const Flower = () => {
  const { id } = useParams(); 
  const [flower, setFlower] = useState(null);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Create a navigate instance for going back

  useEffect(() => {
    axios.get(`http://localhost:3002/flower/${id}`)
      .then((response) => {
        setFlower(response.data);
      })
      .catch((err) => {
        setError('Error fetching flower data.');
        console.error(err);
      });
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="flower-page">
      {flower ? (
        <>
          {/* Fixed Header with icons */}
          <div className="header">
            {/* Add onClick event to navigate back */}
            <FaArrowLeft className="icon-back" onClick={() => navigate(-1)} />
            <FaHeart className="icon-favorite" />
          </div>

          {/* First section with image and basic details */}
          <div className="flower-section" id="section-1">
            <div className="flower-image-container">
              <img className="flower-image" src={flower.image_url} alt={flower.flower_name} />
            </div>
            <div className="flower-info">
              <h1 className="flower-name">{flower.flower_name}</h1>
              <p className="flower-family"><strong>Family:</strong> {flower.family}</p>
              <p className="flower-aka"><strong>Also known as:</strong> {flower.other_names}</p>
              <p className="flower-scientific"><strong>Scientific Name:</strong> <i>{flower.scientific_name}</i></p>
            </div>
          </div>

          {/* Second section for characteristics */}
          <div className="flower-section" id="section-2">
            <h2 className="section-title">Characteristics</h2>
            <div className="flower-details1">
              <p><strong>Life Span:</strong> {flower.lifespan}</p>
              <p><strong>Flower Size:</strong> {flower.flower_size}</p>
              <p><strong>Bloom Time:</strong> {flower.bloom_time}</p>
              <p><strong>Flower Color:</strong> {flower.flower_color}</p>
            </div>
          </div>

          {/* Description section */}
          <div className="flower-section" id="section-3">
            <h2 className="section-title">Description</h2>
            <p className="flower-description">{flower.description}</p>
          </div>

          {/* Additional sections for symbolism, garden use, interesting facts */}
          <div className="flower-section" id="section-4">
            <h2 className="section-title">Symbolism</h2>
            <p>{flower.symbolism}</p>

            <h2 className="section-title">Garden Use</h2>
            <p>{flower.garden_use}</p>

            <h2 className="section-title">Interesting Facts</h2>
            <p>{flower.interesting_facts}</p>

            <h2 className="section-title">Name Story</h2>
            <p>{flower.name_story}</p>

            <h2 className='section-title'>Uses on Events</h2>
            <p>{flower.uses_on_events}</p>
          </div>
        </>
      ) : (
        <p className="loading-message">Loading flower data...</p>
      )}
    </div>
  );
};

export default Flower;
