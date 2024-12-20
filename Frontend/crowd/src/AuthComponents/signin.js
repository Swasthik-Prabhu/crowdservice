import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from './apiConfig';
import './signin.css'; // Import the CSS file at the top of your SignIn.js file


function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

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
      const { role } = response.data;

      // Navigate based on role
      if (role === 'user') navigate('/donor-dashboard');
      else if (role === 'Creator') navigate('/creator-dashboard');
      else if (role === 'Admin') navigate('/admin-panel');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials.';
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
</div>
<button
  type="button"
  className="password-toggle"
  onClick={() => setShowPassword((prev) => !prev)}
>
  {showPassword ? 'Hide' : 'Show'}
</button>


        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SignIn;
