const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'features', 'sections', 'skills', 'skills.grid.html');
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Grid gap
    content = content.replace(/gap:16px;/g, 'gap:clamp(6px,1.2vw,14px);');
    
    // Card padding
    content = content.replace(/padding:20px 12px;/g, 'padding:clamp(8px,1.5vw,18px) clamp(6px,1vw,12px);');
    
    // Icon font size
    content = content.replace(/font-size:36px; margin-bottom:6px;/g, 'font-size:clamp(20px,2.5vw,32px); margin-bottom:4px;');
    
    // h3 font size
    content = content.replace(/font-size:15px;/g, 'font-size:clamp(10px,1.1vw,14px);');
    
    // p font size
    content = content.replace(/font-size:11px;/g, 'font-size:clamp(7px,0.8vw,10px);');
    
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
}
