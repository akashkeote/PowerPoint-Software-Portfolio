import React from 'react';
import './CertificatesSection.css';

const certificates = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    year: '2023',
    icon: '🎓'
  },
  {
    title: 'React Advanced',
    issuer: 'Udemy',
    year: '2022',
    icon: '💻'
  },
  {
    title: 'Python for Everybody',
    issuer: 'edX',
    year: '2021',
    icon: '🐍'
  }
];

const CertificatesSection = () => (
  <section className="certificates-section">
    <h2>Certificates & Achievements</h2>
    <div className="certificates-list">
      {certificates.map((c, idx) => (
        <div className="certificate-card" key={idx}>
          <span className="certificate-icon">{c.icon}</span>
          <div className="certificate-info">
            <span className="certificate-title">{c.title}</span>
            <span className="certificate-issuer">{c.issuer} &middot; {c.year}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CertificatesSection; 