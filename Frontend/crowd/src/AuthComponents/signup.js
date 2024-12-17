import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from './apiConfig';

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

  // Fetch the max ID when component mounts
  // useEffect(() => {
  //   const fetchMaxId = async () => {
  //     try {
  //       const response = await axios.get(API_ENDPOINTS.MAX_ID);
  //       const maxId = response.data.max_id;
  //       const newUserId = maxId + 1;

  //       setFormData((prevData) => ({
  //         ...prevData,
  //         user_id: newUserId, // Set the new user ID
  //       }));
  //     } catch (err) {
  //       const errorMessage = err.response?.data?.message || 'Error fetching user ID.';
  //       setError(errorMessage);
  //     }
  //   };

  //   fetchMaxId();
  // }, []);

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
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {/* ID is generated automatically */}
        {/*<input type="number" name="user_id" placeholder="User ID" value={formData.user_id} readOnly />}*/}

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
    </div>
  );
}

export default SignUp;
