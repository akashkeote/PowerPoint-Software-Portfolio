// Tutorial Guide - Step-by-step walkthrough with character mascot
(function() {
  'use strict';

  // Preload cache for guide images
  const imageCache = new Map();

  function preloadImages(steps) {
    const urls = new Set();
    steps.forEach(s => { if (s.charImage) urls.add(s.charImage); });
    urls.forEach(url => {
      if (!imageCache.has(url)) {
        const img = new Image();
        img.src = url;
        imageCache.set(url, img);
      }
    });
  }

  // Tutorial steps configuration
  // Each step has: text, target (CSS selector to highlight), position of character
  const DESKTOP_STEPS = [
    {
      text: "Welcome to Akash's Portfolio! 👋 I'll give you a quick tour of this PowerPoint-style interface. Let's go!",
      target: null,
      charPos: 'center',
      charImage: '/images/guide-welcome.png'
    },
    {
      text: "This <b>Ribbon</b> works just like Microsoft PowerPoint! Click different tabs to explore.",
      target: '.ribbon-tabs',
      charPos: 'bottom-right',
      charImage: '/images/guide-point.png'
    },
    {
      text: "Use the <b>Sidebar</b> on the left to quickly jump between slides — just like in real PowerPoint!",
      target: '.sidebar',
      charPos: 'right',
      charImage: '/images/guide-map.png'
    },
    {
      text: "The main <b>Slide Canvas</b> shows the current slide content. Each slide is a section of my portfolio.",
      target: '.canvas-area',
      charPos: 'right',
      charImage: '/images/guide-explore.png'
    },
    {
      text: "Click <b>Start Presentation</b> to launch full-screen slideshow mode — the best way to view my portfolio!",
      target: '.start-presentation-btn',
      charPos: 'bottom-right',
      charImage: '/images/guide-plan.png'
    },
    {
      text: "Toggle between <b>🌙 Dark</b> and <b>☀️ Light</b> mode using the theme button in the title bar!",
      target: '.theme-toggle-btn',
      charPos: 'bottom-right',
      charImage: '/images/guide-thumbsup.png'
    },
    {
      text: "Click the <b>▶ play icon</b> here to open the <b>current slide in full-screen slideshow</b> mode — view any slide in full size instantly!",
      target: '#status-present-btn',
      charPos: 'left',
      charImage: '/images/guide-point.png'
    },
    {
      text: "Need help? Click the <b>CHAT</b> button in the top bar to talk to my AI assistant! That's all — enjoy exploring! 🚀",
      target: '#open-chat-btn',
      charPos: 'bottom-right',
      charImage: '/images/guide-welcome.png'
    }
  ];

  const MOBILE_STEPS = [
    {
      text: "Welcome! 👋 This portfolio is in <b>Slideshow Mode</b> on mobile for the best experience!",
      target: null,
      charPos: 'center',
      charImage: '/images/guide-welcome.png'
    },
    {
      text: "Swipe <b>left</b> or <b>right</b> to navigate between slides. Each slide is a section of my portfolio!",
      target: null,
      charPos: 'center',
      charImage: '/images/guide-point.png'
    },
    {
      text: "That's it! Enjoy exploring my projects, skills, and more. Have fun! 🚀",
      target: null,
      charPos: 'center',
      charImage: '/images/guide-thumbsup.png'
    }
  ];

  let currentStep = 0;
  let steps = [];
  let tutorialActive = false;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function init() {
    // Don't show if already seen
    if (localStorage.getItem('tutorialGuideSeen')) return;

    // On mobile, skip the character guide — the simple swipe tutorial handles onboarding
    if (isMobile()) return;

    const guide = document.getElementById('tutorial-guide');
    if (!guide) return;

    steps = DESKTOP_STEPS;
    currentStep = 0;

    // Wait for boot screen to finish
    const bootDelay = 3500;
    setTimeout(() => {
      startTutorial();
    }, bootDelay);
  }

  function startTutorial() {
    const guide = document.getElementById('tutorial-guide');
    if (!guide) return;

    steps = isMobile() ? MOBILE_STEPS : DESKTOP_STEPS;
    currentStep = 0;
    tutorialActive = true;

    // Preload all step images into browser cache
    preloadImages(steps);

    guide.classList.remove('fade-out');
    guide.classList.add('active');
    showStep(0);

    // Setup event listeners (remove old ones first to avoid duplicates)
    const nextBtn = document.getElementById('tutorial-next');
    const skipBtn = document.getElementById('tutorial-skip');
    const backdrop = document.getElementById('tutorial-backdrop');

    nextBtn.replaceWith(nextBtn.cloneNode(true));
    skipBtn.replaceWith(skipBtn.cloneNode(true));
    backdrop.replaceWith(backdrop.cloneNode(true));

    document.getElementById('tutorial-next').addEventListener('click', nextStep);
    document.getElementById('tutorial-skip').addEventListener('click', endTutorial);
    document.getElementById('tutorial-backdrop').addEventListener('click', endTutorial);
  }

  // Expose globally so the ribbon button can trigger it
  window.startTutorialGuide = function() {
    startTutorial();
  };

  function showStep(index) {
    if (index >= steps.length) {
      endTutorial();
      return;
    }

    currentStep = index;
    const step = steps[index];
    const bubbleText = document.getElementById('tutorial-bubble-text');
    const counter = document.getElementById('tutorial-step-counter');
    const nextBtn = document.getElementById('tutorial-next');
    const highlight = document.getElementById('tutorial-highlight');
    const container = document.getElementById('tutorial-container');

    // Update text
    bubbleText.innerHTML = step.text;
    counter.textContent = `${index + 1} / ${steps.length}`;
    nextBtn.textContent = index === steps.length - 1 ? "Got it! ✓" : "Next →";

    // Swap character image per step
    if (step.charImage) {
      const charImg = document.querySelector('#tutorial-character img');
      if (charImg) {
        charImg.style.transition = 'opacity 0.18s ease';
        charImg.style.opacity = '0';
        setTimeout(() => {
          // Check if image is already cached & decoded
          const cached = imageCache.get(step.charImage);
          if (cached && cached.complete && cached.naturalWidth > 0) {
            // Image already loaded — swap instantly
            charImg.src = step.charImage;
            charImg.style.opacity = '1';
          } else {
            // Wait for image to fully load before revealing
            const tempImg = new Image();
            tempImg.onload = () => {
              charImg.src = step.charImage;
              charImg.style.opacity = '1';
            };
            tempImg.onerror = () => {
              // Fallback: show anyway even if load fails
              charImg.src = step.charImage;
              charImg.style.opacity = '1';
            };
            tempImg.src = step.charImage;
          }
        }, 180);
      }
    }

    // Position highlight on target element
    if (step.target) {
      const targetEl = document.querySelector(step.target);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        highlight.style.display = 'block';
        highlight.style.top = (rect.top - 6) + 'px';
        highlight.style.left = (rect.left - 6) + 'px';
        highlight.style.width = (rect.width + 12) + 'px';
        highlight.style.height = (rect.height + 12) + 'px';
      }
    } else if (step.tabTarget) {
      // Highlight a specific ribbon tab
      const tabs = document.querySelectorAll('.ribbon-tab');
      tabs.forEach(tab => {
        if (tab.textContent.trim() === step.tabTarget) {
          const rect = tab.getBoundingClientRect();
          highlight.style.display = 'block';
          highlight.style.top = (rect.top - 4) + 'px';
          highlight.style.left = (rect.left - 4) + 'px';
          highlight.style.width = (rect.width + 8) + 'px';
          highlight.style.height = (rect.height + 8) + 'px';
        }
      });
    } else {
      highlight.style.display = 'none';
    }

    // Position character + bubble based on charPos
    positionCharacter(step.charPos, step.target || step.tabTarget ? true : false);

    // Animate bubble entrance
    const bubble = document.getElementById('tutorial-bubble');
    bubble.classList.remove('animate-in');
    void bubble.offsetWidth; // force reflow
    bubble.classList.add('animate-in');
  }

  function positionCharacter(pos, hasTarget) {
    const container = document.getElementById('tutorial-container');
    container.className = 'tutorial-container';
    container.classList.add('pos-' + pos);
  }

  function nextStep() {
    showStep(currentStep + 1);
  }

  function endTutorial() {
    const guide = document.getElementById('tutorial-guide');
    const highlight = document.getElementById('tutorial-highlight');

    guide.classList.add('fade-out');
    localStorage.setItem('tutorialGuideSeen', 'true');

    setTimeout(() => {
      guide.classList.remove('active', 'fade-out');
      highlight.style.display = 'none';
      tutorialActive = false;
    }, 500);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose reset function for testing
  window.resetTutorial = function() {
    localStorage.removeItem('tutorialGuideSeen');
    localStorage.removeItem('swipeTutorialSeen');
    location.reload();
  };
})();
