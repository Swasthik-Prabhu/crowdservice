// import React from 'react';
// import { Link } from 'react-router-dom';
// import './navbar.css';
// import logo from './logo.png'; // Ensure you have a logo image file in the appropriate path.

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link to="/donor-dashboard" className="brand-link">
//           <img src={logo} alt="Logo" className="logo" />
//           Fundraising Platform
//         </Link>
//       </div>
//       <input type="checkbox" id="toggle" className="navbar-toggle" />
//       <label htmlFor="toggle" className="navbar-toggle-label">
//         <span></span>
//         <span></span>
//         <span></span>
//       </label>
//       <ul className="navbar-menu">
//         <li className="navbar-item">
//           <Link to="/donor-dashboard" className="navbar-link">
//             Home
//           </Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/about" className="navbar-link">
//             About
//           </Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/campaignpage" className="navbar-link">
//             Campaigns
//           </Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/profile" className="navbar-link">
//             Profile
//           </Link>
//         </li>
        
//         <li className="navbar-item">
//           <Link to="/notifications" className="navbar-link">
//             <BellOutlined style={{ fontSize: '24px', color: '#333' }} /> {/* Notification icon */}
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './navbar.css';
// import logo from './logo.png'; // Ensure the logo path is correct.
// import { BellOutlined } from '@ant-design/icons'; // Ant Design icon for notifications (or use your own image/icon)

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link to="/donor-dashboard" className="brand-link">
//           <img src={logo} alt="Logo" className="logo" />
//           Fundraising Platform
//         </Link>
//       </div>
//       <input type="checkbox" id="toggle" className="navbar-toggle" />
//       <label htmlFor="toggle" className="navbar-toggle-label">
//         <span></span>
//         <span></span>
//         <span></span>
//       </label>
//       <ul className="navbar-menu">
//         <li className="navbar-item">
//           <Link to="/donor-dashboard" className="navbar-link">Home</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/about" className="navbar-link">About</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/campaignpage" className="navbar-link">Campaigns</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/profile" className="navbar-link">Profile</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/notipage" className="navbar-link">
//             <BellOutlined style={{ fontSize: '24px', color: '#333' }} /> {/* Notification icon */}
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

function Navbar() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (userDetails && userDetails.user_id) {
        try {
          const response = await axios.get(`/notifications/user/${userDetails.user_id}`);
          const unreadNotifications = response.data.filter(notification => !notification.is_read);
          setUnreadCount(unreadNotifications.length);
        } catch (err) {
          console.error('Failed to fetch notifications', err);
        }
      }
    };

    fetchUnreadNotifications();
    const interval = setInterval(fetchUnreadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/donor-dashboard" className="brand-link">
          Fundraising Platform
        </Link>
      </div>
      <input type="checkbox" id="toggle" className="navbar-toggle" />
      <label htmlFor="toggle" className="navbar-toggle-label">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/donor-dashboard" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">About</Link>
        </li>
        <li className="navbar-item">
          <Link to="/campaignpage" className="navbar-link">Campaigns</Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">Profile</Link>
        </li>
        <li className="navbar-item">
          <Link to="/notipage" className="navbar-link">
            <div className="notification-icon">
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

