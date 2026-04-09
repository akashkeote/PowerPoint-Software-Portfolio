import fs from 'fs';

const file = 'c:/Users/AkashK/Desktop/PowerPoint Software Portfolio/index.html';
let content = fs.readFileSync(file, 'utf8');

const emojiMap = {
  '🧠': '<i class="premium-feather" data-feather="cpu"></i>',
  '🏆': '<i class="premium-feather" data-feather="award"></i>',
  '🚀': '<i class="premium-feather" data-feather="zap"></i>',
  '⭐': '<i class="premium-feather" data-feather="star"></i>',
  '☕': '<i class="premium-feather" data-feather="coffee"></i>',
  '🐍': '<i class="premium-feather" data-feather="terminal"></i>',
  '⚡': '<i class="premium-feather" data-feather="zap"></i>',
  '⚙️': '<i class="premium-feather" data-feather="settings"></i>',
  '⚛️': '<i class="premium-feather" data-feather="code"></i>',
  '📱': '<i class="premium-feather" data-feather="smartphone"></i>',
  '🎨': '<i class="premium-feather" data-feather="pen-tool"></i>',
  '🗄️': '<i class="premium-feather" data-feather="database"></i>',
  '🍃': '<i class="premium-feather" data-feather="server"></i>',
  '🔥': '<i class="premium-feather" data-feather="cloud"></i>',
  '🐧': '<i class="premium-feather" data-feather="terminal"></i>',
  '🌐': '<i class="premium-feather" data-feather="globe"></i>',
  '🛒': '<i class="premium-feather" data-feather="shopping-cart"></i>',
  '🤖': `<svg class="premium-lotus" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff7e67"/><stop offset="100%" stop-color="#7b61ff"/></linearGradient></defs><path d="M50,15 C40,40 40,75 50,90 C60,75 60,40 50,15 Z" fill="url(#lotusGrad)" opacity="0.9"/><path d="M50,90 C30,75 25,50 35,35 C45,50 48,70 50,90 Z" fill="url(#lotusGrad)" opacity="0.75"/><path d="M50,90 C70,75 75,50 65,35 C55,50 52,70 50,90 Z" fill="url(#lotusGrad)" opacity="0.75"/><path d="M50,90 C20,80 10,60 15,45 C30,65 40,80 50,90 Z" fill="url(#lotusGrad)" opacity="0.6"/><path d="M50,90 C80,80 90,60 85,45 C70,65 60,80 50,90 Z" fill="url(#lotusGrad)" opacity="0.6"/></svg>`,
  '📊': '<i class="premium-feather" data-feather="layout"></i>',
  '📚': '<i class="premium-feather" data-feather="book-open"></i>',
  '💰': '<i class="premium-feather" data-feather="dollar-sign"></i>',
  '🏙️': '<i class="premium-feather" data-feather="map"></i>',
  '📍': '<i class="premium-feather" data-feather="map-pin"></i>',
  '📧': '<i class="premium-feather" data-feather="mail"></i>',
  '💼': '<i class="premium-feather" data-feather="briefcase"></i>',
  '🐙': '<i class="premium-feather" data-feather="github"></i>'
};

for (const [emoji, svg] of Object.entries(emojiMap)) {
  content = content.split(emoji).join(svg);
}

fs.writeFileSync(file, content);
console.log('Emojis successfully replaced!');