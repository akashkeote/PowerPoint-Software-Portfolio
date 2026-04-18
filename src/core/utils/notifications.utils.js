export function showNotification(message) {
  const old = document.getElementById('ctx-toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'ctx-toast';
  toast.className = 'ctx-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => { toast.classList.add('show'); });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
