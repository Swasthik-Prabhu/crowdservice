import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

import Navbar from './navbar';

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from local storage
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUser) {
      setUserDetails(storedUser);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userDetails');
    setUserDetails(null);
    navigate('/signin'); // Redirect to the sign-in page
  };

  return (
    <div>
      <Navbar/>
    <div className="profile-container">
      {userDetails ? (
        <div className="profile-card">
          <h1>Welcome, {userDetails.name || 'User'}!</h1>
          <p>
            <strong>User ID : </strong> {userDetails.user_id}
          </p>
          <p>
            <strong>Name : </strong> {userDetails.name}
          </p>
          <p>
            <strong>Email : </strong> {userDetails.email}
          </p>
          {/* <p>
            <strong>Contact : </strong> {userDetails.contact}
          </p> */}
          
          <button className="signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="no-details">
          <h2>No user details found</h2>
          <p>Please sign in to view your profile.</p>
          <button onClick={() => navigate('/signin')} className="signin-button">
            Go to Sign In
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default ProfilePage;
