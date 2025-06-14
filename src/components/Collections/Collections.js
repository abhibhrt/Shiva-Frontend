import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalData } from '../../context/GlobalDataContext';
import './collection.css';

const Collections = () => {
  const navigate = useNavigate();
  const { products, loading } = useGlobalData();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 200000],
    batteryType: '',
    color: '',
    availability: 'all'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: newPriceRange
    }));
  };

  const filteredProducts = products.filter(product => {

    return (
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1] &&
      (filters.batteryType === '' || product.battery.type.includes(filters.batteryType)) &&
      (filters.color === '' || product.colorsAvailable.includes(filters.color)) &&
      (filters.availability === 'all' ||
        (filters.availability === 'In Stock' && product.stock > 0) ||
        (filters.availability === 'Out of Stock' && product.stock === 0)
      )
    )
  });

  const viewProductDetails = (productId) => {
    navigate(`/collections/${productId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loader"></span>
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="collections-page">
      <button
        className="mobile-filter-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`filters-sidebar ${showFilters ? 'mobile-visible' : ''}`}>
        <h3>Filters</h3>

        <div className="filter-group">
          <label>Price Range</label>
          <div className="price-range-inputs">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              min="0"
              placeholder="Min"
            />
            <span>to</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              min={filters.priceRange[0]}
              placeholder="Max"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Battery Type</label>
          <select
            name="batteryType"
            value={filters.batteryType}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="VRLA">VRLA</option>
            <option value="Lithium">Lithium</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Color</label>
          <select
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
          >
            <option value="">All Colors</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Silver">Silver</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Availability</label>
          <select
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => viewProductDetails(product._id)}>
              <div className="product-image">
                {product.images.length > 0 && (
                  <img src={product.images[0]} alt={product.name} />
                )}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">
                  ₹ {product.price.toLocaleString()}
                </p>
                <p className="product-spec">
                  Battery: {product.battery.type.join(', ')} | Range: {product.avgKmPerCharge}
                </p>
                <p className="product-availability">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No products match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;