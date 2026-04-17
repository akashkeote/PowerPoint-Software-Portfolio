import { DESKTOP_STEPS, MOBILE_STEPS, preloadImages } from './state.js';
import { showStep, endTutorial } from './ui.js';

let currentStep = 0;
let steps = [];

function isMobile() {
  return window.innerWidth <= 768;
}

function startTutorial() {
  const guide = document.getElementById('tutorial-guide');
  if (!guide) return;

  steps = isMobile() ? MOBILE_STEPS : DESKTOP_STEPS;
  currentStep = 0;

  preloadImages(steps);

  guide.classList.remove('fade-out');
  guide.classList.add('active');
  
  const callbacks = {
    endTutorial: endTutorial
  };
  
  showStep(0, steps, callbacks);

  const nextBtn = document.getElementById('tutorial-next');
  const skipBtn = document.getElementById('tutorial-skip');
  const backdrop = document.getElementById('tutorial-backdrop');

  nextBtn.replaceWith(nextBtn.cloneNode(true));
  skipBtn.replaceWith(skipBtn.cloneNode(true));
  backdrop.replaceWith(backdrop.cloneNode(true));

  document.getElementById('tutorial-next').addEventListener('click', () => {
    currentStep++;
    showStep(currentStep, steps, callbacks);
  });
  document.getElementById('tutorial-skip').addEventListener('click', endTutorial);
  document.getElementById('tutorial-backdrop').addEventListener('click', endTutorial);
}

function init() {
  if (localStorage.getItem('tutorialGuideSeen')) return;
  if (isMobile()) return;

  setTimeout(() => {
    startTutorial();
  }, 3500);
}

// Global binds
window.startTutorialGuide = startTutorial;

window.resetTutorial = function() {
  localStorage.removeItem('tutorialGuideSeen');
  localStorage.removeItem('swipeTutorialSeen');
  location.reload();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
