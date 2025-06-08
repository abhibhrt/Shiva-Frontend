import React, { useState } from 'react';
import './about.css';

const About = () => {
  const aboutData = {
    about: "We are a premier service provider dedicated to delivering exceptional experiences to our customers. With years of industry expertise, we combine innovation with reliability to offer solutions that truly make a difference. Our team of professionals works tirelessly to ensure your needs are met with the highest standards of quality and efficiency.",
    sections: {
      services: "Our comprehensive services include web development, mobile app creation, UI/UX design, and digital marketing solutions tailored to your business needs.",
      partners: "We collaborate with industry leaders including Google Cloud, AWS, Adobe, and Shopify to bring you the best technology solutions available.",
      deals: "Check out our exclusive deals: 20% off on annual contracts, free consultation for startups, and custom package discounts for bulk orders.",
      offers: "Current offers: Free domain for 1 year with hosting plans, 30-day money-back guarantee, and complimentary SEO audit with every website package."
    },
    image: "Bg.png"
  };

  const [activeSection, setActiveSection] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image-container">
          <div className="about-image-overlay"></div>
          <img 
            src={aboutData.image} 
            alt="Our Team" 
            className={`about-image ${isImageLoaded ? 'loaded' : ''}`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>

        <div className="about-content">
          <h2 className="web-title">About Us</h2>
          <p className="about-text">{aboutData.about}</p>
          
          <div className="about-buttons">
            {Object.keys(aboutData.sections).map((section) => (
              <button
                key={section}
                className={`about-button ${activeSection === section ? 'active' : ''}`}
                onClick={() => handleSectionClick(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {activeSection && (
            <div className="about-section-content">
              <h3 className="about-section-title">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h3>
              <p className="about-section-text">{aboutData.sections[activeSection]}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;