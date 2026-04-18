const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'features', 'sections', 'projects');
for (let i = 1; i <= 5; i++) {
    const file = path.join(dir, `projects.card${i}.html`);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        
        // Fix Icon
        content = content.replace(/font-size:28px; margin-bottom:8px;/g, 'font-size:clamp(18px,2vw,26px); margin-bottom:6px;');
        
        // Fix h2
        content = content.replace(/<h2>/g, '<h2 style="font-size:clamp(11px,1.3vw,15px);">');
        
        // Fix p tag
        content = content.replace(/<p>/g, '<p style="font-size:clamp(9px,0.85vw,11px); margin-bottom:6px;">');
        
        // Fix tech-tags margin
        content = content.replace(/<div class="tech-tags" style="margin-top:10px;">/g, '<div class="tech-tags" style="margin-bottom:6px;">');
        
        // Fix card icons margin
        content = content.replace(/<div class="nb-card-icons" style="margin-top:12px;">/g, '<div class="nb-card-icons">');
        
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
}
