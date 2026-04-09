import React, { useEffect, useRef } from 'react';

const SPIDERMAN_SIZE = 54; // px

const CanvasBG = () => {
  const spidermanRef = useRef();

  useEffect(() => {
    // Polyfill for requestAnimFrame
    window.requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    function init(elemid) {
      let canvas = document.getElementById(elemid),
        c = canvas.getContext('2d'),
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight);
      c.fillStyle = 'rgba(30,30,30,1)';
      c.fillRect(0, 0, w, h);
      return { c: c, canvas: canvas };
    }

    let c, canvas, w, h, animationFrameId, t = 0;
    let resizeTimeout;

    function drawWeb(centerX, centerY, maxRadius, numRadials, numRings, rotation) {
      // Draw concentric rings
      for (let i = 1; i <= numRings; i++) {
        let radius = (i / numRings) * maxRadius;
        c.save();
        c.beginPath();
        c.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        c.strokeStyle = '#1976d2';
        c.lineWidth = 2.2;
        c.globalAlpha = 0.85;
        c.shadowColor = '#90caf9';
        c.shadowBlur = 8;
        c.stroke();
        c.restore();
      }
      // Draw radial lines
      for (let i = 0; i < numRadials; i++) {
        let angle = (2 * Math.PI * i) / numRadials + rotation;
        let x = centerX + maxRadius * Math.cos(angle);
        let y = centerY + maxRadius * Math.sin(angle);
        c.save();
        c.beginPath();
        c.moveTo(centerX, centerY);
        c.lineTo(x, y);
        c.strokeStyle = '#1976d2';
        c.lineWidth = 2.2;
        c.globalAlpha = 0.85;
        c.shadowColor = '#90caf9';
        c.shadowBlur = 8;
        c.stroke();
        c.restore();
      }
    }

    function draw() {
      c.clearRect(0, 0, w, h);
      let centerX = w / 2;
      let centerY = h / 2;
      let maxRadius = Math.min(w, h) * 0.45;
      let numRadials = 16;
      let numRings = 7;
      let rotation = Math.sin(t / 120) * 0.12 + t * 0.002;
      drawWeb(centerX, centerY, maxRadius, numRadials, numRings, rotation);

      // Calculate Spiderman position on the outer ring
      const spiderAngle = rotation + Math.PI / 2; // Offset so he starts at top
      const spiderX = centerX + maxRadius * Math.cos(spiderAngle);
      const spiderY = centerY + maxRadius * Math.sin(spiderAngle);
      if (spidermanRef.current) {
        spidermanRef.current.style.left = `${spiderX - SPIDERMAN_SIZE / 2}px`;
        spidermanRef.current.style.top = `${spiderY - SPIDERMAN_SIZE / 2}px`;
        spidermanRef.current.style.transform = `rotate(${spiderAngle + Math.PI / 2}rad)`;
      }
      t += 1;
    }

    function loop() {
      draw();
      animationFrameId = window.requestAnimationFrame(loop);
    }

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }, 100);
    }

    // Start
    c = init('canvas').c;
    canvas = init('canvas').canvas;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    window.addEventListener('resize', handleResize);
    loop();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Comic-style Spiderman SVG
  return <>
    <canvas id="canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }}></canvas>
    <div
      ref={spidermanRef}
      style={{
        position: 'fixed',
        width: SPIDERMAN_SIZE,
        height: SPIDERMAN_SIZE,
        zIndex: -1,
        pointerEvents: 'none',
        transition: 'left 0.1s linear, top 0.1s linear',
      }}
    >
      <svg width={SPIDERMAN_SIZE} height={SPIDERMAN_SIZE} viewBox="0 0 60 60">
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
    </div>
  </>;
};

export default CanvasBG; 