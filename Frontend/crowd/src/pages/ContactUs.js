import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
      </div>

      <div className="contact-info">
        <h3>Our Contact Information:</h3>
        <ul>
          <li><strong>Phone:</strong> (123) 456-7890</li>
          <li><strong>Email:</strong> contact@company.com</li>
          <li><strong>Address:</strong> 1234 Company St., City, Country</li>
        </ul>
      </div>

      <div className="contact-form-section">
        <h3>Send Us a Message:</h3>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message:</label>
            <textarea id="message" placeholder="Enter your message" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
