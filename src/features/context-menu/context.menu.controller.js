import { handleClipboardAction, handleCopySlideLink, handleShare } from './context.menu.actions.js';

export function handleAction(action) {
  switch (action) {
    case 'cut':
    case 'copy':
    case 'paste':
      handleClipboardAction(action); break;
    case 'copy-slide-link':
      handleCopySlideLink(); break;
    case 'share':
      handleShare(); break;
    case 'presentation':
      if (typeof startPresentation === 'function') startPresentation();
      else { const btn = document.querySelector('.start-presentation-btn'); if (btn) btn.click(); }
      break;
    case 'fullscreen':
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
      else document.exitFullscreen();
      break;
    case 'toggle-theme': {
      const themeBtn = document.querySelector('.theme-toggle-btn');
      if (themeBtn) themeBtn.click();
      break;
    }
    case 'view-source':
      window.open('https://github.com/TotalOverdose-ak', '_blank', 'noopener');
      break;
  }
}
