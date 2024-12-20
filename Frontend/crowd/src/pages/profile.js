import React from 'react';
import './profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-picture">
          <img src="" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>Aaron Fernandes</h2>
          <p><strong>Email:</strong> aaron22@gmail.com</p>
          <p><strong>Contact:</strong> 9449011136</p>
          <p><strong>Role:</strong> User</p>
          <p><strong>About:</strong> A passionate developer who loves coding and solving problems with innovative solutions.</p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="btn-edit">Edit Profile</button>
        <button className="btn-logout">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
