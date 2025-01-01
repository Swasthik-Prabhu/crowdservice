import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h1>APOLLO</h1>
          <p>© 2020 Meteor Development Group Inc.</p>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-medium"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/positions">Open Positions</a></li>
              <li><a href="/team">Team</a></li>
            </ul>
          </div>
          <div>
            <h3>Community</h3>
            <ul>
              <li><a href="/graphql-summit">GraphQL Summit</a></li>
              <li><a href="/apollo-spectrum">Apollo Spectrum</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3>Help</h3>
            <ul>
              <li><a href="/contact-us">Contact an Expert</a></li>
              <li><a href="/support">Get Support</a></li>
              <li><a href="/terms">Website Terms of Service</a></li>
              <li><a href="/product-terms">Product Terms of Service</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
