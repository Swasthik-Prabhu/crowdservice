import React, { useState, useEffect } from "react";
import "../pages/Hero.css";

const HomePage = () => {
  // State for controlling opacity
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Scroll event listener to update opacity
    const handleScroll = () => {
      const scrollY = window.scrollY; // Scroll distance from the top
      const newOpacity = 1 - scrollY / 200; // Adjust this value to control fading speed
      setOpacity(Math.max(newOpacity, 0)); // Ensure opacity doesn't go below 0
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to campaigns section
  const handleSeeDetailsClick = () => {
    const campaignsSection = document.getElementById("campaigns-section");
    if (campaignsSection) {
      campaignsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        {/* Left Side */}
        <div className="hero-left"></div>

        {/* Right Side */}
        <div className="hero-right"></div>

        {/* Center Content */}
        <div className="hero-content" style={{ opacity: opacity }}>
          <h1 className="hero-title">
            <span className="text-pablo">FUNDRAISING</span>
            <span className="text-picasso">
              PLATFORM
            </span>
          </h1>
          <button
            className="hero-button"
            aria-label="See more details about Pablo Picasso"
            onClick={handleSeeDetailsClick} // Add click handler
          >
            See Details
          </button>
        </div>
      </div>

      {/* Image Gallery Section */}
      <section id="campaigns-section" className="image-gallery">
        <div className="image-container">
          <img src="https://www.investopedia.com/thmb/-9BiBSIHnpAWSt3tSULOy0XCmnI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crowdfunding.asp-final-631f299b9cdb408cb08288b305f78440.png" alt="Artwork 1" className="art-image" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL9AUpLywIC-xbXBWeAGlWS5tcjiqOHql1g&s" alt="Artwork 2" className="art-image" />
          <img src="https://imageio.forbes.com/specials-images/imageserve/5dfd02fc4e2917000783972d/crowdfunding-concept/0x0.jpg?crop=1000,563,x0,y73,safe&height=400&width=711&fit=bounds" alt="Artwork 3" className="art-image" />
          <img src="https://cdnblog.webkul.com/blog/wp-content/uploads/2019/07/03063304/camera-card-communication-1449080.jpg" alt="Artwork 4" className="art-image" />
          <img src="https://img.freepik.com/free-photo/crowdfunding-project-plan-strategy-business-graphic-concept_53876-125388.jpg" alt="Artwork 5" className="art-image" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
