import { DESKTOP_STEPS } from './tutorial.desktop.js';
import { startTutorial } from './tutorial.flow.js';

export function initTutorial() {
  const isMobile = window.innerWidth <= 768;
  if (localStorage.getItem('tutorialGuideSeen') || isMobile) return;
  const guide = document.getElementById('tutorial-guide');
  if (!guide) return;

  setTimeout(startTutorial, 3500);
  window.startTutorialGuide = startTutorial;
  
  window.resetTutorial = function() {
    localStorage.removeItem('tutorialGuideSeen');
    localStorage.removeItem('swipeTutorialSeen');
    location.reload();
  };
}
