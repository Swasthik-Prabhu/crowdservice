import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from './apiConfig';
import './signup.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    user_id: null, // Automatically generated user ID
    role: 'user'
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend
      await axios.post(API_ENDPOINTS.REGISTER, formData);
      alert('User registered successfully!');
      navigate('/signin'); // Redirect to sign-in page
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <h1>Welcome to Our Platform!</h1>

      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}

      <p className="signin-option">
        Already have an account? <span onClick={() => navigate('/signin')} className="signin-link">Sign In</span>
      </p>
    </div>
  );
}

export default SignUp;
