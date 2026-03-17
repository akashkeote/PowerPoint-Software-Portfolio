import React from 'react';
import './SpidermanSwing.css';

const SpidermanSwing = () => (
  <div className="spiderman-swing-container">
    {/* Comic-style web background */}
    <svg className="spiderman-web-bg" width="100%" height="160" viewBox="0 0 1440 160" preserveAspectRatio="none">
      {/* Main web arcs (black) */}
      <path d="M0,160 Q720,10 1440,160" stroke="#111" strokeWidth="6" fill="none"/>
      <path d="M0,120 Q720,0 1440,120" stroke="#e53935" strokeWidth="4" fill="none"/>
      <path d="M0,80 Q720,40 1440,80" stroke="#1976d2" strokeWidth="4" fill="none"/>
      {/* Vertical web lines */}
      <path d="M360,0 L360,160" stroke="#111" strokeWidth="3"/>
      <path d="M720,0 L720,160" stroke="#e53935" strokeWidth="2.5"/>
      <path d="M1080,0 L1080,160" stroke="#1976d2" strokeWidth="2.5"/>
      {/* More comic web lines for effect */}
      <path d="M180,0 Q720,80 1260,0" stroke="#111" strokeWidth="2" fill="none"/>
      <path d="M0,40 Q720,120 1440,40" stroke="#111" strokeWidth="2" fill="none"/>
    </svg>
    <div className="spiderman-swing">
      {/* Spiderman SVG (comic style) */}
      <svg width="60" height="60" viewBox="0 0 60 60" className="spiderman-svg">
        <ellipse cx="30" cy="38" rx="16" ry="20" fill="#e53935" stroke="#111" strokeWidth="3" />
        <ellipse cx="30" cy="25" rx="10" ry="12" fill="#e53935" stroke="#111" strokeWidth="3" />
        {/* Eyes */}
        <ellipse cx="25" cy="25" rx="3.5" ry="6" fill="#fff" stroke="#111" strokeWidth="2" />
        <ellipse cx="35" cy="25" rx="3.5" ry="6" fill="#fff" stroke="#111" strokeWidth="2" />
        {/* Web lines on face */}
        <path d="M30 13 L30 37" stroke="#111" strokeWidth="1.2" />
        <path d="M22 25 Q30 20 38 25" stroke="#111" strokeWidth="1.2" fill="none" />
        <path d="M24 32 Q30 28 36 32" stroke="#111" strokeWidth="1.2" fill="none" />
      </svg>
      {/* Speech bubble */}
      <div className="comic-bubble">
        <span>Web-slinging through code!</span>
        <svg width="32" height="24" viewBox="0 0 32 24" className="bubble-tail">
          <polygon points="0,0 32,0 16,24" fill="#fff" stroke="#111" strokeWidth="2" />
        </svg>
      </div>
    </div>
  </div>
);

export default SpidermanSwing; 