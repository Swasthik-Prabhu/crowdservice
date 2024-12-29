import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';


// const handleDonateClick = () => {
//   navigate('/', ); // Pass campaign_id via state
// };

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-picture">
          <img src="https://media.licdn.com/dms/image/v2/D5603AQHaqF6IpSnJPw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725465152964?e=1740614400&v=beta&t=udzf4fkKeTsvxBvxs-smvaL1-Zmc95IePAoR35FjfOA" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>B Yash Kamal Shetty</h2>
          <p><strong>Email:</strong> yashshetty776@gmail.com</p>
          <p><strong>Contact:</strong> 9449011136</p>
          <p><strong>Role:</strong> User</p>
          <p><strong>About:</strong> A passionate developer who loves coding and solving problems with innovative solutions.</p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="btn-edit">Edit Profile</button>
        <button 
          className="btn-logout" 
          onClick={() => navigate('/')}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;



// import React, { useContext, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../AuthComponents/UserContext';
// import './profile.css';


// const Profile = () => {
//   const { user, setUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   // Load user from localStorage if context is empty
//   useEffect(() => {
//     if (!user) {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser)); // Update context with user from localStorage
//       } else {
//         navigate('/signin'); // Redirect to signin if no user data
//       }
//     }
//     console.log(user); // Debugging line to check the user data
//   }, [user, setUser, navigate]);
  

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <h1>User Profile</h1>
//       </div>
//       <div className="profile-content">
//         <div className="profile-info">
//           <h2>{user.name}</h2>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Contact:</strong> {user.contact}</p>
//           <p><strong>Role:</strong> {user.role}</p>
//           <p><strong>About:</strong> {user.about}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;




