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

    // ── Background progress indicator in status bar ──
    function showBackgroundProgress() {
        const statusBar = document.querySelector('.status-bar .status-left');
        if (!statusBar) return;

        const indicator = document.createElement('span');
        indicator.id = 'bg-cache-indicator';
        indicator.style.cssText = 'display:inline-flex;align-items:center;gap:6px;color:#6366f1;font-size:10px;font-weight:500;transition:opacity 0.5s ease;';

        const dot = document.createElement('span');
        dot.style.cssText = 'width:5px;height:5px;border-radius:50%;background:#6366f1;animation:dotPulse 1.2s infinite;';

        const text = document.createElement('span');
        text.id = 'bg-cache-text';
        text.textContent = 'Optimizing...';

        indicator.appendChild(dot);
        indicator.appendChild(text);
        statusBar.appendChild(indicator);
    }

    function updateBackgroundIndicator(loaded, total) {
        const textEl = document.getElementById('bg-cache-text');
        if (textEl) {
            const pct = Math.round((loaded / total) * 100);
            textEl.textContent = 'Caching frames ' + pct + '%';
        }
    }

    function hideBackgroundIndicator() {
        const indicator = document.getElementById('bg-cache-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 500);
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
        }, 5000); // 5 sec after keyframes are ready
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
