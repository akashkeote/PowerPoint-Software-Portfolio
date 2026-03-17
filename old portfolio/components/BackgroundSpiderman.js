import React, { useEffect, useState } from 'react';

const poses = [
  { section: 'introduction', emoji: '👋', label: 'Welcome!' },
  { section: 'skills', emoji: '💪', label: 'Skills' },
  { section: 'learning-journey', emoji: '📚', label: 'Learning' },
  { section: 'download', emoji: '⬇️', label: 'Downloads' },
  { section: 'contact', emoji: '✉️', label: 'Contact' },
  { section: 'video-section', emoji: '🎬', label: 'Video' },
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

const BackgroundSpiderman = () => {
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
    <div className="bg-spiderman-desktop">
      {/* Comic-style Spiderman SVG with emoji overlay */}
      <svg width="340" height="340" viewBox="0 0 120 120" style={{ filter: 'drop-shadow(0 2px 8px #111)' }}>
        <ellipse cx="60" cy="75" rx="44" ry="38" fill="#e53935" stroke="#111" strokeWidth="6" />
        <ellipse cx="60" cy="48" rx="28" ry="32" fill="#e53935" stroke="#111" strokeWidth="6" />
        {/* Eyes */}
        <ellipse cx="48" cy="48" rx="10" ry="18" fill="#fff" stroke="#111" strokeWidth="3" />
        <ellipse cx="72" cy="48" rx="10" ry="18" fill="#fff" stroke="#111" strokeWidth="3" />
        {/* Web lines on face */}
        <path d="M60 20 L60 76" stroke="#111" strokeWidth="2.5" />
        <path d="M38 48 Q60 32 82 48" stroke="#111" strokeWidth="2.5" fill="none" />
        <path d="M44 62 Q60 54 76 62" stroke="#111" strokeWidth="2.5" fill="none" />
      </svg>
      <span className="bg-spiderman-emoji">{pose.emoji}</span>
      <span className="bg-spiderman-label">{pose.label}</span>
    </div>
  );
};

export default BackgroundSpiderman; 