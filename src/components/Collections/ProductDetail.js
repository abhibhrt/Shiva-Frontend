import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productDetail.css';
import products from '../../data/collection.json';


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    // Assuming productId corresponds to product_id
    const foundProduct = products.find(e => e.product_id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors_available?.[0] || '');
    }
    setLoading(false);
  }, [productId]);

  // useEffect(() => {
  //   // Simulate API call
  //   const timer = setTimeout(() => {
  //     setProduct(products);
  //     setLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [productId]);

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-images">
        <div className="main-image">
          <img src={product.images[selectedImage]} alt={product.name} />
        </div>
        <div className="thumbnail-images">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index + 1}`}
              className={index === selectedImage ? 'active' : ''}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="det-product-info">
        <h1>{product.name}</h1>
        <p className="product-model">{product.brand} - {product.model}</p>
        
        <div className="price-section">
          <span className="price">{product.currency} {product.price.toLocaleString()}</span>
          <span className={`availability ${product.availability === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
            {product.availability}
          </span>
        </div>

        <div className="color-selection">
          <label>Available Colors:</label>
          <div className="color-options">
            {product.colors_available.map(color => (
              <div
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
                title={color}
              ></div>
            ))}
          </div>
        </div>

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-features">
          <h3>Key Features</h3>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="product-specifications">
          <h3>Specifications</h3>
          <table>
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key}>
                  <td>{key.replace(/_/g, ' ')}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="product-dimensions">
          <h3>Dimensions</h3>
          <table>
            <tbody>
              {Object.entries(product.dimensions).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="product-warranty">
          <h3>Warranty</h3>
          <p>{product.warranty}</p>
        </div>

        <div className="contact-section">
          <h3>Contact for Purchase</h3>
          <div className="contact-methods">
            <a href={`tel:${product.contact_for_purchase.phone}`} className="contact-button phone">
              Call: {product.contact_for_purchase.phone}
            </a>
            <a href={`mailto:${product.contact_for_purchase.email}`} className="contact-button email">
              Email: {product.contact_for_purchase.email}
            </a>
            <a href={product.contact_for_purchase.whatsapp} className="contact-button whatsapp">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;