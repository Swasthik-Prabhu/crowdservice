import React, { useState, useEffect } from "react";
import "../pages/Hero.css";

const HomePage = () => {
  const [opacity, setOpacity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5; // Total number of images

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = 1 - scrollY / 200;
      setOpacity(Math.max(newOpacity, 0));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSeeDetailsClick = () => {
    const campaignsSection = document.getElementById("campaigns-section");
    if (campaignsSection) {
      campaignsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 3 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 3 ? 0 : prevSlide + 1
    );
  };

  return (
    <div>
      <div className="hero-section">
        <div className="hero-left"></div>
        <div className="hero-right"></div>
        <div className="hero-content" style={{ opacity: opacity }}>
          <h1 className="hero-title">
            <span className="text-pablo">FUNDRAISING</span>
            <span className="text-picasso">PLATFORM</span>
          </h1>
          <button
            className="hero-button"
            aria-label="See more details about Pablo Picasso"
            onClick={handleSeeDetailsClick}
          >
            See Details
          </button>
        </div>
      </div>

      <section id="campaigns-section" className="image-gallery">
        {/* Left Navigation Button */}
        <button
          className="nav-button left"
          aria-label="Previous slide"
          onClick={handlePrevSlide}
        >
          &#10094;
        </button>

        <div
          className="carousel-container"
          style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
        >
          <div className="carousel-slide">
            <img
              src="https://www.investopedia.com/thmb/-9BiBSIHnpAWSt3tSULOy0XCmnI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crowdfunding.asp-final-631f299b9cdb408cb08288b305f78440.png"
              alt="Artwork 1"
              className="art-image"
            />
          </div>
          <div className="carousel-slide">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL9AUpLywIC-xbXBWeAGlWS5tcjiqOHql1g&s"
              alt="Artwork 2"
              className="art-image"
            />
          </div>
          <div className="carousel-slide">
            <img
              src="https://imageio.forbes.com/specials-images/imageserve/5dfd02fc4e2917000783972d/crowdfunding-concept/0x0.jpg?crop=1000,563,x0,y73,safe&height=400&width=711&fit=bounds"
              alt="Artwork 3"
              className="art-image"
            />
          </div>
          <div className="carousel-slide">
            <img
              src="https://cdnblog.webkul.com/blog/wp-content/uploads/2019/07/03063304/camera-card-communication-1449080.jpg"
              alt="Artwork 4"
              className="art-image"
            />
          </div>
          <div className="carousel-slide">
            <img
              src="https://img.freepik.com/free-photo/crowdfunding-project-plan-strategy-business-graphic-concept_53876-125388.jpg"
              alt="Artwork 5"
              className="art-image"
            />
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          className="nav-button right"
          aria-label="Next slide"
          onClick={handleNextSlide}
        >
          &#10095;
        </button>
      </section>
    </div>
  );
};

export default HomePage;
