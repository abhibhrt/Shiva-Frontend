import React from 'react';
import './Services.css';
import { services } from '../../data/services';

const Services = ({ t, language }) => {
  return (
    <div className="shiva-services-grid">
      {services.map((service) => (
        <div key={service.id} className="shiva-service-card">
          <div className="shiva-service-icon">{service.icon}</div>
          <h3>{service.title[language]}</h3>
          <p>{service.description[language]}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;