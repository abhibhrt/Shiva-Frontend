import { useState, useEffect } from 'react';
import './brandForm.css';
import { useGlobalData } from '../context/GlobalDataContext';
import { useAlert } from '../components/Alert/Alert';

const BrandForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const { brand, loading, error } = useGlobalData();
  const { showAlert, AlertComponent } = useAlert();

  const [formData, setFormData] = useState({
    brand_name: '',
    contact_info: {
      mobile_number: '',
      email: '',
      address: '',
      map: ''
    },
    social_media: {
      instagram: '',
      facebook: '',
      whatsapp: ''
    },
    about: {
      description: ''
    }
  });

  useEffect(() => {
    if (brand && brand.brand) {
      setFormData(prev => ({
        ...prev,
        ...brand.brand,
        contact_info: {
          ...prev.contact_info,
          ...(brand.brand.contact_info || {})
        },
        social_media: {
          ...prev.social_media,
          ...(brand.brand.social_media || {})
        },
        about: {
          ...prev.about,
          ...(brand.brand.about || {})
        }
      }));
    }
  }, [brand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setFormData(prev => {
      const updated = { ...prev };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!nested[keys[i]]) nested[keys[i]] = {};
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      brand_name: formData.brand_name || '',
      contact_info: {
        mobile_number: formData.contact_info?.mobile_number || '',
        email: formData.contact_info?.email || '',
        address: formData.contact_info?.address || '',
        map: formData.contact_info?.map || ''
      },
      social_media: {
        instagram: formData.social_media?.instagram || '',
        facebook: formData.social_media?.facebook || '',
        whatsapp: formData.social_media?.whatsapp || ''
      },
      about: {
        description: formData.about?.description || ''
      }
    };

    try {
      const response = await fetch(`${apiUrl}/api/brand`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update brand');

      showAlert(data.message, 'success');
    } catch (err) {
      showAlert(err.message || 'An error occurred', 'error');
    }
  };

  return (
    <div className="brand-form-container">
      <AlertComponent />
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="brand-form">
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          <div className="form-group">
            <label htmlFor="brand_name">Brand Name</label>
            <input
              type="text"
              id="brand_name"
              name="brand_name"
              value={formData.brand_name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Contact Information</h3>
          <div className="form-group">
            <label htmlFor="contact_info.mobile_number">Mobile Number</label>
            <input
              type="text"
              id="contact_info.mobile_number"
              name="contact_info.mobile_number"
              value={formData.contact_info.mobile_number}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_info.email">Email</label>
            <input
              type="email"
              id="contact_info.email"
              name="contact_info.email"
              value={formData.contact_info.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_info.address">Address</label>
            <textarea
              id="contact_info.address"
              name="contact_info.address"
              value={formData.contact_info.address}
              onChange={handleChange}
              className="form-input"
              rows="3"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_info.map">Map URL (Optional)</label>
            <input
              type="text"
              id="contact_info.map"
              name="contact_info.map"
              value={formData.contact_info.map}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Social Media</h3>
          <div className="form-group">
            <label htmlFor="social_media.instagram">Instagram</label>
            <input
              type="text"
              id="social_media.instagram"
              name="social_media.instagram"
              value={formData.social_media.instagram}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="social_media.facebook">Facebook</label>
            <input
              type="text"
              id="social_media.facebook"
              name="social_media.facebook"
              value={formData.social_media.facebook}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="social_media.whatsapp">WhatsApp</label>
            <input
              type="text"
              id="social_media.whatsapp"
              name="social_media.whatsapp"
              value={formData.social_media.whatsapp}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">About Brand</h3>
          <div className="form-group">
            <label htmlFor="about.description">Description</label>
            <textarea
              id="about.description"
              name="about.description"
              value={formData.about.description}
              onChange={handleChange}
              className="form-input"
              rows="5"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Brand'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;
