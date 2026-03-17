import React, { useEffect, useState } from 'react';

const poses = [
  { section: 'introduction', emoji: '👋', label: 'Welcome!' },
  { section: 'skills', emoji: '⚡', label: 'You are in Skills' },
  { section: 'learning-journey', emoji: '📚', label: 'You are in Learning' },
  { section: 'download', emoji: '⬇️', label: 'You are in Downloads' },
  { section: 'contact', emoji: '✉️', label: 'You are in Contact' },
  { section: 'video-section', emoji: '🎬', label: 'You are in Video' },
];

function getSectionInView() {
  const scrollY = window.scrollY;
  const sections = [
    { id: 'skills', top: 0 },
    { id: 'learning-journey', top: 0 },
    { id: 'download', top: 0 },
    { id: 'contact', top: 0 },
    { id: 'video-section', top: 0 },
  ];
  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) s.top = el.offsetTop;
    else s.top = 999999;
  });
  sections.sort((a, b) => a.top - b.top);
  let current = 'introduction';
  for (let i = 0; i < sections.length; i++) {
    if (scrollY + 120 >= sections[i].top) {
      current = sections[i].id;
    }
  }
  return current;
}

const BackgroundPikachu = () => {
  const [section, setSection] = useState('introduction');
  useEffect(() => {
    const onScroll = () => {
      setSection(getSectionInView());
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const pose = poses.find(p => p.section === section) || poses[0];
  return (
    <div className="bg-pikachu-desktop">
      {/* Comic-style Pikachu SVG with emoji overlay */}
      <svg width="340" height="340" viewBox="0 0 120 120" style={{ filter: 'drop-shadow(0 2px 8px #111)' }}>
        {/* Pikachu body */}
        <ellipse cx="60" cy="80" rx="38" ry="32" fill="#ffe066" stroke="#111" strokeWidth="6" />
        {/* Head */}
        <ellipse cx="60" cy="50" rx="28" ry="28" fill="#ffe066" stroke="#111" strokeWidth="6" />
        {/* Ears */}
        <rect x="32" y="2" width="10" height="32" rx="6" fill="#ffe066" stroke="#111" strokeWidth="5" transform="rotate(-18 37 18)" />
        <rect x="78" y="2" width="10" height="32" rx="6" fill="#ffe066" stroke="#111" strokeWidth="5" transform="rotate(18 83 18)" />
        {/* Ear tips */}
        <rect x="32" y="2" width="10" height="12" rx="5" fill="#232946" stroke="#111" strokeWidth="2" transform="rotate(-18 37 8)" />
        <rect x="78" y="2" width="10" height="12" rx="5" fill="#232946" stroke="#111" strokeWidth="2" transform="rotate(18 83 8)" />
        {/* Eyes */}
        <ellipse cx="50" cy="52" rx="4" ry="6" fill="#232946" stroke="#111" strokeWidth="2" />
        <ellipse cx="70" cy="52" rx="4" ry="6" fill="#232946" stroke="#111" strokeWidth="2" />
        {/* Cheeks */}
        <ellipse cx="45" cy="62" rx="5" ry="3" fill="#e53935" stroke="#111" strokeWidth="1.5" />
        <ellipse cx="75" cy="62" rx="5" ry="3" fill="#e53935" stroke="#111" strokeWidth="1.5" />
        {/* Smile */}
        <path d="M54 66 Q60 72 66 66" stroke="#111" strokeWidth="2" fill="none" />
      </svg>
      <span className="bg-pikachu-emoji">{pose.emoji}</span>
      <span className="bg-pikachu-label">{pose.label}</span>
    </div>
  );
};

export default BackgroundPikachu; 