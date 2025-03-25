import React, { useState } from 'react';
import Navbar from './NavBar/Navbar';
import Hero from './Hero/Hero';
import Recognition from './RecognitionPage/Recognition';
import Features from './Features/Features'; // Fixed the import name for consistency
import Title from './Title/Title';
import About from './About/About';
import Testimonials from './Testimonials/Testimonials';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import './HomePage.css';

const HomePage = () => {
  // State to control video play state
  const [playState, setPlayState] = useState(false);

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="container1">
        {/* <a href="#" class="btn1">Default Button</a>
        <a href="#" class="btn1 dark-btn">Dark Button</a> */}
        {/* Flower Recognition Section */}
      
        <Recognition />

        {/* Features Section */}
        <Title subTitle="Features" title="What We Offer" />
        <Features />

        {/* About Section */}
        <About setPlayState={setPlayState} />

        {/* Testimonials Section */}
        <Title subTitle="Testimonials" title="What Users Say" />
        <Testimonials />

        {/* Contact Section */}
        <Title subTitle="Contact Us" title="Get in Touch" />
        <Contact />

        {/* Footer Section */}
        <Footer />
      </div>

      {/* Video Player */}
      <VideoPlayer playState={playState} setPlayState={setPlayState} />
    </div>
  );
};

export default HomePage;
