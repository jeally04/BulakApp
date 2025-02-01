import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/ProfileSettings.css';
import defaultUserImage from '../Assets/mikha.jpg';
import { FaEye, FaEyeSlash, FaCamera, FaEdit, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const ProfileSettings = ({ isOpen, onClose, userId: propUserId }) => {
  const [userId, setUserId] = useState(propUserId || localStorage.getItem('userId'));
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultUserImage);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    axios.get(`http://localhost:3002/api/user/${userId}`)
      .then((response) => {
        const userData = response.data;
        setEmail(userData.email || '');
        setUsername(userData.username || '');
        setProfileImage(userData.picture ? `http://localhost:3002/uploads/${userData.picture}` : defaultUserImage);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    if (password) {
      formData.append('password', password);
    }
    if (selectedFile) {
      formData.append('profileImage', selectedFile);
    }

    try {
      await axios.put(`http://localhost:3002/api/update-profile/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    alert('Logged out successfully!');
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    isOpen && userId ? (
      <div className="profileModal">
        <div className="modalContent">
          <h2>Edit Profile</h2>

          {/* Profile Image with Edit Icon */}
          <div className="profileImageContainer">
            <img src={profileImage} alt="Profile" />
            <label htmlFor="profile-image-input">
              <FaEdit className="editIcon" />
            </label>
            <input 
              type="file" 
              id="profile-image-input"
              accept="image/*" 
              onChange={handleImageChange}
              style={{ display: 'none' }} // Hide default file input
            />
          </div>

          {/* Email Input */}
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Username Input */}
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password Input with Visibility Toggle */}
          <label>New Password:</label>
          <div className="passwordContainer">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> 
            <button
               type="button"
               className="togglePassword"
               onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Buttons */}
          <div className="buttonGroup">
            <button className="saveBtn" onClick={handleSaveChanges}>Save Changes</button>
            <button className="logoutBtn" onClick={handleLogout}>Logout</button>
            {/* Close Button with React Icon */}
            <button className="closeBtn" onClick={onClose}>
              <FaTimes className="closeIcon" />
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default ProfileSettings;
