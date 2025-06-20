import {Link} from 'react-router-dom';
import './Footer.css';
import brandInfo from '../../data/brandInfo.json';
import { useGlobalData } from '../../context/GlobalDataContext';
import { useEffect, useState } from 'react';

const Footer = () => {
  const { brand, loading, error } = useGlobalData();
  const [footerInfo, setInfo] = useState(brandInfo.brand);
  useEffect(()=>{
    if(!loading && !error)
    setInfo(brand.brand);
  }, [loading, brand, error]);

  return (
    <footer className="shiva-footer">
      <div className="shiva-footer-container">
        <div className="shiva-footer-section">
          <h3>About Us</h3>
          <p>{footerInfo.about.description}</p>
        </div>

        <div className="shiva-footer-section">
          <h3>Quick Links</h3>
          <ul className="shiva-footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/feedbacks">Feedbacks</Link></li>
            <li><Link to="/collections" >Collections</Link></li>
            <li><Link to="/admin" >Admin Dashboard</Link></li>
          </ul>
        </div>

        <div className="shiva-footer-section">
          <h3>Contact Us</h3>
          <address>
            <p>Address: {footerInfo.contact_info.address}</p>
            <p>Phone: {footerInfo.contact_info.mobile_number}</p>
            <p>Email: {footerInfo.contact_info.email}</p>
          </address>
        </div>
      </div>

      <div className="shiva-footer-bottom">
        <p>&copy; {new Date().getFullYear()} {footerInfo.brand_name}. all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;