import React, { useState, useEffect, useRef } from 'react';
import './feedbacks.css';
import { useAlert } from '../Alert/Alert';
import { useGlobalData } from '../../context/GlobalDataContext';

const Feedback = () => {
  const apiUrl = 'http://localhost:5000/api/feedback';
  const { feedback, refetch, loading } = useGlobalData();
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [payload, setPayload] = useState({
    name: '',
    contact: '',
    feedMessage: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);
  const { showAlert, AlertComponent } = useAlert();

  useEffect(() => {
    if (feedback && feedback.success && Array.isArray(feedback.data)) {
      setAllTestimonials(feedback.data);
    }
  }, [feedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, contact, feedMessage, rating } = payload;

    if (!name || !contact || !feedMessage || rating === 0) {
      showAlert('Please fill all the fields', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      showAlert(data.message, 'success');
      setPayload({ name: '', contact: '', feedMessage: '', rating: 0 });
      setTimeout(() => {
        refetch();
      }, 3000);
      showAlert(data.message, 'success');

    } catch (err) {
      showAlert('An error occurred while submitting feedback.', 'error');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (loading) {
    return (
      <div className="loading-container">
        <span className="loader"></span>
        <p>Loading Feedbacks...</p>
      </div>
    );
  }

  return (
    <section className="testimonials-section">
      <h2 className="web-title">Customer Reviews</h2>
      <AlertComponent />
      <div className="testimonials-container">
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

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
