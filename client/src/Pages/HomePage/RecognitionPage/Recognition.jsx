import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Monitor, Tablet, Smartphone, Layers, Zap, Gift, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import "./Recognition.css";
import desktopimg from '../../../Assets/desktopR.png';
import phoneimg from '../../../Assets/phoneR.png';
import tabletimg from '../../../Assets/tabletR.png';

const images = [
  { src: desktopimg, alt: "Desktop Experience", className: "desktop-image", Icon: Monitor, label: "Desktop" },
  { src: tabletimg, alt: "Tablet Experience", className: "tablet-image", Icon: Tablet, label: "Tablet" },
  { src: phoneimg, alt: "Mobile Experience", className: "phone-image", Icon: Smartphone, label: "Mobile" },
];

const features = [
  {
    Icon: Layers,
    text: "Multi-flower detection",
    detail: "Scan a bouquet or arrangement and identify every flower in a single shot.",
  },
  {
    Icon: Zap,
    text: "Real-time AI recognition",
    detail: "Get instant results in seconds — no waiting, no manual searching.",
  },
  {
    Icon: Gift,
    text: "Event flower guide",
    detail: "Discover which flowers suit weddings, birthdays, anniversaries, and gifts.",
  },
];

const Recognition = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index, dir = 'next') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimating(false);
    }, 350);
  }, [animating]);

  const nextSlide = useCallback(() => {
    goTo((currentIndex + 1) % images.length, 'next');
  }, [currentIndex, goTo]);

  const prevSlide = useCallback(() => {
    goTo((currentIndex - 1 + images.length) % images.length, 'prev');
  }, [currentIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const current = images[currentIndex];

  return (
    <section className="recognition-section">
      <div className="recognition-inner">

        {/* Left: Content */}
        <div className="recognition-content">
          <span className="recognition-badge">AI-Powered</span>
          <h2 className="recognition-title">
            Experience Seamless<br />
            <span className="recognition-title-accent">Flower Recognition</span>
          </h2>
          <p className="recognition-desc">
            Our intelligent detection engine works across every device, giving you instant,
            accurate results wherever you are.
          </p>

          <ul className="recognition-features">
            {features.map(({ Icon, text, detail }, i) => (
              <li key={i} className="recognition-feature-item">
                <span className="feature-icon"><Icon size={18} strokeWidth={2} /></span>
                <span className="feature-text">
                  <strong>{text}</strong>
                  <span className="feature-detail">{detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <button className="recognition-cta" onClick={() => navigate("/login")}>
            Try for Free
            <ArrowRight size={18} strokeWidth={2.5} className="cta-arrow" />
          </button>
        </div>

        {/* Right: Slider */}
        <div
          className="recognition-slider-area"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="slider-device-tabs">
            {images.map(({ Icon, label }, i) => (
              <button
                key={i}
                className={`device-tab ${i === currentIndex ? 'device-tab-active' : ''}`}
                onClick={() => goTo(i, i > currentIndex ? 'next' : 'prev')}
              >
                <Icon size={14} strokeWidth={2} />
                {label}
              </button>
            ))}
          </div>

          <div className="slider-card">
            <button className="slider-nav slider-nav-prev" onClick={prevSlide} aria-label="Previous">
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <div className={`slider-image-wrap ${animating ? `slide-out-${direction}` : 'slide-in'}`}>
              <img
                src={current.src}
                alt={current.alt}
                className={`slider-img ${current.className}`}
              />
            </div>

            <button className="slider-nav slider-nav-next" onClick={nextSlide} aria-label="Next">
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="slider-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`slider-dot ${i === currentIndex ? 'slider-dot-active' : ''}`}
                onClick={() => goTo(i, i > currentIndex ? 'next' : 'prev')}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Recognition;
