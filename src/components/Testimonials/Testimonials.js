import React, { useState, useEffect } from 'react';
import './Testimonials.css';

// Example testimonial data
const exampleTestimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '9876543210',
    rating: 5,
    message: 'Excellent products and service! The quality exceeded my expectations. Will definitely shop here again.'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya@example.com',
    phone: '',
    rating: 4,
    message: 'Great collection and fast delivery. The packaging was very secure and products arrived in perfect condition.'
  },
  {
    id: 3,
    name: 'Amit Singh',
    email: '',
    phone: '8765432109',
    rating: 5,
    message: 'Best place to shop for authentic products. Customer support is very responsive and helpful.'
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    contact: '', // Can be email or phone
    message: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Simulate loading data (in real app, this would be an API call)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTestimonials(exampleTestimonials);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || (!formData.contact.includes('@') && formData.contact.length < 10) || !formData.message || formData.rating === 0) {
      alert('Please fill all fields correctly');
      return;
    }

    // Create new testimonial object
    const newTestimonial = {
      id: testimonials.length + 1,
      name: formData.name,
      email: formData.contact.includes('@') ? formData.contact : '',
      phone: formData.contact.includes('@') ? '' : formData.contact,
      rating: formData.rating,
      message: formData.message
    };

    // Add to testimonials (in real app, you would send to backend first)
    setTestimonials(prev => [...prev, newTestimonial]);
    
    // Reset form
    setFormData({
      name: '',
      contact: '',
      message: '',
      rating: 0
    });
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-heading">Customer Reviews</h2>
        
        {loading ? (
          <div className="testimonials-loader">
            <div className="loader-spinner"></div>
            <p>Loading testimonials...</p>
          </div>
        ) : (
          <>
            <div className="testimonials-list">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-header">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`rating-star ${i < testimonial.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="testimonial-contact">
                    {testimonial.email || `Phone: ${testimonial.phone}`}
                  </p>
                  <p className="testimonial-message">{testimonial.message}</p>
                </div>
              ))}
            </div>

            <div className="testimonial-form-container">
              <h3 className="form-heading">Share Your Experience</h3>
              <form onSubmit={handleSubmit} className="testimonial-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact">Email or Phone*</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Rating*</label>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      return (
                        <span
                          key={ratingValue}
                          className={`rating-star ${ratingValue <= (hoverRating || formData.rating) ? 'filled' : ''}`}
                          onClick={() => handleRatingClick(ratingValue)}
                          onMouseEnter={() => setHoverRating(ratingValue)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Feedback*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Submit Review
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;