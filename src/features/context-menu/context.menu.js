import { handleAction } from './context.menu.controller.js';
import { positionContextMenu } from './context.menu.ui.js';

(function() {
  'use strict';
  const menu = document.getElementById('ppt-context-menu');
  if (!menu) return;

  let isVis = false;

  function showMenu(e) {
    e.preventDefault();
    const presMode = document.getElementById('presentation-mode');
    if (presMode && presMode.classList.contains('active')) return;
    if (e.target.closest('.chat-panel, .chat-messages, .chat-input')) return;

    const isDark = document.body.classList.contains('dark-theme');
    const themeLbl = document.getElementById('ctx-theme-label');
    if (themeLbl) themeLbl.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    positionContextMenu(menu, e);
    menu.classList.add('visible');
    isVis = true;
  }

  function hideMenu() {
    if (!isVis) return;
    menu.classList.remove('visible');
    isVis = false;
  }

  document.addEventListener('contextmenu', showMenu);
  document.addEventListener('click', hideMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideMenu(); });
  window.addEventListener('scroll', hideMenu, true);
  window.addEventListener('resize', hideMenu);
  menu.addEventListener('contextmenu', (e) => e.preventDefault());

  menu.addEventListener('click', (e) => {
    const item = e.target.closest('.ctx-item');
    if (!item) return;
    handleAction(item.dataset.action);
    hideMenu();
  });
})();
