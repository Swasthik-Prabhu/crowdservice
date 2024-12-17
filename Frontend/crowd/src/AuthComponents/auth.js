import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    role: 'Donor',
    id: '',  // Add 'id' field to store the generated user ID
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the max_id and set the id for the new user
    const fetchMaxId = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/max-id/');
        const maxId = response.data.max_id;
        const newUserId = maxId + 1;
        setFormData((prevData) => ({
          ...prevData,
          id: newUserId,  // Set the generated user ID in the form data
        }));
      } catch (err) {
        const errorMessage = err.response?.data?.detail?.msg || 'An error occurred. Please try again later.';
        setError(errorMessage);
      }
    };

    fetchMaxId();
  }, []);  // Fetch max_id only once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Send the user data along with the ID to the backend
      await axios.post('http://127.0.0.1:8000/users/', formData);
      alert('User registered successfully!');
      navigate('/signin');
    } catch (err) {
      // Extract a string error message to avoid rendering an object
      const errorMessage = err.response?.data?.detail?.msg || 'An error occurred. Please try again later.';
      setError(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {/* Show the ID but make it readonly so the user can't modify it */}
        <input
          type="text"
          name="id"
          placeholder="User ID"
          value={formData.id || ''}
          readOnly
        />
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
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="Donor">Donor</option>
          <option value="Creator">Creator</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', credentials);
      const { role } = response.data;
      if (role === 'Donor') navigate('/donor-dashboard');
      else if (role === 'Creator') navigate('/creator-dashboard');
      else if (role === 'Admin') navigate('/admin-panel');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials.');
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export { SignUp, SignIn };
