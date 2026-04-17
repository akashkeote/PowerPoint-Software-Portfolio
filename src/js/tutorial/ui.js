import { imageCache } from './state.js';

export function positionCharacter(pos, hasTarget) {
  const container = document.getElementById('tutorial-container');
  if(!container) return;
  container.className = 'tutorial-container';
  container.classList.add('pos-' + pos);
}

export function showStep(index, steps, callbacks) {
  if (index >= steps.length) {
    callbacks.endTutorial();
    return;
  }

  const step = steps[index];
  const bubbleText = document.getElementById('tutorial-bubble-text');
  const counter = document.getElementById('tutorial-step-counter');
  const nextBtn = document.getElementById('tutorial-next');
  const highlight = document.getElementById('tutorial-highlight');
  
  if(!bubbleText || !counter || !nextBtn || !highlight) return;

  bubbleText.innerHTML = step.text;
  counter.textContent = `${index + 1} / ${steps.length}`;
  nextBtn.textContent = index === steps.length - 1 ? "Got it! ✓" : "Next →";

  if (step.charImage) {
    const charImg = document.querySelector('#tutorial-character img');
    if (charImg) {
      charImg.style.transition = 'opacity 0.18s ease';
      charImg.style.opacity = '0';
      setTimeout(() => {
        const cached = imageCache.get(step.charImage);
        if (cached && cached.complete && cached.naturalWidth > 0) {
          charImg.src = step.charImage;
          charImg.style.opacity = '1';
        } else {
          const tempImg = new Image();
          tempImg.onload = () => {
            charImg.src = step.charImage;
            charImg.style.opacity = '1';
          };
          tempImg.onerror = () => {
            charImg.src = step.charImage;
            charImg.style.opacity = '1';
          };
          tempImg.src = step.charImage;
        }
      }, 180);
    }
  }

  if (step.target) {
    const targetEl = document.querySelector(step.target);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      highlight.style.display = 'block';
      highlight.style.top = (rect.top - 6) + 'px';
      highlight.style.left = (rect.left - 6) + 'px';
      highlight.style.width = (rect.width + 12) + 'px';
      highlight.style.height = (rect.height + 12) + 'px';
    }
  } else if (step.tabTarget) {
    const tabs = document.querySelectorAll('.ribbon-tab');
    tabs.forEach(tab => {
      if (tab.textContent.trim() === step.tabTarget) {
        const rect = tab.getBoundingClientRect();
        highlight.style.display = 'block';
        highlight.style.top = (rect.top - 4) + 'px';
        highlight.style.left = (rect.left - 4) + 'px';
        highlight.style.width = (rect.width + 8) + 'px';
        highlight.style.height = (rect.height + 8) + 'px';
      }
    });
  } else {
    highlight.style.display = 'none';
  }

  positionCharacter(step.charPos, step.target || step.tabTarget ? true : false);

  const bubble = document.getElementById('tutorial-bubble');
  bubble.classList.remove('animate-in');
  void bubble.offsetWidth;
  bubble.classList.add('animate-in');
}

export function endTutorial() {
  const guide = document.getElementById('tutorial-guide');
  const highlight = document.getElementById('tutorial-highlight');
  if(!guide) return;

  guide.classList.add('fade-out');
  localStorage.setItem('tutorialGuideSeen', 'true');

  setTimeout(() => {
    guide.classList.remove('active', 'fade-out');
    if(highlight) highlight.style.display = 'none';
  }, 500);
}
