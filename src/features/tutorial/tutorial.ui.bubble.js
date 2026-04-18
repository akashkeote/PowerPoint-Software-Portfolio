export function positionBubble(step) {
  const container = document.getElementById('tutorial-container');
  if (container) {
    container.className = 'tutorial-container';
    container.classList.add('pos-' + step.charPos);
  }

  const bubble = document.getElementById('tutorial-bubble');
  if (bubble) {
    bubble.classList.remove('animate-in');
    void bubble.offsetWidth;
    bubble.classList.add('animate-in');
  }
}
