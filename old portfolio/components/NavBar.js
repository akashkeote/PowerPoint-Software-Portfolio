import React, { useEffect } from 'react';

const NavBar = () => {
  useEffect(() => {
    // Hacker mode toggle
    const hackerToggle = document.getElementById('hacker-mode-toggle');
    const handleHackerMode = () => {
      document.body.classList.toggle('hacker-mode');
      console.log('Hacker mode toggled:', document.body.classList.contains('hacker-mode'));
    };
    if (hackerToggle) {
      hackerToggle.addEventListener('click', handleHackerMode);
    }

    // Nav link active state on scroll
    const handleScroll = () => {
      let sections = document.querySelectorAll('section');
      let navLinks = document.querySelectorAll('nav .right a');
      sections.forEach((section, index) => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => link.classList.remove('active'));
          if (navLinks[index]) navLinks[index].classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (hackerToggle) {
        hackerToggle.removeEventListener('click', handleHackerMode);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="main-navbar">
      <div className="left">
        <a href="/">Introduction</a>
      </div>
      <div className="right">
        <a href="#skills">Skills</a>
        <a href="#learning-journey">Learning Journey</a>
        <a href="#contact">Contact</a>
        <a href="https://github.com/AkashKeote" target="_blank" rel="noopener noreferrer">Github</a>
        <a href="https://www.linkedin.com/in/akashkeote/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:keoteakash@gmail.com">Email</a>
        <button 
          id="hacker-mode-toggle" 
          style={{
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: '8px 22px',
            fontSize: '17px',
            fontWeight: '600',
            borderRadius: '22px',
            transition: 'background 0.2s, color 0.2s',
            fontFamily: 'inherit'
          }}
        >
          Hacker Mode
        </button>
      </div>
    </nav>
  );
};

export default NavBar; 