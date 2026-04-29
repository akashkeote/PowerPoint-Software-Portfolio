export function initBootSequence() {
    const bootStatus = document.getElementById('boot-status');
    const bootScreen = document.getElementById('boot-screen');
    const app = document.getElementById('app');

    if (!bootScreen || !app) return;

    let bootFinished = false;

    setTimeout(() => {
        if (bootStatus) {
            bootStatus.textContent = 'Loading Akash_Developer_Portfolio.pptx...';
        }
    }, 800);

    // Minimum boot time for branding visibility
    let minBootTimePassed = false;
    setTimeout(() => { minBootTimePassed = true; }, 1800);

    function finishBoot() {
        if (bootFinished) return;
        bootFinished = true;

        bootScreen.classList.add('fade-out');
        app.classList.add('visible');
        setTimeout(() => { bootScreen.style.display = 'none'; }, 500);

        // If frames are still loading in background, show subtle status bar indicator
        if (!window._allFramesCached) {
            showBackgroundProgress();
        }
    }

    // ── VS Code-style thin progress bar on top of status bar ──
    function showBackgroundProgress() {
        const statusBar = document.querySelector('.status-bar');
        if (!statusBar) return;

        // Make status bar position relative for the absolute bar
        statusBar.style.position = 'relative';
        statusBar.style.overflow = 'hidden';

        const bar = document.createElement('div');
        bar.id = 'bg-cache-bar';
        bar.style.cssText = 'position:absolute;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,#c43e1c,#e06030,#c43e1c);transition:width 0.4s ease,opacity 0.5s ease;z-index:1;';

        // Shimmer overlay for the active loading feel
        const shimmer = document.createElement('div');
        shimmer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.3) 50%,transparent 100%);animation:bgShimmer 1.5s infinite;';
        bar.appendChild(shimmer);

        // Inject shimmer keyframes if not already present
        if (!document.getElementById('bg-shimmer-style')) {
            const style = document.createElement('style');
            style.id = 'bg-shimmer-style';
            style.textContent = '@keyframes bgShimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}';
            document.head.appendChild(style);
        }

        statusBar.appendChild(bar);
    }

    function updateBackgroundIndicator(loaded, total) {
        const bar = document.getElementById('bg-cache-bar');
        if (bar) {
            const pct = Math.round((loaded / total) * 100);
            bar.style.width = pct + '%';
        }
    }

    function hideBackgroundIndicator() {
        const bar = document.getElementById('bg-cache-bar');
        if (bar) {
            bar.style.width = '100%';
            setTimeout(() => {
                bar.style.opacity = '0';
                setTimeout(() => bar.remove(), 500);
            }, 300);
        }
    }

    // ── Boot triggers ──
    // Trigger 1: All frames cached → boot immediately (revisit / fast connection)
    window.onAllFramesCached = function () {
        window._allFramesCached = true;
        hideBackgroundIndicator();

        if (!bootFinished) {
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
        }
    };

    // Trigger 2: Keyframes ready → start 5 sec countdown for early boot
    window.onKeyframesReady = function () {
        setTimeout(() => {
            if (!bootFinished) {
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
            }
        }, 1200); // ~1.2s after keyframes → total boot ≈ 2-3 sec
    };

    // Boot screen progress display
    window.updateBootProgress = function (loaded, total) {
        if (bootStatus && !bootFinished) {
            bootStatus.textContent = 'Caching cinematic frames... ' + loaded + '/' + total;
        }

        // Also update background indicator if boot already finished
        if (bootFinished && !window._allFramesCached) {
            updateBackgroundIndicator(loaded, total);
        }
    };
}
