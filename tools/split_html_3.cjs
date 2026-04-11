const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf8');
const partialsDir = path.join(__dirname, 'partials');
const slidesDir = path.join(partialsDir, 'slides');
if (!fs.existsSync(slidesDir)) fs.mkdirSync(slidesDir);

function extractBlock(filename, startToken, endToken) {
    const startIdx = html.indexOf(startToken);
    if (startIdx === -1) {
        console.log('Not found start:', startToken.substring(0, 30));
        return;
    }
    const endIdx = html.indexOf(endToken, startIdx);
    if (endIdx === -1) {
        console.log('Not found end:', endToken.substring(0, 30));
        return;
    }
    
    const content = html.substring(startIdx, endIdx);
    fs.writeFileSync(path.join(partialsDir, filename), content);
    
    html = html.substring(0, startIdx) + `        <include src="./partials/${filename}" />\n` + html.substring(endIdx);
    console.log('Extracted:', filename);
}

// Boot screen
extractBlock('boot-screen.html', '<div id="boot-screen">', '  <!-- ============================\n       MAIN APP');

// Status Bar (from class="status-bar" to end of body except script)
extractBlock('status-bar.html', '<div class="status-bar">', '  <!-- PRESENTATION MODE FULLSCREEN -->');

// Chat Bot Window
extractBlock('chat-bot.html', '  <!-- AI CHAT BOT WINDOW -->', '  <script type="module"');
// If "<!-- AI CHAT BOT WINDOW -->" doesn't exist, search for <div id="ai-chatbot-window">
if (!fs.existsSync(path.join(partialsDir, 'chat-bot.html'))) {
    extractBlock('chat-bot.html', '<div id="ai-chatbot-window"', '  <script type="module"');
}

// Slides
const slides = ['hero-slide.html', 'about-slide.html', 'skills-slide.html', 'projects-slide.html', 'notes-slide.html', 'contact-slide.html'];
for (let i = 1; i <= 6; i++) {
    const startStr = `<!-- SLIDE ${i}:`;
    const endStr = (i === 6) ? '<!-- STATUS BAR -->' : `<!-- SLIDE ${i + 1}:`;
    
    // For slide 6, if <!-- STATUS BAR --> is missing, fallback to </div>\n    <div class="status-bar"> or something.
    let actualEnd = endStr;
    if (i === 6 && html.indexOf(endStr) === -1) {
        actualEnd = '</div>\n        </div>\n      </div>'; // End of slide-wrapper and canvas-area
    }
    
    extractBlock(`slides/${slides[i-1]}`, startStr, actualEnd);
}

fs.writeFileSync('index.html', html);
console.log('Part 3 extraction complete.');
