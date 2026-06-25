import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/TopNav.css';
import defaultUserImage from '../Assets/mikha.jpg';
import ProfileSettings from './ProfileSettings';
import { BiSearchAlt } from 'react-icons/bi';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import axios from 'axios';

const TopNav = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultUserImage);

  const username = localStorage.getItem('username') || 'User';
  const userId   = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'long',
    day:     'numeric',
    year:    'numeric',
  });

  useEffect(() => {
    if (!userId) return;
    axios.get(`/api/user/${userId}`)
      .then((res) => { if (res.data.picture) setProfileImage(res.data.picture); })
      .catch(() => {});
  }, [userId]);

  const handleSearchKey = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      navigate('/dashboard/explore');
      e.target.value = '';
    }
  };

  return (
    <div className="topNavContainer">
      <div className="headerSection">

        {/* Left — greeting */}
        <div className="navTitle">
          <h1>BulakApp</h1>
          <p>
            <span className="greetName">Hello, {username}</span>
            <span className="greetDate">{today}</span>
          </p>
        </div>

        {/* Center — search */}
        <div className="navSearch">
          <BiSearchAlt className="navSearchIcon" />
          <input
            type="text"
            placeholder="Search flowers…"
            onKeyDown={handleSearchKey}
          />
        </div>

        {/* Right — actions + avatar */}
        <div className="navActions">
          <div className="navIconBtn notifBtn">
            <MdOutlineNotificationsNone className="navIcon" />
            <span className="notifDot" />
          </div>

          <div className="navDivider" />

          <div
            className="navProfile"
            onClick={() => setIsProfileOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsProfileOpen(true)}
          >
            <div className="navAvatar">
              <img src={profileImage} alt="Profile" />
            </div>
            <div className="navUserInfo">
              <span className="navUsername">{username}</span>
              <span className="navRole">Member</span>
            </div>
          </div>
        </div>

      </div>

      <ProfileSettings isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default TopNav;
