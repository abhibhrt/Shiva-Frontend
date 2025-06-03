import React from 'react';
import './FeaturedProducts.css';
import { products } from '../../data/products';

const FeaturedProducts = ({ t, language }) => {
  return (
    <div className="shiva-products-container">
      {products.map((product) => (
        <div key={product.id} className="shiva-product-card">
          <img src={product.image} alt={product.name[language]} className="shiva-product-image" />
          <div className="shiva-product-details">
            <h3>{product.name[language]}</h3>
            <p className="shiva-product-price">{t('price')}: ₹{product.price.toLocaleString()}</p>
            <ul className="shiva-product-features">
              {product.features[language].map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className="shiva-product-button">{t('inquireNow')}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;