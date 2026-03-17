import React from 'react';
import './ProjectsSection.css';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Node.js.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'E-commerce App',
    description: 'A full-stack e-commerce application with payment integration.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Chatbot',
    description: 'An AI-powered chatbot for customer support.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: '#'
  },
  {
    title: 'Blog Platform',
    description: 'A blogging platform with markdown support and user authentication.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: '#'
  }
];

const ProjectsSection = () => (
  <section className="projects-section">
    <h2>Projects</h2>
    <div className="projects-grid">
      {projects.map((project, idx) => (
        <div className="project-card" key={idx}>
          <img src={project.image} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
      ))}
    </div>
  </section>
);

export default ProjectsSection; 