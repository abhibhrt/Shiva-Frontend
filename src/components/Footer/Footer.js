import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';
import brandInfo from '../../data/brandInfo.json';

const Footer = () => {
  return (
    <footer className="shiva-footer">
      <div className="shiva-footer-container">
        <div className="shiva-footer-section">
          <h3>About Us</h3>
          <p>{brandInfo.brand.about.description}</p>
        </div>

        <div className="shiva-footer-section">
          <h3>Quick Links</h3>
          <ul className="shiva-footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><Link to="signin-admin" >Admin</Link></li>
          </ul>
        </div>

        <div className="shiva-footer-section">
          <h3>Contact Us</h3>
          <address>
            <p>Address: {brandInfo.brand.contact_info.address}</p>
            <p>Phone: {brandInfo.brand.contact_info.mobile_number}</p>
            <p>Email: {brandInfo.brand.contact_info.email}</p>
          </address>
        </div>
      </div>

      <div className="shiva-footer-bottom">
        <p>&copy; {new Date().getFullYear()} {brandInfo.business_name}. all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;