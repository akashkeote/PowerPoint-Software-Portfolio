import React from 'react';

const VideoSection = () => (
  <section className="video-section" id="video-section">

    <video id="hero-video" controls autoPlay muted loop>
      <source src="https://AkashKeote.github.io/Assets/spiderman-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </section>
);

export default VideoSection; 