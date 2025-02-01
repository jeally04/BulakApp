import React, { useState } from 'react';
import './Login.css';
import video from '../../Assets/Flowers - Video Background HD 1080p.mp4';
import logo from '../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { IoClose } from "react-icons/io5"; // Import IoClose from react-icons
import Axios from 'axios';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3002/login', {
      loginEmail,
      loginPassword
    })
    .then((response) => {
      if (response.data.success) {
        // Save userId to localStorage
        localStorage.setItem('userId', response.data.userId);
        setLoginStatus("Login successful!");
        navigate('/dashboard'); // Redirect on success
      } else {
        setLoginStatus("Invalid email or password");
      }
    })
    .catch((error) => {
      console.error("There was an error logging in:", error);
      setLoginStatus("An error occurred. Please try again.");
    });
  };

  return (
    <div className='loginPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className='title'>Snap, Learn, and Bloom!</h2>
            <p className='description'>Discover the Secrets of your Garden Today!</p>
          </div>

          <div className="footerDiv flex">
            <span className='text'>Don't have an account?</span>
            <Link to={'/register'}>
              <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>Welcome Back!</h3>
          </div>

          {/* Close button */}
          <button className="closeBtn" onClick={() => navigate('/')}>
            <IoClose className="closeIcon" />
          </button>

          <form className='form grid' onSubmit={handleLogin}>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaEnvelope className='icon' />
                <input 
                  type="email" 
                  id="email" 
                  placeholder='Enter Email' 
                  required
                  onChange={(event) => setLoginEmail(event.target.value)}
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input 
                  type="password" 
                  id="password" 
                  placeholder='Enter Password' 
                  required
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon' />
            </button>

            {loginStatus && (
              <span className='showMessage'>{loginStatus}</span>
            )}

            <span className='forgotPassword'>
              Forgot your Password? <a href="#">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
