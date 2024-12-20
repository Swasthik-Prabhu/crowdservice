import React from 'react';
import './AboutPage.css'; // Import the new CSS

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>
        Welcome to our platform! We are committed to helping users achieve their goals
        by providing a seamless experience for managing campaigns and donations.
      </p>
      <p>
        Our mission is to make the donation process easy and transparent, allowing people
        to contribute to causes that matter most to them.
      </p>
      <p>
        We believe that everyone should have access to the power of giving back and supporting
        impactful causes. Together, we can create a better world.
      </p>

      <div className="about-container">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            We aim to provide a platform that makes it simple for people to support causes
            they care about by facilitating transparent donations.
          </p>
        </div>
        <div className="card">
          <h3>Our Vision</h3>
          <p>
            We envision a world where everyone can make a positive impact through donations,
            big or small, towards causes that matter to them.
          </p>
        </div>
        <div className="card">
          <h3>Our Values</h3>
          <p>
            We value transparency, trust, and accessibility in everything we do, ensuring that
            our users feel confident in their decisions to support various causes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
