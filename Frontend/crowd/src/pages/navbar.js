import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './logo.png'; // Ensure you have a logo image file in the appropriate path.

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <img src={logo} alt="Logo" className="logo" />
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
          <Link to="/donor-dashboard" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
            About
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/campaignpage" className="navbar-link">
            Campaigns
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
        </li>
        
        {/* <li className="navbar-item">
          <Link to="/contact-us" className="navbar-link">
            Contact Us
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
