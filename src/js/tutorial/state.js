export const DESKTOP_STEPS = [
  { text: "Welcome to Akash's Portfolio! 👋 I'll give you a quick tour of this PowerPoint-style interface. Let's go!", target: null, charPos: 'center', charImage: '/images/guide-welcome.png' },
  { text: "This <b>Ribbon</b> works just like Microsoft PowerPoint! Click different tabs to explore.", target: '.ribbon-tabs', charPos: 'bottom-right', charImage: '/images/guide-point.png' },
  { text: "Use the <b>Sidebar</b> on the left to quickly jump between slides — just like in real PowerPoint!", target: '.sidebar', charPos: 'right', charImage: '/images/guide-map.png' },
  { text: "The main <b>Slide Canvas</b> shows the current slide content. Each slide is a section of my portfolio.", target: '.canvas-area', charPos: 'right', charImage: '/images/guide-explore.png' },
  { text: "Click <b>Start Presentation</b> to launch full-screen slideshow mode — the best way to view my portfolio!", target: '.start-presentation-btn', charPos: 'bottom-right', charImage: '/images/guide-plan.png' },
  { text: "Toggle between <b>🌙 Dark</b> and <b>☀️ Light</b> mode using the theme button in the title bar!", target: '.theme-toggle-btn', charPos: 'bottom-right', charImage: '/images/guide-thumbsup.png' },
  { text: "Click the <b>▶ play icon</b> here to open the <b>current slide in full-screen slideshow</b> mode — view any slide in full size instantly!", target: '#status-present-btn', charPos: 'left', charImage: '/images/guide-point.png' },
  { text: "Need help? Click the <b>CHAT</b> button in the top bar to talk to my AI assistant! That's all — enjoy exploring! 🚀", target: '#open-chat-btn', charPos: 'bottom-right', charImage: '/images/guide-welcome.png' }
];

export const MOBILE_STEPS = [
  { text: "Welcome! 👋 This portfolio is in <b>Slideshow Mode</b> on mobile for the best experience!", target: null, charPos: 'center', charImage: '/images/guide-welcome.png' },
  { text: "Swipe <b>left</b> or <b>right</b> to navigate between slides. Each slide is a section of my portfolio!", target: null, charPos: 'center', charImage: '/images/guide-point.png' },
  { text: "That's it! Enjoy exploring my projects, skills, and more. Have fun! 🚀", target: null, charPos: 'center', charImage: '/images/guide-thumbsup.png' }
];

export const imageCache = new Map();

export function preloadImages(steps) {
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
