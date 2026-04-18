export function initThemeController() {
    window.toggleTheme = toggleTheme; // Expose for inline handlers
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });
    
    checkTheme();
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('ppt-theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function checkTheme() {
    const savedTheme = localStorage.getItem('ppt-theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        updateThemeIcon(false);
    } else {
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
    }
}

function updateThemeIcon(isDark) {
    const iconBtns = document.querySelectorAll('.theme-icon');
    if (iconBtns.length > 0) {
        iconBtns.forEach(iconBtn => {
            if (isDark) {
                iconBtn.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
                iconBtn.setAttribute('stroke', '#00f6ff');
            } else {
                iconBtn.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
                iconBtn.setAttribute('stroke', '#6366f1');
            }
        });
    }
}
