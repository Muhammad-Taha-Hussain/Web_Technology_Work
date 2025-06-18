import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const navigate = useNavigate(); // Import useNavigate from react-router-dom
  const location = useLocation();
  const email = location.state?.email || ''; // Get email from router state
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-email', {
        email,
        code
      });

      if (res.data.success) {
        setMessage('Email verified successfully!');
        navigate('/home'); // Fixed here

      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div>
      <h2>Verify Your Email</h2>
      <form onSubmit={handleVerify}>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} disabled />
        </div>
        <div>
          <label>Verification Code:</label><br />
          <input 
            type="text" 
            value={code} 
            onChange={e => setCode(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
