import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/ProfileSettings.css";
import defaultUserImage from "../Assets/mikha.jpg";
import { FaEye, FaEyeSlash, FaEdit, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileSettings = ({ isOpen, onClose }) => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultUserImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Fetch user data when modal opens
  useEffect(() => {
    if (!userId) {
      setMessage("User ID not found! Please log in.");
      return;
    }

    axios
      .get(`https://problema-qjrc.onrender.com/api/user/${userId}`)
      .then((response) => {
        const userData = response.data;
        setEmail(userData.email || "");
        setUsername(userData.username || "");

        if (userData.picture) {
          setProfileImage(userData.picture);
        } else {
          setProfileImage(defaultUserImage);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setMessage("Failed to load profile.");
      });
  }, [userId]);

  // Handle Image Change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Save Changes
  const handleSaveChanges = async () => {
    if (!userId) {
      setMessage("User not found! Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    if (password) formData.append("password", password);
    if (selectedFile) formData.append("profileImage", selectedFile);

    try {
      const response = await axios.put(
        `http://problema-qjrc.onrender.com/api/update-profile/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(response.data.message || "Profile updated successfully!");
      setPassword("");
      setSelectedFile(null);

      if (response.data.newImageUrl) {
        setProfileImage(response.data.newImageUrl);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setUserId(null);
    alert("Logged out successfully!");
    navigate("/");
  };

  return isOpen ? (
    <div className="profileModal">
      <div className="modalContent">
        <h2>Edit Profile</h2>

        {/* Profile Image */}
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
            style={{ display: "none" }}
          />
        </div>

        {/* Email Input */}
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        {/* Username Input */}
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        {/* Password Input */}
        <label>New Password:</label>
        <div className="passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="togglePassword" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Message */}
        {message && <p className="message">{message}</p>}

        {/* Buttons */}
        <div className="buttonGroup">
          <button className="saveBtn" onClick={handleSaveChanges}>Save Changes</button>
          <button className="logoutBtn" onClick={handleLogout}>Logout</button>
          <button className="closeBtn" onClick={onClose}><FaTimes className="closeIcon" /></button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfileSettings;
