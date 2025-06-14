import React, { useState, useEffect } from 'react';
import './home.css';
import { FaSearch, FaBatteryThreeQuarters, FaPalette, FaRupeeSign } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import FeaturedProducts from '../../components/Featured/FeaturedProducts.js';
import About from '../About/About.js';
import { useAlert } from '../../components/Alert/Alert.js';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const { showAlert, AlertComponent } = useAlert();
  const images = [
    'https://media.gettyimages.com/id/915703156/photo/india-economy-auto.jpg?s=1024x1024&w=gi&k=20&c=ekNJO0hX0cMVL-FoF7KcZ-Uek23H4JqNWaXyyPN-kto=',
    'https://media.gettyimages.com/id/2024392309/photo/uber-ceo-dara-khosrowshahi-in-india.jpg?s=1024x1024&w=gi&k=20&c=2QU7bpXvARgcbdLBouFxPNrTtAMPL9s5i1Gl1cEvp9I=',
    'https://media.gettyimages.com/id/2024392594/photo/uber-ceo-dara-khosrowshahi-in-india.jpg?s=1024x1024&w=gi&k=20&c=DIrXIsXZ8blg8xnuBqIzcYUx35c4xiTRZ4g01rRn3S4='
  ];

  const [searchParams, setSearchParams] = useState({
    priceRange: '',
    color: '',
    batteryRange: '',
    average: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!searchParams.priceRange && !searchParams.color && !searchParams.batteryRange && !searchParams.average){
      showAlert("Please fill any category", 'warning');
    }
    console.log('Search params:', searchParams);
  };

  return (
    <>
      <div className="er-home-container" id='home'>
        <AlertComponent/>
        {/* Image Slider Background */}
        <div className="er-slider">
          {images.map((image, index) => (
            <div
              key={index}
              className={`er-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="er-slider-overlay" />
        </div>

        {/* Main Content */}
        <div className="er-home-content">
          <div className='er-hero-text'>
            <h1 className="er-home-title">Find Your Perfect <span>E-Rickshaw</span></h1>
            <p className="er-home-subtitle">Unbelivable Products in Unbeatable Prices</p>
            <button
              className="er-cta-button"
              onClick={() => setShowSearch(!showSearch)}>
              {showSearch ? 'Hide Options' : 'Find Preference'}
            </button>
          </div>

          {/* Search Form */}
          <form
            className={`er-search-form ${showSearch ? 'visible' : ''}`}
            onSubmit={handleSubmit}
          >
            <div className="er-form-header">
              <span role="img" aria-label="rickshaw" className='er-form-icon'>🛺</span>
              <h3>Customize Your Search</h3>
            </div>

            <div className="er-input-grid">
              <div className="er-input-group">
                <div className="er-input-icon">
                  <FaRupeeSign />
                </div>
                <select
                  name="priceRange"
                  value={searchParams.priceRange}
                  onChange={handleInputChange}
                  className="er-search-input">
                  <option value="">Price Range</option>
                  <option value="1-1.5">₹1L - ₹1.5L</option>
                  <option value="1.5-2">₹1.5L - ₹2L</option>
                  <option value="2-2.5">₹2L - ₹2.5L</option>
                  <option value="2.5+">Above ₹2.5L</option>
                </select>
              </div>

              <div className="er-input-group">
                <div className="er-input-icon">
                  <FaPalette />
                </div>
                <select
                  name="color"
                  value={searchParams.color}
                  onChange={handleInputChange}
                  className="er-search-input">
                  <option value="">Color Preference</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="white">White</option>
                </select>
              </div>

              <div className="er-input-group">
                <div className="er-input-icon">
                  <FaBatteryThreeQuarters />
                </div>
                <select
                  name="batteryRange"
                  value={searchParams.batteryRange}
                  onChange={handleInputChange}
                  className="er-search-input">
                  <option value="">Battery Range</option>
                  <option value="60-80">60-80 km</option>
                  <option value="80-100">80-100 km</option>
                  <option value="100-120">100-120 km</option>
                  <option value="120+">120+ km</option>
                </select>
              </div>

              <div className="er-input-group">
                <div className="er-input-icon">
                  <IoSpeedometerOutline />
                </div>
                <select
                  name="average"
                  value={searchParams.average}
                  onChange={handleInputChange}
                  className="er-search-input">
                  <option value="">Average per Charge</option>
                  <option value="40-60">40-60 km</option>
                  <option value="60-80">60-80 km</option>
                  <option value="80-100">80-100 km</option>
                  <option value="100+">100+ km</option>
                </select>
              </div>
            </div>

            <button type="submit" className="er-search-button">
              <FaSearch className="er-search-icon" />
              Search E-Rickshaws
            </button>
          </form>
        </div>
      </div>
      <About/>
      <FeaturedProducts />
    </>
  );
};

export default Home;