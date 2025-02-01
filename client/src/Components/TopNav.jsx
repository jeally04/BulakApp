import React, { useState } from 'react';
import './Styles/TopNav.css';
import userImage from '../Assets/mikha.jpg';
import ProfileSettings from './ProfileSettings';
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { MdOutlineNotificationsNone } from 'react-icons/md';

const TopNav = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="topNavContainer">
      <div className="headerSection">
        <div className="title">
          <h1>Welcome to BulakApp</h1>
          <p>Hello Jeal, Welcome Back!</p>
        </div>

        <div className="searchBar">
          <input type="text" placeholder="Search Dashboard" />
          <BiSearchAlt className="icon" />
        </div>

        <div className="profileDiv flex">
          <TbMessageCircle className="icon" />
          <MdOutlineNotificationsNone className="icon" />
          <div className="profileImage" onClick={() => setIsProfileOpen(true)}>
            <img src={userImage} alt="Profile" />
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      <ProfileSettings isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default TopNav;
