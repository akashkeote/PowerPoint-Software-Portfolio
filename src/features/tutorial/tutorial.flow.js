import { DESKTOP_STEPS } from './tutorial.desktop.js';
import { MOBILE_STEPS } from './tutorial.mobile.js';
import { preloadImages } from './tutorial.cache.js';
import { updateTutorialUI } from './tutorial.ui.js';

let currentStep = 0;
let steps = [];
export let tutorialActive = false;

function isMobile() { return window.innerWidth <= 768; }

export function startTutorial() {
  const guide = document.getElementById('tutorial-guide');
  if (!guide) return;
  steps = isMobile() ? MOBILE_STEPS : DESKTOP_STEPS;
  currentStep = 0;
  tutorialActive = true;
  preloadImages(steps);
  guide.classList.remove('fade-out'); guide.classList.add('active');
  showStep(0);

  const nextBtn = document.getElementById('tutorial-next');
  const skipBtn = document.getElementById('tutorial-skip');
  const backdrop = document.getElementById('tutorial-backdrop');

  nextBtn.replaceWith(nextBtn.cloneNode(true));
  skipBtn.replaceWith(skipBtn.cloneNode(true));
  backdrop.replaceWith(backdrop.cloneNode(true));

  document.getElementById('tutorial-next').addEventListener('click', nextStep);
  document.getElementById('tutorial-skip').addEventListener('click', endTutorial);
  document.getElementById('tutorial-backdrop').addEventListener('click', endTutorial);
}

export function showStep(index) {
  if (index >= steps.length) { endTutorial(); return; }
  currentStep = index;
  updateTutorialUI(steps[index], index, steps.length);
}

export function nextStep() { showStep(currentStep + 1); }

export function endTutorial() {
  const guide = document.getElementById('tutorial-guide');
  const highlight = document.getElementById('tutorial-highlight');
  guide.classList.add('fade-out');
  localStorage.setItem('tutorialGuideSeen', 'true');
  setTimeout(() => {
    guide.classList.remove('active', 'fade-out');
    highlight.style.display = 'none';
    tutorialActive = false;
  }, 500);
}
