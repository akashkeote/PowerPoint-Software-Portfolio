export function positionHighlight(step, highlight) {
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
}
