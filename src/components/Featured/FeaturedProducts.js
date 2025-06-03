import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/collection.json';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [featureVisible, setFeatureVisible] = useState([]);

  // Memoize the product change handler to avoid useEffect dependency issues
  const handleProductChange = useCallback((index) => {
    if (index !== currentProductIndex) {
      setIsTransitioning(true);
      setFeatureVisible(products[index].features.map(() => false));

      setTimeout(() => {
        setCurrentProductIndex(index);
        setCurrentSlideIndex(0);
        setIsTransitioning(false);

        // Animate features one by one
        products[index].features.forEach((_, i) => {
          setTimeout(() => {
            setFeatureVisible(prev => {
              const newVisible = [...prev];
              newVisible[i] = true;
              return newVisible;
            });
          }, i * 200 + 300);
        });
      }, 500);
    }
  }, [currentProductIndex]);

  // Handle slide change
  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
  };

  // Navigate to product details
  const handleProductClick = () => {
    navigate(`/collections/${products[currentProductIndex].product_id}`);
  };

  // Initialize feature visibility
  useEffect(() => {
    setFeatureVisible(products[currentProductIndex].features.map(() => false));

    const initialTimeout = setTimeout(() => {
      products[currentProductIndex].features.forEach((_, i) => {
        setTimeout(() => {
          setFeatureVisible(prev => {
            const newVisible = [...prev];
            newVisible[i] = true;
            return newVisible;
          });
        }, i * 200);
      });
    }, 300);

    return () => clearTimeout(initialTimeout);
  }, [currentProductIndex]);

  // Auto-rotate slides and products
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex(prev => {
        if (prev + 1 >= products[currentProductIndex].images.length) {
          // Move to next product
          handleProductChange((currentProductIndex + 1) % products.length);
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentProductIndex, currentSlideIndex, handleProductChange]);

  return (
    <div className="featured-products-container">
      <h2 className="web-title">Featured E-Rickshaws</h2>

      <div className="featured-product-slider">
        <div className="slider-images">
          {products[currentProductIndex].images.map((image, index) => (
            <div
              key={`${currentProductIndex}-${index}`}
              className={`slide ${index === currentSlideIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}>
              <div className="slide-overlay"></div>
              <div
                className={`fe-product-info ${isTransitioning ? 'product-exit' : 'product-enter'}`}
                onClick={handleProductClick}  >
                <h3 className={`fe-product-name ${featureVisible[0] ? 'visible' : ''}`}>
                  {products[currentProductIndex].name}
                </h3>
                <div className={`fe-product-price ${featureVisible[0] ? 'visible' : ''}`}>
                  ₹{products[currentProductIndex].price.toLocaleString('en-IN')}
                </div>
                <ul className="fe-product-features">
                  {products[currentProductIndex].features.map((feature, i) => (
                    <li
                      key={i}
                      className={`feature-item ${featureVisible[i] ? 'visible' : ''}`}
                      style={{ transitionDelay: `${i * 0.2}s` }}>
                      <span className="feature-icon">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <div className="fe-product-nav-buttons">
            <button
              className="nav-button prev"
              onClick={() => handleProductChange(
                (currentProductIndex - 1 + products.length) % products.length
              )}
            >
              &lt;
            </button>
            <span className="fe-product-counter">
              {currentProductIndex + 1} / {products.length}
            </span>
            <button
              className="nav-button next"
              onClick={() => handleProductChange(
                (currentProductIndex + 1) % products.length
              )}>
              &gt;
            </button>
          </div>

          <div className="slide-dots">
            {products[currentProductIndex].images.map((_, index) => (
              <button
                key={index}
                className={`slide-dot ${index === currentSlideIndex ? 'active' : ''}`}
                onClick={() => handleSlideChange(index)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;