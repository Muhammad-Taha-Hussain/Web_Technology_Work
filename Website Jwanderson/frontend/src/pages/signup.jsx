// src/pages/Signup.jsx
import React, { useState } from 'react';
import './Signin.css'; // Reuse same CSS, or rename if needed
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios if not already done
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation after signup
const Signup = () => {
    const navigate = useNavigate(); // Import useNavigate from react-router-dom
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

  const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        withCredentials: true // important if using cookies for JWT
      });

      localStorage.setItem('token', res.data.user);

      if (res.data.success) {
        setSuccess('Signup successful! Please check your email for verification.');
        navigate('/verify-email', { state: { email: formData.email } }); // Fixed here
    }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

//   const handleSubmit = (e) => {

//     e.preventDefault();
//     console.log('Form Data:', formData);
//     // Later here: call backend API with formData
//   };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>SIGN UP</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}
        <p className="subtext">Create a new account with your details.</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          <label>Username *</label>
          <input
            type="text"
            name="name"
            placeholder="Username *"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password *</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="register-text">
          Already have an account?
          <Link to="/signin"> Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

