import React from 'react';

const ContactSection = () => (
  <section id="contact" className="contact-section">
    <h2>Contact</h2>
    <div className="text contact-info-list">
      <div className="contact-info-comic">Near Vasudev Nagar, Nagpur 440016</div>
      <div className="contact-info-comic">Boys Hostel GHRCEMN Room No - 402</div>
      <div className="contact-info-comic">Contact: 9307451323</div>
      <div className="contact-info-comic">Email - keoteakash@gmail.com</div>
    </div>
    <form id="contactForm" action="https://script.google.com/macros/s/AKfycbym-HdBRM1f5UjFb8x0BT8hvGGxNejJfojuhsOo9_szaH-lqGOBxCjSyNg77eUxopm_/exec" method="POST">
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="contact">Contact</label>
      <input type="contact" id="contact" name="contact" required />
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" cols="30" rows="10" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </section>
);

export default ContactSection; 