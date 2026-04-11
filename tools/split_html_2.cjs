const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf8');
const partialsDir = path.join(__dirname, 'partials');

function extractBlock(filename, startToken, endToken) {
    const startIdx = html.indexOf(startToken);
    if (startIdx === -1) {
        console.log('Skipping (not found):', filename);
        return;
    }
    const endIdx = html.indexOf(endToken, startIdx);
    if (endIdx === -1) {
        console.log('Skipping (end not found):', filename);
        return;
    }
    
    // We want to capture up to the start of the endToken
    const content = html.substring(startIdx, endIdx);
    fs.writeFileSync(path.join(partialsDir, filename), content);
    
    html = html.substring(0, startIdx) + `<include src="./partials/${filename}" />\n    ` + html.substring(endIdx);
    console.log('Extracted:', filename);
}

// 1. Boot Screen
// From <div id="boot-screen"> up to <!-- ============================ MAIN APP
extractBlock('boot-screen.html', '<div id="boot-screen">', '  <!-- ============================\n       MAIN APP');

// 2. Ribbon Toolbar
// From <div id="ribbon-toolbar" class="ribbon-toolbar"> up to <div class="main-content">
extractBlock('ribbon-toolbar.html', '<div id="ribbon-toolbar" class="ribbon-toolbar">', '<div class="main-content">');

// 3. Sidebar
// From <div class="sidebar"> up to <div class="canvas-area">
extractBlock('sidebar.html', '<div class="sidebar">', '<div class="canvas-area">');

// 4. Status Bar
// From <div class="status-bar"> up to </div>\n  </div>\n\n  <!-- PRESENTATION MODE FULLSCREEN -->
extractBlock('status-bar.html', '<div class="status-bar">', '<!-- PRESENTATION MODE FULLSCREEN -->');

// Write back
fs.writeFileSync('index.html', html);
console.log('HTML extraction pass 2 complete.');
