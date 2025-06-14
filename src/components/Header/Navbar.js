import React, { useState, useEffect } from 'react';
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    setLoaded(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <nav className={`shiva-navbar ${scrolled ? 'scrolled' : ''} ${loaded ? 'loaded' : ''}`}>
        <div className="shiva-navbar-container">
          {/* Logo */}
          <div className="shiva-navbar-logo">
            <a href="/">Shiva Enterprises</a>
          </div>

          {/* Desktop Navigation */}
          <ul className="shiva-navbar-links">
            <li className="nav-item"><NavLink to='/' className="shiva-nav-link">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/feedbacks" className="shiva-nav-link">Feedbacks</NavLink></li>
            <li className="nav-item"><NavLink to="/collections" className="shiva-nav-link">Collections</NavLink></li>
            <li className="nav-item"><NavLink to="/contact" className="shiva-nav-link">Contact</NavLink></li>
          </ul>

          {/* Mobile Navigation Icon */}
          <div className="shiva-navbar-mobile-icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`shiva-mobile-menu-wrapper ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="shiva-navbar-mobile-menu">
          <li className="nav-item"><NavLink to='/' className="shiva-nav-link" onClick={closeMobileMenu}>Home</NavLink></li>
          <li className="nav-item"><NavLink to='/about' className="shiva-nav-link" onClick={closeMobileMenu}>About</NavLink></li>
          <li className="nav-item"><NavLink to="/feedbacks" className="shiva-nav-link" onClick={closeMobileMenu}>Feedbacks</NavLink></li>
          <li className="nav-item"><NavLink to="/collections" className="shiva-nav-link" onClick={closeMobileMenu}>Collections</NavLink></li>
          <li className="nav-item"><NavLink to="/contact" className="shiva-nav-link" onClick={closeMobileMenu}>Contact</NavLink></li>
        </ul>
      </div>

      {/* Overlay for mobile menu */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />
    </>
  );
};

export default Navbar;