import React, { useState } from 'react';
import './Register.css';
import '../../App.css';
import video from '../../Assets/Flowers - Video Background HD 1080p.mp4';
import logo from '../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const showNotification = (message, success) => {
    setPopupMessage(message);
    setIsSuccess(success);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.post('/register', { email, username, password });
      setEmail("");
      setUsername("");
      setPassword("");
      showNotification("Registration successful! You can now log in.", true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error("Error creating user:", err);
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      showNotification(msg, false);
    } finally {
      setLoading(false);
    }
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
          <button className="closeBtn" onClick={() => navigate('/')}>
            <IoClose className="closeIcon" />
          </button>

          <div className="headerDiv">
            <img src={logo} alt="BulakApp logo" />
            <h3>Let Us Know You!</h3>
          </div>

          <form className='form grid' onSubmit={createUser}>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon' />
                <input
                  type="email"
                  id="email"
                  placeholder='Enter your email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input
                  type="text"
                  id="username"
                  placeholder='Choose a username'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder='Create a password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="togglePassword"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type='submit' className='btn btnRegister flex' disabled={loading}>
              {loading ? "Creating account…" : <><span>Create Account</span><AiOutlineSwapRight className='icon' /></>}
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className={`popupMessage ${isSuccess ? '' : 'error'}`}>
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Register;
