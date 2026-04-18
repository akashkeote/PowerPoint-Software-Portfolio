import { updateCharacterImage } from './tutorial.ui.character.js';
import { positionHighlight } from './tutorial.ui.highlight.js';
import { positionBubble } from './tutorial.ui.bubble.js';

export function updateTutorialUI(step, index, totalSteps) {
  const bubbleText = document.getElementById('tutorial-bubble-text');
  const counter = document.getElementById('tutorial-step-counter');
  const nextBtn = document.getElementById('tutorial-next');
  const highlight = document.getElementById('tutorial-highlight');
  
  if (!bubbleText || !counter || !nextBtn || !highlight) return;

  bubbleText.innerHTML = step.text;
  counter.textContent = `${index + 1} / ${totalSteps}`;
  nextBtn.textContent = index === totalSteps - 1 ? "Got it! ✓" : "Next →";

  updateCharacterImage(step);
  positionHighlight(step, highlight);
  positionBubble(step);
}
