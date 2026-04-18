export function showSwipeTutorial() {
    if (localStorage.getItem('swipeTutorialSeen')) return;
    const tutorial = document.getElementById('swipe-tutorial');
    if (!tutorial) return;

    setTimeout(() => {
        tutorial.classList.add('active');
        localStorage.setItem('swipeTutorialSeen', 'true');

        const autoDismiss = setTimeout(() => dismissTutorial(tutorial), 4000);

        tutorial.addEventListener('click', () => {
            clearTimeout(autoDismiss);
            dismissTutorial(tutorial);
        }, { once: true });
    }, 1000);
}

export function dismissTutorial(el) {
    if (!el.classList.contains('active')) return;
    el.classList.add('fade-out');
    setTimeout(() => {
        el.classList.remove('active', 'fade-out');
    }, 500);
}

export function checkMobileMode(MOBILE_BREAKPOINT, startPresentation) {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
        const presMode = document.getElementById('presentation-mode');
        if (presMode && !presMode.classList.contains('active')) {
            startPresentation();
            showSwipeTutorial();
        }
    }
}
