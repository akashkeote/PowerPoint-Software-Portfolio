import React from 'react';

const allSkills = [
  { img: 'https://AkashKeote.github.io/Assets/html-logo.webp', label: 'HTML' },
  { img: 'https://AkashKeote.github.io/Assets/css-logo.webp', label: 'CSS' },
  { img: 'https://AkashKeote.github.io/Assets/icons8-flutter-48.png', label: 'Flutter' },
  { img: 'https://AkashKeote.github.io/Assets/icons8-dart-48.png', label: 'Dart' },
  { img: 'https://AkashKeote.github.io/Assets/icons8-figma-100.png', label: 'Figma' },
  { img: 'https://AkashKeote.github.io/Assets/java.png', label: 'Java' },
  { img: 'https://AkashKeote.github.io/Assets/C.png', label: 'C' },
  { img: 'https://AkashKeote.github.io/Assets/icons8-c++-64.png', label: 'C++' },
  { img: 'https://AkashKeote.github.io/Assets/Linux.png', label: 'Linux' },
  { img: 'https://AkashKeote.github.io/Assets/Windows.png', label: 'Windows' },
  { img: 'https://AkashKeote.github.io/Assets/365.png', label: 'Microsoft Office' },
  { img: 'https://AkashKeote.github.io/Assets/icons8-networking-96.png', label: 'Networking' },
];

const SkillsSection = () => (
  <section id="skills" className="skills-section-comic">
    <div className="skills-category-header" style={{marginBottom: 8}}>
      <span className="skills-category-icon" role="img" aria-label="arsenal">⚡</span>
      <span className="skills-category-title">TECH ARSENAL</span>
    </div>
    <div style={{fontWeight: 600, fontSize: '1.1rem', marginBottom: 24, color: '#222', letterSpacing: '0.5px'}}>My tools of choice for building exceptional digital experiences</div>
    <div className="skills-cards">
      {allSkills.map((skill, idx) => (
        <div className="skill-card-comic" key={idx}>
          <img src={skill.img} alt={`${skill.label} logo`} className="skill-icon" />
          <span className="skill-label">{skill.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsSection; 