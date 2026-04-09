import React, { useState, useEffect } from 'react';
import { BootScreen } from './components/BootScreen';
import { TopRibbon } from './components/TopRibbon';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { MainCanvas } from './components/MainCanvas';

// Slide Components
import { TitleSlide } from './components/slides/TitleSlide';
import { SkillsSlide } from './components/slides/SkillsSlide';
import { ProjectsSlide } from './components/slides/ProjectsSlide';
import { ContactSlide } from './components/slides/ContactSlide';

const SLIDES = [
  { id: 'slide-1', title: 'Intro & About', component: <TitleSlide /> },
  { id: 'slide-2', title: 'Technical Skills', component: <SkillsSlide /> },
  { id: 'slide-3', title: 'AI Platform Project', component: <ProjectsSlide /> },
  { id: 'slide-4', title: 'Contact & Resume', component: <ContactSlide /> },
];

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Exit presentation mode
      if (e.key === 'Escape') {
        setIsPresentationMode(false);
      }
      
      // Right/Down/Space -> Next slide
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        setCurrentSlideIndex(prev => Math.min(prev + 1, SLIDES.length - 1));
      }
      // Left/Up -> Prev slide
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  // If in presentation mode, we only render the MainCanvas fullscreen
  // Ensure background color is fully black globally via full viewport styling.
  if (isPresentationMode) {
    return (
      <div className="bg-black w-screen h-screen overflow-hidden text-white absolute inset-0 z-50">
        <MainCanvas 
          currentSlide={SLIDES[currentSlideIndex]} 
          isPresentationMode={true} 
          onExitPresentation={() => setIsPresentationMode(false)}
        />
      </div>
    );
  }

  // Normal Editor Mode
  return (
    <div className="flex flex-col h-screen bg-[#1f1f1f] overflow-hidden text-[#e1e1e1] absolute inset-0">
      {/* Top Ribbon area mimicking MS Title bar + Tabs + Toolbar */}
      <TopRibbon onStartPresentation={() => setIsPresentationMode(true)} />

      {/* Main middle section with sidebar and canvas */}
      <div className="flex flex-1 overflow-hidden bg-[#1f1f1f]">
        <Sidebar 
          slides={SLIDES} 
          currentSlideIndex={currentSlideIndex} 
          onSlideSelect={setCurrentSlideIndex} 
        />
        <MainCanvas 
          currentSlide={SLIDES[currentSlideIndex]} 
          isPresentationMode={false} 
          onExitPresentation={() => {}} 
        />
      </div>

      {/* Bottom Status bar */}
      <StatusBar 
        currentSlide={currentSlideIndex} 
        totalSlides={SLIDES.length}
        onStartPresentation={() => setIsPresentationMode(true)}
      />
    </div>
  );
}

export default App;
