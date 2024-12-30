import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          CrowdFunding Platform
        </Link>
      </div>
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
          <Link to="/profile" className="navbar-link">
            Profile
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/create-campaign" className="navbar-link">
            Create Campaign
          </Link>
        </li>
        
        <li className="navbar-item">
          <Link to="/contact-us" className="navbar-link">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
