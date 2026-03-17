import React from 'react';

const downloads = [
  { href: 'https://drive.google.com/file/d/1M55o6E3tvjJA-oT1IVCPrLPCVE-2h66O/view?usp=sharing', label: 'Download LG OSC' },
  { href: 'https://drive.google.com/file/d/1zv5BAvZJvWthX6a6KlD2WPw8_h8LKeCm/view?usp=drive_link', label: 'Droid Cam' },
  { href: 'https://drive.google.com/file/d/1lpjZEfHs97WSl7_i-AFly262DHP0xwQ5/view?usp=drive_link', label: 'Figma' },
  { href: 'https://drive.google.com/file/d/1IEnUquPAN4ZcHOsIOo-_rY_E1gOvlua6/view?usp=drive_link', label: 'IDM' },
  { href: 'https://drive.google.com/file/d/1uja_XpUkoM8L32DUBHJBTchq3hIGXlYV/view?usp=drive_link', label: 'IO Bit Uninstaller' },
  { href: 'https://drive.google.com/file/d/1oQWPd4YnFpfxDj3Hcpdok0gEWV3Ue3St/view?usp=drive_link', label: 'Mouse Without Border' },
  { href: 'https://drive.google.com/file/d/1f-pBXIU4zMCXgjskbAlvqjfM4E09mfoT/view?usp=drive_link', label: 'NetSetMan' },
  { href: 'https://drive.google.com/file/d/155qa6U_AV34uR4gYf30dTtuslQuX_w9Z/view?usp=drive_link', label: 'OBS STUDIO' },
  { href: 'https://drive.google.com/file/d/1fRYya-P6qzAGPZmycfQIucGKGs3qiyNZ/view?usp=drive_link', label: 'SPACE DESK' },
  { href: 'https://drive.google.com/file/d/14LK9ZIrqTJM7Ry3xCJYWju4frEqQIQDF/view?usp=drive_link', label: 'VLC' },
];

const ComicDownloadIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Download"
    style={{ marginRight: 8, verticalAlign: 'middle' }}
  >
    <rect x="2" y="2" width="22" height="22" rx="6" fill="#fffbe7" stroke="#111" strokeWidth="3"/>
    <path d="M13 7V17" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
    <path d="M8.5 13.5L13 18L17.5 13.5" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadSection = () => (
  <section id="download" className="download-section">
    <h2>Download Software</h2>
    <div className="text">
      {downloads.map((d, idx) => (
        <a key={idx} href={d.href} download className="download-link"><ComicDownloadIcon />{d.label}</a>
      ))}
    </div>
    <h2>Sources Pdf</h2>
    <div className="text">
      <a href="https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/publicFiles/Docker%20CheatSheet%20ApnaCollege.pdf" className="download-link"><ComicDownloadIcon />Docker Commands</a>
    </div>
  </section>
);

export default DownloadSection; 