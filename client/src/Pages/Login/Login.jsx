import React, { useState } from 'react';
import './Login.css';
import video from '../../Assets/Flowers - Video Background HD 1080p.mp4';
import logo from '../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Axios from 'axios';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginStatus("");

    try {
      const response = await Axios.post('/login', {
        loginEmail,
        loginPassword
      });

      if (response.data.success) {
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);

        setLoginStatus("Login successful!");

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setLoginStatus("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginPage flex'>
      <div className="container flex">
        {/* Left Side - Video Section */}
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

        {/* Right Side - Login Form */}
        <div className="formDiv flex">
          <button className="closeBtn" onClick={() => navigate('/')}>
            <IoClose className="closeIcon" />
          </button>

          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>Welcome Back!</h3>
          </div>

          <form className='form grid' onSubmit={handleLogin}>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaEnvelope className='icon' />
                <input
                  type="email"
                  id="email"
                  placeholder='Enter your email'
                  required
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder='Enter your password'
                  required
                  onChange={(e) => setLoginPassword(e.target.value)}
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

            <button type='submit' className='btn flex' disabled={loading}>
              {loading ? "Logging in…" : <><span>Login</span><AiOutlineSwapRight className='icon' /></>}
            </button>

            {loginStatus && (
              <span className={`showMessage ${loginStatus.includes("successful") ? "success" : "error"}`}>
                {loginStatus}
              </span>
            )}

            <span className='forgotPassword'>
              Forgot your password? <a href="#">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
