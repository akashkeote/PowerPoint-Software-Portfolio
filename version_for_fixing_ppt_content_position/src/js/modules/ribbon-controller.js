export function initRibbonController() {
    const ribbonToolbar = document.getElementById('ribbon-toolbar');
    document.querySelectorAll('.ribbon-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.ribbon-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.ribbon-tab-content').forEach(tc => tc.style.display = 'none');
            
            const targetId = 'tab-' + tab.textContent.trim();
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.style.display = 'flex';
                if (ribbonToolbar) {
                    ribbonToolbar.style.opacity = '1';
                    ribbonToolbar.style.pointerEvents = 'auto';
                }
            } else {
                const homeTab = document.getElementById('tab-Home');
                if (homeTab) homeTab.style.display = 'flex';
                if (ribbonToolbar) {
                    ribbonToolbar.style.opacity = '1';
                    ribbonToolbar.style.pointerEvents = 'auto';
                }
            }
        });
    });
}
