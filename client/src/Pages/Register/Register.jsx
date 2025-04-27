import React, { useState } from 'react';
import './Register.css';
import '../../App.css';
import video from '../../Assets/Flowers - Video Background HD 1080p.mp4';
import logo from '../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import Axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const createUser = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    if (picture) {
      formData.append('picture', picture);
    }

    Axios.post('https://problema-qjrc.onrender.com/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      setPopupMessage("Registration successful!");
      setShowPopup(true);

      // Clear the input fields after successful registration
      setEmail("");
      setUsername("");
      setPassword("");
      setPicture(null);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }).catch((err) => {
      console.error("Error creating user:", err);
      setPopupMessage("Error: Could not register.");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    });
  };

  return (
    <div className='registerPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className='title'>Snap, Learn, and Bloom!</h2>
            <p className='description'>Discover the Secrets of your Garden Today!</p>
          </div>

          <div className="footerDiv flex">
            <span className='text'>Already have an account?</span>
            <Link to={'/login'}>
              <button className='btn'>Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="" />
            <h3>Let Us Know You!</h3>
          </div>

          <button className="closeBtn" onClick={() => navigate('/')}>
            <AiOutlineSwapRight className="closeIcon" />
          </button>

          <form className='form grid' onSubmit={createUser}>
            <div className="inputDiv">
              {/* Email input */}
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon' />
                <input 
                  type="email" 
                  id="email" 
                  placeholder='Enter Email' 
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} 
                />
              </div>

              {/* Username input */}
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input 
                  type="text" 
                  id="username" 
                  placeholder='Enter Username' 
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)} 
                />
              </div>

              {/* Password input */}
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input 
                  type="password" 
                  id="password" 
                  placeholder='Enter Password' 
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)} 
                />
              </div>

              {/* Profile picture upload */}
              <label htmlFor="picture">Profile Picture</label>
              <div className="input flex">
                <input 
                  type="file" 
                  id="picture" 
                  accept="image/*"
                  onChange={(event) => setPicture(event.target.files[0])} 
                />
              </div>
            </div>

            <button type='submit' className='btn btnRegister flex'>
              <span>Register </span>
              <AiOutlineSwapRight className='icon' />
            </button>
          </form>

          {/* Popup message */}
          {showPopup && (
            <div className="popupMessage">
              <p>{popupMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
