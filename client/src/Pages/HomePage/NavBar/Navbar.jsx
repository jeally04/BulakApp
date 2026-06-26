import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import logo from '../../../Assets/logo.png';
import menu_icon from '../../../Assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const Navbar = () => { 
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMobileMenu(false);
    }
  };

  useEffect(() => {
    if (mobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenu]);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className={`container1 ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt="Logo" className="logo" />
      
      <ul ref={menuRef} className={`nav-links ${mobileMenu ? 'mobile-menu' : ''}`}>
        <li><Link to="hero" smooth={true} offset={0} duration={500} onClick={() => setMobileMenu(false)}>Home</Link></li>
        <li><Link to="Recognition" smooth={true} offset={-260} duration={500} onClick={() => setMobileMenu(false)}>Recognition</Link></li>
        <li><Link to="programs" smooth={true} offset={-260} duration={500} onClick={() => setMobileMenu(false)}>Features</Link></li>
        <li><Link to="about" smooth={true} offset={-150} duration={500} onClick={() => setMobileMenu(false)}>About Us</Link></li>
        <li><Link to="testimonials" smooth={true} offset={-260} duration={500} onClick={() => setMobileMenu(false)}>Testimonials</Link></li>
        <li><Link to="contact" smooth={true} offset={-260} duration={500} onClick={() => setMobileMenu(false)}>Contact Us</Link></li>
        <li><Link to="contact" smooth={true} offset={-260} duration={500} className="btn1" onClick={handleLogin}>Login</Link></li>
      </ul>

      <img src={menu_icon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
