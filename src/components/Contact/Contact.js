import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDirections,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp
} from 'react-icons/fa';
import './contact.css';
import { useGlobalData } from '../../context/GlobalDataContext';

const Contact = () => {
  const { loading, brand, error } = useGlobalData();

  const handleAction = (type, value) => {
    switch (type) {
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'call':
        window.location.href = `tel:${value.replace(/[^0-9+]/g, '')}`;
        break;
      case 'directions':
        window.open(brand.brand.contact_info.map, '_blank');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loader"></span>
        <p>Loading Contacts...</p>
      </div>
    );
  } else if (error) {
    return (
      <div className="contact-section">
        <div className='error'>Failed to Fetch</div>
      </div>
    )
  }

  return (
    <div className="contact-section">
      <h1 className="web-title">Connect With Us</h1>
      <div className="contact-main-container">
        <div className="contact-info-card">
          <div className="contact-info-content">
            <h2 className="contact-card-title">Contact Information</h2>

            <div className="contact-method">
              <div className="contact-icon-wrapper">
                <FaPhoneAlt className="contact-method-icon" />
              </div>
              <div className="contact-method-details">
                <h3 className="contact-method-title">Phone</h3>
                <p className="contact-method-value">{brand.brand.contact_info.mobile_number}</p>
                <button
                  className="contact-action-button"
                  onClick={() => handleAction('call', brand.brand.contact_info.mobile_number)}>
                  Call Now
                </button>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon-wrapper">
                <FaEnvelope className="contact-method-icon" />
              </div>
              <div className="contact-method-details">
                <h3 className="contact-method-title">Email</h3>
                <p className="contact-method-value">{brand.brand.contact_info.email}</p>
                <button
                  className="contact-action-button"
                  onClick={() => handleAction('email', brand.brand.contact_info.email)}
                >
                  Send Message
                </button>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon-wrapper">
                <FaMapMarkerAlt className="contact-method-icon" />
              </div>
              <div className="contact-method-details">
                <h3 className="contact-method-title">Address</h3>
                <p className="contact-method-value">{brand.brand.contact_info.address}</p>
                <button
                  className="contact-action-button"
                  onClick={() => handleAction('directions')}>
                  Get Directions
                </button>
              </div>
            </div>

            <div className="contact-social-section">
              <h3 className="social-section-title">Follow Us</h3>
              <div className="social-icons-container">
                {brand.brand.social_media.instagram && (
                  <a
                    href={brand.brand.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link instagram"
                  >
                    <FaInstagram />
                  </a>
                )}
                {brand.brand.social_media.facebook && (
                  <a
                    href={brand.brand.social_media.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link facebook" >
                    <FaFacebookF />
                  </a>
                )}
                {brand.brand.social_media.whatsapp && (
                  <a
                    href={brand.brand.social_media.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link whatsapp"
                  >
                    <FaWhatsapp />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="contact-map-container">
          <div className="map-wrapper">
            <iframe
              src={brand.brand.contact_info.map}
              className="responsive-iframe"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shiva Enterprises Location"
            ></iframe>
          </div>
          <button
            className="map-action-button"
            onClick={() => handleAction('directions')}>
            <FaDirections /> Open in Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;