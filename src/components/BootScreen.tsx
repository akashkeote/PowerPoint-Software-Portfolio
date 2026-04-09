import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

// PowerPoint 2021/2024 style logo — colorful fluid sphere with white swoosh P
const PowerPointLogo = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Main sphere gradient — orange-red-pink like real PPT 2021 */}
      <radialGradient id="sphereMain" cx="38%" cy="28%" r="72%">
        <stop offset="0%"  stopColor="#ffb347"/>
        <stop offset="30%" stopColor="#f26522"/>
        <stop offset="65%" stopColor="#d92b2b"/>
        <stop offset="100%" stopColor="#9a1a1a"/>
      </radialGradient>
      {/* Highlight sheen on top */}
      <radialGradient id="sheen" cx="38%" cy="22%" r="50%">
        <stop offset="0%"  stopColor="#ffe0a0" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#ff8c3a" stopOpacity="0"/>
      </radialGradient>
      {/* Outer glow */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* Shadow */}
    <ellipse cx="48" cy="90" rx="30" ry="5" fill="rgba(0,0,0,0.15)"/>

    {/* Main colorful sphere */}
    <circle cx="48" cy="46" r="42" fill="url(#sphereMain)"/>

    {/* Highlight sheen — makes it look 3D */}
    <circle cx="48" cy="46" r="42" fill="url(#sheen)"/>

    {/* White swoosh / P letter — the PowerPoint style */}
    <text
      x="24" y="68"
      fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      fontWeight="700"
      fontSize="52"
      fill="white"
      opacity="0.96"
      filter="url(#glow)"
    >
      P
    </text>

    {/* Small red "P" badge — bottom right of sphere */}
    <circle cx="74" cy="72" r="18" fill="#c0392b" stroke="white" strokeWidth="2"/>
    <text
      x="64" y="80"
      fontFamily="'Segoe UI', Arial, sans-serif"
      fontWeight="700"
      fontSize="18"
      fill="white"
    >
      P
    </text>
  </svg>
);

// Microsoft 4-color logo
const MicrosoftLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, width: 18, height: 18 }}>
      <div style={{ background: '#f25022', borderRadius: 1 }}/>
      <div style={{ background: '#7fba00', borderRadius: 1 }}/>
      <div style={{ background: '#00a4ef', borderRadius: 1 }}/>
      <div style={{ background: '#ffb900', borderRadius: 1 }}/>
    </div>
    <span style={{ fontSize: 13, fontWeight: 600, color: '#444', fontFamily: "'Segoe UI', sans-serif", letterSpacing: 0.2 }}>
      Microsoft
    </span>
  </div>
);

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [statusText, setStatusText] = useState('Starting Microsoft PowerPoint...');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase(1);
      setStatusText('Loading Akash_Developer_Portfolio.pptx...');
    }, 900);
    const t2 = setTimeout(() => {
      setStatusText('Applying themes and fonts...');
    }, 2000);
    const t3 = setTimeout(() => setPhase(2), 3200);
    const t4 = setTimeout(() => onComplete(), 3600);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(30,30,30,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          {/* Splash card — white, exactly like PPT 2021 */}
          <motion.div
            initial={{ scale: 0.91, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 440,
              height: 290,
              background: '#ffffff',
              borderRadius: 5,
              boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              userSelect: 'none',
            }}
          >
            {/* Top-left "Office 2021" badge */}
            <div style={{
              position: 'absolute', top: 14, left: 14,
              background: '#c0392b',
              color: 'white',
              fontSize: 11, fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 3,
              fontFamily: "'Segoe UI', sans-serif",
              letterSpacing: 0.4,
            }}>
              Office 2021
            </div>

            {/* Top-right: window buttons */}
            <div style={{
              position: 'absolute', top: 12, right: 14,
              display: 'flex', gap: 18,
              color: '#aaa', fontSize: 13,
              fontFamily: "'Segoe UI', sans-serif",
            }}>
              <span style={{ lineHeight: 1, marginTop: 2 }}>─</span>
              <span>✕</span>
            </div>

            {/* Center: Logo + Microsoft */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              paddingTop: 24,
            }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <PowerPointLogo />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <MicrosoftLogo />
              </motion.div>
            </div>

            {/* Bottom: loading text */}
            <div style={{
              padding: '10px 16px 12px',
              borderTop: '1px solid #ebebeb',
            }}>
              <motion.span
                key={statusText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 11, color: '#777', fontFamily: "'Segoe UI', sans-serif" }}
              >
                {statusText}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};