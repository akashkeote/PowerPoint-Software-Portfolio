import { copyToClipboard } from '../../core/utils/clipboard.utils.js';
import { showNotification } from '../../core/utils/notifications.utils.js';
import { capitalize, getCurrentSlideIndex } from '../../core/utils/utils.js';

export function handleClipboardAction(action) {
  try { document.execCommand(action); } catch (_) {}
  showNotification(capitalize(action) + ' — works when text is selected');
}

export function handleCopySlideLink() {
  const slideIndex = getCurrentSlideIndex();
  const slideNames = ['intro', 'about', 'skills', 'projects', 'contact'];
  const url = window.location.origin + window.location.pathname + '#slide-' + slideNames[slideIndex];
  copyToClipboard(url);
  showNotification('📋 Slide link copied to clipboard!');
}

export function handleShare() {
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
}
