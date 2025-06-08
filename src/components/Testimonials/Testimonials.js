import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';
import { GetFetcher } from '../utils/GetFetcher';
import { usePostFetcher } from '../utils/PostFetcher';
import { useAlert } from '../Alert/Alert'

const Testimonials = () => {
  const apiUrl = 'http://localhost:5000/api/feedback';
  const { data, loading, error } = GetFetcher({ apiUrl });
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [payload, setPayload] = useState({
    name: '',
    contact: '',
    feedMessage: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const containerRef = useRef(null);
  const { showAlert, AlertComponent } = useAlert();
  const response = usePostFetcher(
    shouldSubmit ? apiUrl : null,
    shouldSubmit ? payload : null
  );

  useEffect(() => {
    if (data && data.success && Array.isArray(data.data)) {
      setAllTestimonials(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (response) {
      if (response.status === 'success') {
        showAlert(response.message, response.status);
        setPayload({
          name: '',
          contact: '',
          feedMessage: '',
          rating: 0
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else{
        showAlert(response.message, response.status);
      }
      setShouldSubmit(false);
    }
  }, [response, showAlert]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setPayload(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payload.name || !payload.contact || !payload.feedMessage || payload.rating === 0) {
      showAlert('Please fill all the fields', 'warning');
      return;
    }
    setShouldSubmit(true);
  };

  if (error) {
    return <div className="error-message">Error loading testimonials: {error.message}</div>;
  }

  return (
    <section className="testimonials-section">
      <AlertComponent />
      <div className="testimonials-container">
        <h2 className="web-title">Customer Reviews</h2>

        {loading ? (
          <div className="testimonials-loader">
            <div className="loader-spinner"></div>
            <p>Loading testimonials...</p>
          </div>
        ) : (
          <div className="testimonials-content">
            <div className="testimonials-list" ref={containerRef}>
              {allTestimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <div className="testimonial-meta">
                      <div className="testimonial-rating">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`rating-star ${i < testimonial.rating ? 'filled' : ''}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="testimonial-date">
                        {formatDate(testimonial.createdAt)}
                      </div>
                    </div>
                  </div>
                  <p className="testimonial-message">{testimonial.feedMessage}</p>
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
                    value={payload.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact">Email or Phone*</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={payload.contact}
                    onChange={handleInputChange}
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
                          className={`rating-star ${ratingValue <= (hoverRating || payload.rating) ? 'filled' : ''}`}
                          onClick={() => handleRatingClick(ratingValue)}
                          onMouseEnter={() => setHoverRating(ratingValue)}
                          onMouseLeave={() => setHoverRating(0)}>
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
                    name="feedMessage"
                    value={payload.feedMessage}
                    onChange={handleInputChange}
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="submit-button" disabled={shouldSubmit}>
                  {shouldSubmit ? 'Submitting...' : 'Submit Review'}
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