const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf8');

const partialsDir = path.join(__dirname, 'partials');
if (!fs.existsSync(partialsDir)) fs.mkdirSync(partialsDir);

function extractAndReplace(filename, startStr, endStr) {
    const startIdx = html.indexOf(startStr);
    if (startIdx === -1) {
        console.log('Could not find start:', startStr.trim().split('\n')[0]);
        return;
    }
    const endIdx = html.indexOf(endStr, startIdx);
    if (endIdx === -1) {
        console.log('Could not find end:', endStr.trim().split('\n')[0]);
        return;
    }
    
    const chunk = html.substring(startIdx, endIdx);
    fs.writeFileSync(path.join(partialsDir, filename), chunk);
    
    html = html.slice(0, startIdx) + `<include src="./partials/${filename}" />\n` + html.slice(endIdx);
}

// 1. Boot screen
extractAndReplace('boot-screen.html', '  <!-- ============================\n       BOOT SCREEN', '  <!-- ============================\n       MAIN APP');

// 2. Title bar
extractAndReplace('title-bar.html', '    <!-- TITLE BAR -->', '    <!-- FILE MENU OVERLAY (BACKSTAGE) -->');

// 3. File menu
extractAndReplace('file-menu.html', '    <!-- FILE MENU OVERLAY (BACKSTAGE) -->', '    <!-- RIBBON TABS -->');

// 4. Ribbon Tabs
extractAndReplace('ribbon-tabs.html', '    <!-- RIBBON TABS -->', '    <!-- RIBBON TOOLBAR -->');

// 5. Ribbon Toolbar
extractAndReplace('ribbon-toolbar.html', '    <!-- RIBBON TOOLBAR -->', '    <!-- MAIN CONTENT AREA -->');

// 6. Sidebar
extractAndReplace('sidebar.html', '      <!-- SIDEBAR -->', '      <!-- CANVAS AREA -->');

fs.writeFileSync('index.html', html);
console.log('First pass HTML extraction complete.');
