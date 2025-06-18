// src/pages/Signin.jsx
import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom'; // ✅ Missing import added here
import './Signin.css';
import axios from 'axios'; // Import axios if you plan to make API calls

const Signin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true }); // ✅ Adjust your API endpoint here
      console.log('Login response:', res);
      // Example: If backend returns token
      localStorage.setItem('token', res.data.user); // ✅ store token (if JWT used)

      // Redirect to homepage or dashboard
      navigate('/home');

    } catch (err) {
      setError(err.response?.data?.message || 'Signin failed. Please try again.');
    }
  };
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>SIGN IN</h2>
        <p className="subtext">Sign in with your email address and your password.</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          <label>Email Address *</label>
          <input
            type="email"
            placeholder="Email Address *"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password *</label>
          <div className="password-input">
          <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password *"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <a href="#" className="forgot-link">Forgot your password?</a>

          {error && <p className="error">{error}</p>}
          <button type="submit">SIGN IN</button>
        </form>

        <p className="register-text">
          Don’t have a JW Anderson account?
          <Link to="/signup"> Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
