import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Recognition.css";
import desktopimg from '../../../Assets/desktopR.png';
import phoneimg from '../../../Assets/phoneR.png';
import tabletimg from '../../../Assets/tabletR.png';

const images = [
  { src: desktopimg, alt: "Desktop Experience", className: "desktop-image" },
  { src: tabletimg, alt: "Tablet Experience", className: "tablet-image" },
  { src: phoneimg, alt: "Mobile Experience", className: "phone-image" }
];

const Recognition = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="container4">
      <div className="slider4">
        <button className="prev-btn4" onClick={prevSlide}>&#10094;</button>
        <div className="image-card4">
          <img src={images[currentIndex].src} alt={images[currentIndex].alt} className={`gallery-image4 ${images[currentIndex].className}`} />
          <p>{images[currentIndex].alt}</p>
        </div>
        <button className="next-btn4" onClick={nextSlide}>&#10095;</button>
      </div>
      
      <div className="dots">
        {images.map((_, index) => (
          <span key={index} className={`dot ${index === currentIndex ? "active" : ""}`} onClick={() => setCurrentIndex(index)}></span>
        ))}
      </div>
      
      <div className="content4">
        <h1 className="title4">Experience Seamless Flower Recognition</h1>
        <p className="description4">Try our AI-powered flower detection on any device.</p>
        <button className="try-btn4" onClick={() => navigate("/login")}>Try for Free</button>
      </div>
    </div>
  );
}

export default Recognition;