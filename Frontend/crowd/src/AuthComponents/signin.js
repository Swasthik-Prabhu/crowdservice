import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from './apiConfig';
import './signin.css';

function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to the backend
      const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);
      const {  user_id, role, name, email } = response.data;

      // Store user details in local storage
      localStorage.setItem("userDetails", JSON.stringify({ user_id, name, email }));

      // Navigate based on role
      if (role === 'user') navigate('/donor-dashboard');
      else if (role === 'Creator') navigate('/creator-dashboard');
      else if (role === 'Admin') navigate('/admin-panel');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Invalid credentials.';
      setError(errorMessage);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SignIn;
