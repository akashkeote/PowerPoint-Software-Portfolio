
    const TOTAL_SLIDES = 5;
    let currentSlide = 0;
    let presSlide = 0;

    // ---- BOOT SEQUENCE ----
    const bootStatus = document.getElementById('boot-status');
    const bootScreen = document.getElementById('boot-screen');
    const app = document.getElementById('app');

    setTimeout(() => {
      bootStatus.textContent = 'Loading Akash_Developer_Portfolio.pptx...';
    }, 800);

    setTimeout(() => {
      bootScreen.classList.add('fade-out');
      app.classList.add('visible');
    }, 2600);

    setTimeout(() => {
      bootScreen.style.display = 'none';
    }, 3100);

    // ---- SLIDE NAVIGATION (EDITOR) ----
    function goToSlide(n) {
      const slides = document.querySelectorAll('.slide-wrapper .slide');
      const thumbs = document.querySelectorAll('.slide-thumb');
      const slideCount = document.getElementById('slide-count');

      slides.forEach(s => s.classList.remove('active'));
      thumbs.forEach(t => t.classList.remove('active'));

      currentSlide = Math.max(0, Math.min(n, TOTAL_SLIDES - 1));
      slides[currentSlide].classList.add('active');
      thumbs[currentSlide].classList.add('active');
      slideCount.textContent = `Slide ${currentSlide + 1} of ${TOTAL_SLIDES}`;
    }

    document.querySelectorAll('.slide-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        goToSlide(parseInt(thumb.dataset.slide));
      });
    });

    // ---- PRESENTATION MODE ----
    const presMode = document.getElementById('presentation-mode');
    const presProgress = document.getElementById('pres-progress');

    function startPresentation() {
      presMode.classList.add('active');
      goToPresSlide(currentSlide);
    }

    function exitPresentation() {
      presMode.classList.remove('active');
    }

    function goToPresSlide(n, resetScrub = true) {
      const slides = document.querySelectorAll('#presentation-mode .pres-slide');
      slides.forEach(s => s.classList.remove('active'));
      presSlide = Math.max(0, Math.min(n, TOTAL_SLIDES - 1));
      slides[presSlide].classList.add('active');
      const pct = ((presSlide + 1) / TOTAL_SLIDES) * 100;
      presProgress.style.width = pct + '%';
      
      const presModeEl = document.getElementById('presentation-mode');
      if (presModeEl) {
        presModeEl.classList.add('is-transitioning');
        clearTimeout(window.presTransitionTimeout);
        window.presTransitionTimeout = setTimeout(() => {
          presModeEl.classList.remove('is-transitioning');
        }, 1500); // 1.5s visibility overlap during scrub
      }

      // Update target scrubber frame if defined globally or locally
      if (resetScrub && typeof window.virtualScrollPos !== 'undefined') {
        const slideAnchors = [0, 43, 87, 130, 173];
        const VIRTUAL_SCROLL_HEIGHT = 4000;
        const SCRUB_TOTAL_FRAMES = 174;
        const targetFrame = slideAnchors[presSlide];
        window.virtualScrollPos = (targetFrame / (SCRUB_TOTAL_FRAMES - 1)) * VIRTUAL_SCROLL_HEIGHT;
        window.targetScrubFrame = targetFrame;
      }

      // Update canvas on mobile (lightweight keyframe jump)
      if (typeof window.mobileScrubToSlide === 'function') {
        window.mobileScrubToSlide(presSlide);
      }
    }

    document.querySelectorAll('.start-presentation-btn').forEach(btn => btn.addEventListener('click', startPresentation));
    document.getElementById('status-present-btn').addEventListener('click', startPresentation);
    document.querySelectorAll('.download-engineering-notes-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.open('https://drive.google.com/drive/folders/14gwS2GpMkEbUhupOc-_rJtEkGLhwNldQ', '_blank', 'noopener,noreferrer');
      });
    });

    document.querySelectorAll('.download-resume-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.open('https://drive.google.com/drive/folders/1ID1uHzPu7DBdMX9e4SsYGLmeYbclXA76?usp=drive_link', '_blank', 'noopener,noreferrer');
      });
    });

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // ---- DARK / LIGHT THEME LOGIC ----
    function toggleTheme() {
      const isDark = document.body.classList.toggle('dark-theme');
      localStorage.setItem('ppt-theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    }

    function checkTheme() {
      const savedTheme = localStorage.getItem('ppt-theme');
      
      // Default to dark mode ALWAYS unless user explicitly saved light mode
      if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        updateThemeIcon(false);
      } else {
        // Dark mode by default for all devices
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
      }
    }

    function updateThemeIcon(isDark) {
      const iconBtns = document.querySelectorAll('.theme-icon');
      if (iconBtns.length > 0) {
        iconBtns.forEach(iconBtn => {
        if (isDark) {
          // Moon icon
          iconBtn.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
          iconBtn.setAttribute('stroke', '#00f6ff'); // Cyan for dark mode
        } else {
          // Sun icon
          iconBtn.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
          iconBtn.setAttribute('stroke', '#6366f1'); // Indigo for light mode
        }
        });
      }
    }

    // Initialize check
    checkTheme();

    // ---- KEYBOARD NAVIGATION ----
    document.addEventListener('keydown', e => {
      const inPres = presMode.classList.contains('active');
      if (e.key === 'Escape') { exitPresentation(); return; }
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
        if (inPres) goToPresSlide(presSlide + 1);
        else goToSlide(currentSlide + 1);
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        if (inPres) goToPresSlide(presSlide - 1);
        else goToSlide(currentSlide - 1);
      }
    });

    // ---- RIBBON TAB INTERACTION ----
    const ribbonToolbar = document.getElementById('ribbon-toolbar');
    document.querySelectorAll('.ribbon-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.ribbon-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Hide all tab contents
        document.querySelectorAll('.ribbon-tab-content').forEach(tc => tc.style.display = 'none');
        
        const targetId = 'tab-' + tab.textContent.trim();
        const targetContent = document.getElementById(targetId);
        
        if (targetContent) {
          targetContent.style.display = 'flex';
          ribbonToolbar.style.opacity = '1';
          ribbonToolbar.style.pointerEvents = 'auto';
        } else {
          // Mock WIP state for tabs without created content, fallback to Home
          const homeTab = document.getElementById('tab-Home');
          if (homeTab) homeTab.style.display = 'flex';
          ribbonToolbar.style.opacity = '1'; /* Keep toolbar active */
          ribbonToolbar.style.pointerEvents = 'auto';
        }
      });
    });


    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }

    // ---- ZOOM LOGIC ----
    const zoomBar = document.getElementById('zoom-bar');
    const zoomThumb = document.getElementById('zoom-thumb');
    const zoomLabel = document.getElementById('zoom-label');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomFitBtn = document.getElementById('zoom-fit-btn');
    const slideWrapper = document.querySelector('.slide-wrapper');
    let currentZoom = 0.72; // default 72%
    let isDraggingZoom = false;

    function setZoom(z) {
      z = Math.max(0.1, Math.min(z, 2.0));
      currentZoom = z;
      const percent = (z - 0.1) / 1.9;
      zoomThumb.style.left = `${percent * 100}%`;
      zoomLabel.textContent = `${Math.round(z * 100)}%`;
      if (slideWrapper) {
        slideWrapper.style.transform = `scale(${z})`;
        slideWrapper.style.transformOrigin = 'center center';
        slideWrapper.style.transition = 'transform 0.1s ease-out';
      }
    }

    zoomBar.addEventListener('mousedown', (e) => {
      isDraggingZoom = true;
      updateZoomFromEvent(e);
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDraggingZoom) return;
      updateZoomFromEvent(e);
    });
    
    document.addEventListener('mouseup', () => {
      isDraggingZoom = false;
    });

    function updateZoomFromEvent(e) {
      const rect = zoomBar.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = x / rect.width;
      let z = 0.1 + (percent * 1.9);
      setZoom(z);
    }
    
    zoomOutBtn.addEventListener('click', () => setZoom(currentZoom - 0.1));
    zoomInBtn.addEventListener('click', () => setZoom(currentZoom + 0.1));
    zoomFitBtn.addEventListener('click', () => setZoom(0.72));

    // Initialize zoom position
    setZoom(currentZoom);

    // ---- END ZOOM LOGIC ----

    // ---- FILE MENU LOGIC ----
    const fileTab = document.getElementById('file-tab');
    const fileMenuOverlay = document.getElementById('file-menu-overlay');
    const fileBackBtn = document.getElementById('file-back-btn');
    if(fileTab && fileMenuOverlay && fileBackBtn) {
      fileTab.addEventListener('click', () => {
        fileMenuOverlay.style.display = 'flex';
        showFilePanel('home');
      });
      fileBackBtn.addEventListener('click', () => {
        fileMenuOverlay.style.display = 'none';
      });
    }

    window.showFilePanel = function(panel) {
      // Hide all panels
      document.querySelectorAll('#file-menu-overlay .file-main').forEach(p => p.style.display = 'none');
      // Show selected
      const target = document.getElementById('file-panel-' + panel);
      if(target) target.style.display = 'flex';
      // Update active nav items
      document.querySelectorAll('#file-menu-overlay .file-nav-item').forEach(el => el.classList.remove('active'));
      const navItem = document.getElementById('file-nav-' + panel);
      if(navItem) navItem.classList.add('active');
      // Re-init feather icons in case new icons appeared
      if(typeof feather !== 'undefined') feather.replace();
    }

    // Auto-start presentation mode on mobile/tablet screens for better UX after boot screen
    const MOBILE_BREAKPOINT = 768;

    function checkMobileMode() {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        if (!presMode.classList.contains('active')) {
          startPresentation();
          showSwipeTutorial();
        }
      }
    }

    setTimeout(checkMobileMode, 3200);

    // Swipe Tutorial Logic — show once per visitor on mobile
    function showSwipeTutorial() {
      if (localStorage.getItem('swipeTutorialSeen')) return;
      const tutorial = document.getElementById('swipe-tutorial');
      if (!tutorial) return;

      setTimeout(() => {
        tutorial.classList.add('active');
        localStorage.setItem('swipeTutorialSeen', 'true');

        // Auto-dismiss after 4 seconds
        const autoDismiss = setTimeout(() => dismissTutorial(tutorial), 4000);

        // Dismiss on tap
        tutorial.addEventListener('click', () => {
          clearTimeout(autoDismiss);
          dismissTutorial(tutorial);
        }, { once: true });
      }, 1000);
    }

    function dismissTutorial(el) {
      if (!el.classList.contains('active')) return;
      el.classList.add('fade-out');
      setTimeout(() => {
        el.classList.remove('active', 'fade-out');
      }, 500);
    }

    // Handle resize / orientation changes
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
          if (!presMode.classList.contains('active')) {
            startPresentation();
          }
        }
      }, 300);
    });

    // Touch swipe navigation for presentation mode
    let touchStartX = 0;
    let touchStartY = 0;

    presMode.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    presMode.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Only trigger if horizontal swipe is dominant (not vertical scrolling)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX < 0) {
          goToPresSlide(presSlide + 1); // swipe left = next
        } else {
          goToPresSlide(presSlide - 1); // swipe right = prev
        }
      }
    }, { passive: true });



