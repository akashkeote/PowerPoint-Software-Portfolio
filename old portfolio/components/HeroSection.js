import React from 'react';

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-text">
      <span className="hero-badge">&lt;/&gt; Full Stack Developer</span>
      <h2>Hi, I'm Akash <span className="wave-emoji">👋</span></h2>
      <p className="hero-subheading">
        I am currently pursuing a B.Tech in Computer Science and Engineering at Raisoni College, with a keen interest in Data Structures and Algorithms (DSA). My focus helps me dive deeper into problem solving and coding. Let's look for opportunities to learn and innovate together.
      </p>
      <div className="hero-buttons">
        <a href="https://drive.google.com/drive/folders/1ID1uHzPu7DBdMX9e4SsYGLmeYbclXA76?usp=drive_link" target="_blank" rel="noopener noreferrer" className="hero-btn primary">
          <span>View Resume</span>
        </a>
        <a href="https://drive.google.com/drive/folders/14gwS2GpMkEbUhupOc-_rJtEkGLhwNldQ?usp=drive_link" target="_blank" rel="noopener noreferrer" className="hero-btn secondary">
          <span>Engineering Sem Notes</span>
        </a>
      </div>
    </div>
    <div className="hero-image-wrapper">
      <div className="hero-image-sketch">
        <img src="https://AkashKeote.github.io/Assets/profile.jpg" alt="Akash Keote" className="hero-image" />
        <span className="hero-image-emoji">🙂</span>
      </div>
    </div>
  </section>
);

export default HeroSection;