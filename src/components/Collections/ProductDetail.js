import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalData } from '../../context/GlobalDataContext';
import './productDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, loading } = useGlobalData();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p._id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colorsAvailable?.[0] || '');
      }
    }
  }, [productId, products]);

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

  const availabilityStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock';

  const renderSpecificationRow = (label, value) => {
    if (!value) return null;
    return (
      <tr>
        <td>{label}</td>
        <td>{Array.isArray(value) ? value.join(', ') : value}</td>
      </tr>
    );
  };

  const renderFeature = (feature, label) => {
    if (typeof feature === 'boolean') {
      return feature ? <li>{label}</li> : null;
    }
    if (typeof feature === 'string' && feature !== 'No') {
      return <li>{label}: {feature}</li>;
    }
    return null;
  };

  return (
    <div className="product-detail-container">
      <div className="product-images">
        <div className="main-image">
          {product.images.length > 0 && (
            <img src={product.images[selectedImage]} alt={product.name} />
          )}
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
          <span className="price">₹ {product.price.toLocaleString()}</span>
          <span className={`availability ${availabilityStatus === 'In Stock' ? 'in-stock' : 'out-of-stock'}`}>
            {availabilityStatus} {product.stock > 0 && `(${product.stock} units)`}
          </span>
        </div>

        {product.colorsAvailable.length > 0 && (
          <div className="color-selection">
            <label>Available Colors:</label>
            <div className="color-options">
              {product.colorsAvailable.map(color => (
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
        )}

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        {/* Battery Specifications */}
        <div className="spec-section">
          <h3>Battery Specifications</h3>
          <table>
            <tbody>
              {renderSpecificationRow('Type', product.battery?.type)}
              {renderSpecificationRow('VRLA Rating (Ah)', product.battery?.ratingAh)}
              {renderSpecificationRow('Lithium Rating', product.battery?.lithiumRating)}
              {renderSpecificationRow('Number of VRLA Batteries', product.battery?.numberOfBatteries?.vrla)}
              {renderSpecificationRow('Number of Lithium Batteries', product.battery?.numberOfBatteries?.lithium)}
              {renderSpecificationRow('Charger Type', product.battery?.chargerType)}
              {renderSpecificationRow('Charger Rating (A)', product.battery?.chargerRatingA)}
              {renderSpecificationRow('VRLA Charging Time', product.battery?.chargingTime?.vrla)}
              {renderSpecificationRow('Lithium Charging Time', product.battery?.chargingTime?.lithium)}
              {renderSpecificationRow('Mileage Per Full Charge', product.battery?.mileagePerFullCharge)}
            </tbody>
          </table>
        </div>

        {/* Powertrain */}
        <div className="spec-section">
          <h3>Powertrain</h3>
          <table>
            <tbody>
              {renderSpecificationRow('Motor Type', product.powertrain?.motorType)}
              {renderSpecificationRow('Rated Output (W)', product.powertrain?.motorOutputRated)}
              {renderSpecificationRow('Peak Output (W)', product.powertrain?.motorOutputPeak)}
              {renderSpecificationRow('Top Speed', product.powertrain?.topSpeed)}
              {renderSpecificationRow('Average Km Per Charge', product.avgKmPerCharge)}
            </tbody>
          </table>
        </div>

        {/* Wheels & Brakes */}
        <div className="spec-section">
          <h3>Wheels & Brakes</h3>
          <table>
            <tbody>
              {renderSpecificationRow('Tyre Size', product.wheelsAndBrakes?.tyreSize)}
              {renderSpecificationRow('Rim Size', product.wheelsAndBrakes?.rimSize)}
              {renderSpecificationRow('Rim Type', product.wheelsAndBrakes?.rimType)}
              {renderSpecificationRow('Turning Radius', product.wheelsAndBrakes?.turningRadius)}
              {renderSpecificationRow('Front Brakes', product.wheelsAndBrakes?.frontBrakes)}
              {renderSpecificationRow('Rear Brakes', product.wheelsAndBrakes?.rearBrakes)}
            </tbody>
          </table>
        </div>

        {/* Frame & Chassis */}
        <div className="spec-section">
          <h3>Frame & Chassis</h3>
          <table>
            <tbody>
              {renderSpecificationRow('Chassis Type', product.frameAndChassis?.chassisType)}
              {product.frameAndChassis?.dimensions && (
                <tr>
                  <td>Dimensions (LxWxH)</td>
                  <td>
                    {product.frameAndChassis.dimensions.length} x {product.frameAndChassis.dimensions.width} x {product.frameAndChassis.dimensions.height} mm
                  </td>
                </tr>
              )}
              {renderSpecificationRow('Ground Clearance', product.frameAndChassis?.groundClearance && `${product.frameAndChassis.groundClearance} mm`)}
              {renderSpecificationRow('Roof Material', product.frameAndChassis?.roofMaterial)}
              {renderSpecificationRow('Front Suspension', product.frameAndChassis?.frontSuspension)}
              {renderSpecificationRow('Rear Suspension', product.frameAndChassis?.rearSuspension)}
              {renderSpecificationRow('Seating Capacity', product.frameAndChassis?.seatingCapacity)}
              {renderSpecificationRow('Passenger Seat Type', product.frameAndChassis?.passengerSeat)}
              {renderSpecificationRow('Payload Capacity', product.frameAndChassis?.payloadCapacityKg && `${product.frameAndChassis.payloadCapacityKg} kg`)}
            </tbody>
          </table>
        </div>

        {/* Additional Features */}
        {product.additionalFeatures && (
          <div className="spec-section">
            <h3>Additional Features</h3>
            <ul>
              {renderFeature(product.additionalFeatures.digitalSpeedometer, 'Digital Speedometer')}
              {renderFeature(product.additionalFeatures.reverseCamera, 'Reverse Camera')}
              {renderFeature(product.additionalFeatures.stepneeCover, 'Stepnee Cover')}
              {renderFeature(product.additionalFeatures.bluetoothMusicSystem, 'Bluetooth Music System')}
              {renderFeature(product.additionalFeatures.ledHeadlights, 'LED Headlights')}
              {renderFeature(product.additionalFeatures.ledTurnTailLights, 'LED Turn/Tail Lights')}
              {renderFeature(product.additionalFeatures.passengerGrabHandles, 'Passenger Grab Handles')}
              {renderFeature(product.additionalFeatures.passengerCurtains, 'Passenger Curtains')}
              {renderFeature(product.additionalFeatures.fireExtinguisher, 'Fire Extinguisher')}
              {renderFeature(product.additionalFeatures.rubberFloorMats, 'Rubber Floor Mats')}
              {renderFeature(product.additionalFeatures.toolKit, 'Tool Kit')}
              {renderFeature(product.additionalFeatures.openingRearDoor, 'Opening Rear Door')}
              {renderFeature(product.additionalFeatures.roofCarrier, 'Roof Carrier')}
              {renderFeature(product.additionalFeatures.cabinLight, 'Cabin Light')}
              {renderFeature(product.additionalFeatures.taxiLight, 'Taxi Light')}
              {renderFeature(product.additionalFeatures.reverseBuzzer, 'Reverse Buzzer')}
            </ul>
          </div>
        )}

        <div className="spec-section">
          <h3>Warranty</h3>
          <p>{product.warranty}</p>
        </div>

        <div className="contact-section">
          <h3>Contact for Purchase</h3>
          <div className="contact-methods">
            <a href="tel:+919876543210" className="contact-button phone">
              Call: +91 9876543210
            </a>
            <a href="mailto:sales@example.com" className="contact-button email">
              Email: sales@example.com
            </a>
            <a href="https://wa.me/919876543210" className="contact-button whatsapp">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default ProductDetail;