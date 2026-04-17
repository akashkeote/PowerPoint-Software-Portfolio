// PowerPoint-style Custom Right-Click Context Menu
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

  // ---- Actions ----
  menu.addEventListener('click', (e) => {
    const item = e.target.closest('.ctx-item');
    if (!item) return;

    const action = item.dataset.action;

    switch (action) {
      case 'cut':
      case 'copy':
      case 'paste':
        // Fire native clipboard (won't work without selection, but feels authentic)
        try { document.execCommand(action); } catch (_) {}
        showNotification(capitalize(action) + ' — works when text is selected');
        break;

      case 'copy-slide-link': {
        const slideIndex = getCurrentSlideIndex();
        const slideNames = ['intro', 'about', 'skills', 'projects', 'contact'];
        const url = window.location.origin + window.location.pathname + '#slide-' + slideNames[slideIndex];
        copyToClipboard(url);
        showNotification('📋 Slide link copied to clipboard!');
        break;
      }

      case 'share': {
        const shareUrl = window.location.origin + window.location.pathname;
        if (navigator.share) {
          navigator.share({
            title: 'Akash K — PowerPoint Portfolio',
            text: 'Check out this PowerPoint-style developer portfolio!',
            url: shareUrl
          }).catch(() => {});
        } else {
          copyToClipboard(shareUrl);
          showNotification('🔗 Portfolio link copied! Share it anywhere.');
        }
        break;
      }

      case 'presentation':
        if (typeof startPresentation === 'function') {
          startPresentation();
        } else {
          // Fallback: trigger the button
          const btn = document.querySelector('.start-presentation-btn');
          if (btn) btn.click();
        }
        break;

      case 'fullscreen':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen();
        }
        break;

      case 'toggle-theme': {
        const themeBtn = document.querySelector('.theme-toggle-btn');
        if (themeBtn) themeBtn.click();
        break;
      }




      case 'view-source':
        window.open('https://github.com/TotalOverdose-ak', '_blank', 'noopener');
        break;

      default:
        break;
    }

    hideMenu();
  });

  // ---- Helpers ----
  function getCurrentSlideIndex() {
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) return 0;
    const slides = document.querySelectorAll('.slide-wrapper .slide');
    return Array.from(slides).indexOf(activeSlide);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Toast notification
  function showNotification(message) {
    // Remove old notification if present
    const old = document.getElementById('ctx-toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.id = 'ctx-toast';
    toast.className = 'ctx-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-remove
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

})();