// ==========================================
// 🌌 CINEMATIC CANVAS SCRUBBER (TRUE SCROLLYTELLING)
// ==========================================
window.virtualScrollPos = 0;
window.targetScrubFrame = 0;

(function initScrubber() {
  const SCRUB_TOTAL_FRAMES = 174;
  const SCRUB_SMOOTHNESS = 0.08;
  const VIRTUAL_SCROLL_HEIGHT = 4000;
  const slideAnchors = [0, 43, 87, 130, 173];
  const IS_MOBILE = window.innerWidth <= 768;
  const CACHE_NAME = 'ppt-scrub-frames-v1';
  
  // Mobile: smaller batch, longer yield to avoid janking the UI
  const BATCH_SIZE = IS_MOBILE ? 2 : 4;
  const BATCH_YIELD_MS = IS_MOBILE ? 80 : 16;
  
  const scrubImages = [];
  let currentScrubFrame = 0;
  let scrubCanvas = document.getElementById('hero-scrub-canvas');
  let scrubCtx = scrubCanvas ? scrubCanvas.getContext('2d') : null;
  let scrubberLoaded = false;
  let renderLoopRunning = false;
  let presModeEl = document.getElementById('presentation-mode');
  let presProgress = document.querySelector('.pres-progress');
  
  if (!scrubCanvas || !scrubCtx) return;

  function handleScrubResize() {
    scrubCanvas.width = window.innerWidth;
    scrubCanvas.height = window.innerHeight;
    drawScrubFrame(Math.round(currentScrubFrame));
  }
  
  window.addEventListener('resize', handleScrubResize);
  handleScrubResize();

  let loadedCount = 0;

  // ---- CACHE-FIRST FRAME LOADING ----
  async function loadSingleFrame(index) {
    const num = index.toString().padStart(3, '0');
    const url = '/sequence/frame_' + num + '_delay-0.033s.webp';
    
    try {
      let blob = null;
      
      if ('caches' in window) {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
          blob = await cachedResponse.blob();
        } else {
          const networkResponse = await fetch(url);
          const clonedResponse = networkResponse.clone();
          cache.put(url, clonedResponse);
          blob = await networkResponse.blob();
        }
      } else {
        const res = await fetch(url, { cache: 'force-cache' });
        blob = await res.blob();
      }
      
      const bitmap = await createImageBitmap(blob);
      scrubImages[index] = bitmap;
      loadedCount++;
    } catch (err) {
      console.log('Frame skip: ' + index);
    }
  }

  // ---- PROGRESSIVE LOADING STRATEGY ----
  async function preloadScrubSequence() {
    for (const index of slideAnchors) {
      await loadSingleFrame(index);
    }
    
    scrubberLoaded = true;
    drawScrubFrame(slideAnchors[0]);
    startRenderLoop();

    for (let i = 0; i < SCRUB_TOTAL_FRAMES; i += BATCH_SIZE) {
      const batchPromises = [];
      for (let j = 0; j < BATCH_SIZE && (i + j) < SCRUB_TOTAL_FRAMES; j++) {
        const index = i + j;
        if (scrubImages[index]) continue;
        batchPromises.push(loadSingleFrame(index));
      }
      if (batchPromises.length > 0) {
        await Promise.all(batchPromises);
        await new Promise(r => setTimeout(r, BATCH_YIELD_MS));
      }
    }
    console.log('[Scrubber] All ' + loadedCount + ' frames loaded' + (IS_MOBILE ? ' (mobile)' : ''));
  }

  // ---- MOBILE SLIDE SYNC ----
  window.mobileScrubToSlide = function(slideIndex) {
    if (!scrubberLoaded) return;
    const targetFrame = slideAnchors[Math.max(0, Math.min(slideIndex, slideAnchors.length - 1))];
    window.targetScrubFrame = targetFrame;
    if (IS_MOBILE) {
      currentScrubFrame = targetFrame;
      drawScrubFrame(targetFrame);
    }
  };

  preloadScrubSequence();
  
  // ---- DESKTOP: WHEEL SCRUBBING ----
  presModeEl.addEventListener('wheel', (e) => {
    if (!presModeEl.classList.contains('active')) return;
    
    const path = e.composedPath();
    const isProjectScroll = path.some(el => el.classList && el.classList.contains('s-projects'));
    const projGrid = document.querySelector('#presentation-mode .s-projects');
    
    if (isProjectScroll && projGrid) {
        const isAtTop = projGrid.scrollTop <= 0;
        const isAtBottom = projGrid.scrollTop + projGrid.clientHeight >= projGrid.scrollHeight - 2;
        if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
            return;
        }
    }
    
    e.preventDefault();
    window.virtualScrollPos += e.deltaY;
    window.virtualScrollPos = Math.max(0, Math.min(window.virtualScrollPos, VIRTUAL_SCROLL_HEIGHT));
    window.targetScrubFrame = (window.virtualScrollPos / VIRTUAL_SCROLL_HEIGHT) * (SCRUB_TOTAL_FRAMES - 1);
    
    let mappedSlide = 0;
    for (let i = slideAnchors.length - 1; i >= 0; i--) {
       if (window.targetScrubFrame >= slideAnchors[i] - 11) { mappedSlide = i; break; }
    }
    
    if (mappedSlide !== presSlide) {
        goToPresSlide(mappedSlide, false);
    }
  }, { passive: false });

  // ---- RENDER LOOP ----
  function startRenderLoop() {
    if (renderLoopRunning) return;
    renderLoopRunning = true;
    renderScrubberLoop();
  }

  function renderScrubberLoop() {
    if (presModeEl.classList.contains('active')) {
       currentScrubFrame += (window.targetScrubFrame - currentScrubFrame) * SCRUB_SMOOTHNESS;
       currentScrubFrame = Math.max(0, Math.min(currentScrubFrame, SCRUB_TOTAL_FRAMES - 1));
       drawScrubFrame(Math.round(currentScrubFrame));
    }
    requestAnimationFrame(renderScrubberLoop);
  }

  // ---- DRAW FRAME ----
  function drawScrubFrame(index) {
    index = Math.max(0, Math.min(index, SCRUB_TOTAL_FRAMES - 1));
    let img = scrubImages[index];
    
    if (!img || img.width === 0) {
      for (let offset = 1; offset < SCRUB_TOTAL_FRAMES; offset++) {
        if (scrubImages[index - offset] && scrubImages[index - offset].width > 0) {
          img = scrubImages[index - offset];
          break;
        }
        if (scrubImages[index + offset] && scrubImages[index + offset].width > 0) {
          img = scrubImages[index + offset];
          break;
        }
      }
      if (!img || img.width === 0) return;
    }
    
    const scale = Math.max(scrubCanvas.width / img.width, scrubCanvas.height / img.height);
    const x = (scrubCanvas.width / 2) - (img.width / 2) * scale;
    const y = (scrubCanvas.height / 2) - (img.height / 2) * scale;
    
    scrubCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }
})();
