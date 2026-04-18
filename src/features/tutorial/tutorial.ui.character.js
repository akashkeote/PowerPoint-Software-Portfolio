import { getCachedImage } from './tutorial.cache.js';

export function updateCharacterImage(step) {
  if (!step.charImage) return;
  const charImg = document.querySelector('#tutorial-character img');
  if (!charImg) return;
  
  charImg.style.transition = 'opacity 0.18s ease';
  charImg.style.opacity = '0';
  setTimeout(() => {
    const cached = getCachedImage(step.charImage);
    if (cached && cached.complete && cached.naturalWidth > 0) {
      charImg.src = step.charImage;
      charImg.style.opacity = '1';
    } else {
      const tempImg = new Image();
      tempImg.onload = () => { charImg.src = step.charImage; charImg.style.opacity = '1'; };
      tempImg.onerror = () => { charImg.src = step.charImage; charImg.style.opacity = '1'; };
      tempImg.src = step.charImage;
    }
  }, 180);
}
