// ---- Context Menu Controller ----
// Responsibility: Show/hide/position menu + delegate actions
import { handleAction } from './context.menu.controller.js';

(function() {
  'use strict';

  const menu = document.getElementById('ppt-context-menu');
  if (!menu) return;

  let isVisible = false;

  // ---- Show / Position Menu ----
  function showMenu(e) {
    e.preventDefault();

    // Don't show in presentation mode or chatbot
    const presMode = document.getElementById('presentation-mode');
    if (presMode && presMode.classList.contains('active')) return;
    const chatPanel = e.target.closest('.chat-panel, .chat-messages, .chat-input');
    if (chatPanel) return;

    // Update theme label
    const isDark = document.body.classList.contains('dark-theme');
    const themeLabel = document.getElementById('ctx-theme-label');
    if (themeLabel) {
      themeLabel.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    // Position the menu
    const x = e.clientX;
    const y = e.clientY;
    const menuW = 240;
    const menuH = menu.offsetHeight || 380;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    menu.style.left = (x + menuW > winW ? x - menuW : x) + 'px';
    menu.style.top = (y + menuH > winH ? Math.max(0, y - menuH) : y) + 'px';

    menu.classList.add('visible');
    isVisible = true;
  }

  function hideMenu() {
    if (!isVisible) return;
    menu.classList.remove('visible');
    isVisible = false;
  }

  // ---- Event Listeners ----
  document.addEventListener('contextmenu', showMenu);
  document.addEventListener('click', hideMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideMenu();
  });
  window.addEventListener('scroll', hideMenu, true);
  window.addEventListener('resize', hideMenu);

  // Prevent context menu on the context menu itself
  menu.addEventListener('contextmenu', (e) => e.preventDefault());

  // ---- Delegate to action handler ----
  menu.addEventListener('click', (e) => {
    const item = e.target.closest('.ctx-item');
    if (!item) return;

    const action = item.dataset.action;
    handleAction(action);
    hideMenu();
  });

})();
