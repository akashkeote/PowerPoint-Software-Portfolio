import React from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Product Manager',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback: 'Working with you was a fantastic experience! Your attention to detail and creativity is top-notch.'
  },
  {
    name: 'Rahul Verma',
    role: 'Tech Lead',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    feedback: 'You deliver high-quality work on time. The project exceeded our expectations!'
  },
  {
    name: 'Aisha Khan',
    role: 'Designer',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    feedback: 'Your skills and professionalism are truly impressive. Highly recommended!'
  }
];

const TestimonialsSection = () => (
  <section className="testimonials-section">
    <h2>Testimonials</h2>
    <div className="testimonials-grid">
      {testimonials.map((t, idx) => (
        <div className="testimonial-card" key={idx}>
          <img src={t.photo} alt={t.name} className="testimonial-photo" />
          <div className="testimonial-content">
            <p className="testimonial-feedback">"{t.feedback}"</p>
            <span className="testimonial-name">{t.name}</span>
            <span className="testimonial-role">{t.role}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection; 