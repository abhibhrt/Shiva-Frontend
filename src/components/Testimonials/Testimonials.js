import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

// Example testimonial data - expanded with more entries
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
  },
  {
    id: 4,
    name: 'Neha Gupta',
    email: 'neha@example.com',
    phone: '',
    rating: 5,
    message: 'Absolutely love the products! The quality is outstanding and the delivery was super fast.'
  },
  {
    id: 5,
    name: 'Vikram Joshi',
    email: '',
    phone: '7654321098',
    rating: 4,
    message: 'Good variety of products. Found exactly what I was looking for at a reasonable price.'
  },
  {
    id: 6,
    name: 'Ananya Reddy',
    email: 'ananya@example.com',
    phone: '',
    rating: 5,
    message: 'Excellent customer service! They helped me choose the perfect product for my needs.'
  },
  {
    id: 7,
    name: 'Karthik Malhotra',
    email: 'karthik@example.com',
    phone: '6543210987',
    rating: 3,
    message: 'Products are good but delivery took longer than expected. Overall satisfied.'
  },
  {
    id: 8,
    name: 'Divya Kapoor',
    email: '',
    phone: '9432109876',
    rating: 5,
    message: 'Best shopping experience ever! Will recommend to all my friends and family.'
  },
  {
    id: 9,
    name: 'Rohit Verma',
    email: 'rohit@example.com',
    phone: '',
    rating: 4,
    message: 'Great quality products. Packaging could be improved but overall very happy.'
  },
  {
    id: 10,
    name: 'Sneha Iyer',
    email: 'sneha@example.com',
    phone: '8321098765',
    rating: 5,
    message: 'Perfect in every way! From ordering to delivery, everything was seamless.'
  }
];

const Testimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);
  const testimonialsEndRef = useRef(null);

  // Load initial data
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllTestimonials(exampleTestimonials);
      // Display first 5 testimonials
      setDisplayedTestimonials(exampleTestimonials.slice(0, 5));
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== 
        document.documentElement.offsetHeight ||
        loadingMore || 
        displayedTestimonials.length >= allTestimonials.length
      ) {
        return;
      }

      setLoadingMore(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const nextBatch = allTestimonials.slice(
          displayedTestimonials.length,
          displayedTestimonials.length + 5
        );
        setDisplayedTestimonials(prev => [...prev, ...nextBatch]);
        setLoadingMore(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedTestimonials, allTestimonials, loadingMore]);

  // Scroll to bottom when new testimonials are added
  useEffect(() => {
    if (testimonialsEndRef.current) {
      testimonialsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayedTestimonials]);

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
      id: allTestimonials.length + 1,
      name: formData.name,
      email: formData.contact.includes('@') ? formData.contact : '',
      phone: formData.contact.includes('@') ? '' : formData.contact,
      rating: formData.rating,
      message: formData.message
    };

    // Add to all testimonials and displayed testimonials
    setAllTestimonials(prev => [newTestimonial, ...prev]);
    setDisplayedTestimonials(prev => [newTestimonial, ...prev.slice(0, 4)]);
    
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
          <div className="testimonials-content">
            <div className="testimonials-list">
              {displayedTestimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-header">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`rating-star ${i < testimonial.rating ? 'filled' : ''}`} >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* <p className="testimonial-contact">
                    {testimonial.email || `Phone: ${testimonial.phone}`}
                  </p> */}
                  <p className="testimonial-message">{testimonial.message}</p>
                </div>
              ))}
              
              {loadingMore && (
                <div className="load-more-container">
                  <div className="load-more-spinner"></div>
                  <span>Loading more reviews...</span>
                </div>
              )}
              
              <div ref={testimonialsEndRef} />
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
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;