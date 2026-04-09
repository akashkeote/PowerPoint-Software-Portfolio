import React from 'react';
import './BlogSection.css';

const blogs = [
  {
    title: 'How to Build a Modern Portfolio in React',
    date: 'April 2024',
    summary: 'Step-by-step guide to creating a stunning, responsive portfolio using React and modern CSS.',
    link: '#'
  },
  {
    title: 'Top 5 JavaScript Tricks for Developers',
    date: 'March 2024',
    summary: 'Discover some lesser-known but powerful JavaScript tips to boost your productivity.',
    link: '#'
  },
  {
    title: 'Why Soft Skills Matter in Tech',
    date: 'February 2024',
    summary: 'Technical skills are important, but soft skills can set you apart. Here\'s why.',
    link: '#'
  }
];

const BlogSection = () => (
  <section className="blog-section">
    <h2>Blog & Articles</h2>
    <div className="blog-list">
      {blogs.map((blog, idx) => (
        <div className="blog-card" key={idx}>
          <div className="blog-header">
            <span className="blog-title">{blog.title}</span>
            <span className="blog-date">{blog.date}</span>
          </div>
          <p className="blog-summary">{blog.summary}</p>
          <a href={blog.link} className="blog-link" target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      ))}
    </div>
  </section>
);

export default BlogSection; 