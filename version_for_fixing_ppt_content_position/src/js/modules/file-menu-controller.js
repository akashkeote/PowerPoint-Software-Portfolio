export function initFileMenuController() {
    const fileTab = document.getElementById('file-tab');
    const fileMenuOverlay = document.getElementById('file-menu-overlay');
    const fileBackBtn = document.getElementById('file-back-btn');
    
    if(fileTab && fileMenuOverlay && fileBackBtn) {
        fileTab.addEventListener('click', () => {
            fileMenuOverlay.style.display = 'flex';
            window.showFilePanel('home');
        });
        fileBackBtn.addEventListener('click', () => {
            fileMenuOverlay.style.display = 'none';
        });
    }

    window.showFilePanel = function(panel) {
        document.querySelectorAll('#file-menu-overlay .file-main').forEach(p => p.style.display = 'none');
        
        const target = document.getElementById('file-panel-' + panel);
        if(target) target.style.display = 'flex';
        
        document.querySelectorAll('#file-menu-overlay .file-nav-item').forEach(el => el.classList.remove('active'));
        const navItem = document.getElementById('file-nav-' + panel);
        if(navItem) navItem.classList.add('active');
        
        if(typeof feather !== 'undefined') feather.replace();
    }
}
