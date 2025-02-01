import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../../Assets/logo.png';
import menu_icon from '../../../Assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Navbar = () => { 
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  // Function to handle login button click
  const handleLogin = () => {
    navigate('/login'); // Navigate to login page
  };

   return (
   <nav className={`container1 ${sticky? 'dark-nav' : ''}`}>
      <img src={logo} alt="" className='logo' /> 
      {/* <h3>Bohol Island State University</h3> */}
      <ul className={mobileMenu?'':'hide-mobile-menu'}>
         <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
         <li><Link to='Recognition' smooth={true} offset={-260} duration={500}>Recognition</Link></li>
         <li><Link to='programs' smooth={true} offset={-260} duration={500}>Features</Link></li>
         <li><Link to='about' smooth={true} offset={-150} duration={500}>About Us</Link></li>
         {/* <li><Link to='campus' smooth={true} offset={-260} duration={500}>Campus</Link></li> */}
         <li><Link to='testimonials' smooth={true} offset={-260} duration={500}>Testimonials</Link></li>
         <li><Link to='contact' smooth={true} offset={-260} duration={500} >Contact Us</Link></li>
         <li><Link to='contact' smooth={true} offset={-260} duration={500} className='btn1' onClick={handleLogin}>Login</Link></li>
         
      </ul>
      <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu}/>
   </nav>
   )
}

export default Navbar