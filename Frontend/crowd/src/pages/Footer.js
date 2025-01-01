import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are dedicated to empowering communities through effective and transparent crowdfunding solutions. Together, we can achieve more.
          </p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@crowdfunding.com</p>
          <p>Phone: +91 9449011136</p>
          <p>Address: SCEM Mangalore, Karnataka</p>
        </div>

        <div className="footer-section social-icons">
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Crowdfunding Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;