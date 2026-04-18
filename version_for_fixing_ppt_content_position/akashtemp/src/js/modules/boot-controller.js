export function initBootSequence() {
    const bootStatus = document.getElementById('boot-status');
    const bootScreen = document.getElementById('boot-screen');
    const app = document.getElementById('app');

    if (!bootScreen || !app) return;

    setTimeout(() => {
        if (bootStatus) {
            bootStatus.textContent = 'Loading Akash_Developer_Portfolio.pptx...';
        }
    }, 800);

    let minBootTimePassed = false;
    setTimeout(() => { minBootTimePassed = true; }, 1800);

    function finishBoot() {
        bootScreen.classList.add('fade-out');
        app.classList.add('visible');
        setTimeout(() => { bootScreen.style.display = 'none'; }, 500);
    }

    window.onAllFramesCached = function () {
        if (minBootTimePassed) {
            finishBoot();
        } else {
            const checkInterval = setInterval(() => {
                if (minBootTimePassed) {
                    clearInterval(checkInterval);
                    finishBoot();
                }
            }, 100);
        }
    };

    window.updateBootProgress = function (loaded, total) {
        if (bootStatus) {
            bootStatus.textContent = 'Caching cinematic frames... ' + loaded + '/' + total;
        }
    };
}
