import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Styles/Sidebar.css';
import logo from '../Assets/logo.png';
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdExplore, MdOutlineCamera, MdOutlineFavoriteBorder } from "react-icons/md";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef(null); 

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar only on smaller screens
  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  // Close sidebar when clicking outside (only for mobile view)
  const handleClickOutside = (event) => {
    if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  return (
    <>
      {/* Hamburger Button (Visible on smaller screens) */}
      {isMobile && (
        <div className="hamburger" onClick={toggleSidebar}>
          {isOpen ? <FaTimes className="close-icon" /> : <FaBars className="hamburger-icon" />}
        </div>
      )}

      {/* Sidebar Menu */}
      <div 
        ref={sidebarRef} 
        className={`sideBar ${isOpen || !isMobile ? 'open' : 'closed'}`}
      >
        <div className="logoDiv1 flex">
          <img src={logo} alt="BulakAPP Logo" className="logo" />
          <h2>BulakAPP</h2>
        </div>

        {/* Quick Menu Section */}
        <div className="menuDiv">
          <ul className="menuLists grid">
            <li className="listItem">
              <NavLink to="/dashboard/dashbody" className={({ isActive }) => isActive ? "menuLink activeLink flex" : "menuLink flex"}>
                <IoSpeedometerOutline className="icon" />
                <span className="smallText">Dashboard</span>
              </NavLink>
            </li>
            <li className="listItem">
              <NavLink to="/dashboard/recognition" className={({ isActive }) => isActive ? "menuLink activeLink flex" : "menuLink flex"}>
                <MdOutlineCamera className="icon" />
                <span className="smallText">Recognition</span>
              </NavLink>
            </li>
            <li className="listItem">
              <NavLink to="/dashboard/explore" className={({ isActive }) => isActive ? "menuLink activeLink flex" : "menuLink flex"}>
                <MdExplore className="icon" />
                <span className="smallText">Explore</span>
              </NavLink>
            </li>
            <li className="listItem"> 
              <NavLink to="/dashboard/favorite" className={({ isActive }) => isActive ? "menuLink activeLink flex" : "menuLink flex"}>
                <MdOutlineFavoriteBorder className="icon" />
                <span className="smallText">Favorite</span>
              </NavLink>
            </li>
            <li className="listItem">
              <NavLink to="/dashboard/history" className={({ isActive }) => isActive ? "menuLink activeLink flex" : "menuLink flex"}>
                <GiPlantsAndAnimals className="icon" />
                <span className="smallText">History</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Help Center Section */}
        <div className="sideBarCard">
          <BsQuestionCircle className="icon" />
          <div className="cardContent">
            <h3>Help Center</h3>
            <p>Having trouble in BulakAPP? Please contact us for more questions.</p>
            <button className="btn">Go to help center</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
