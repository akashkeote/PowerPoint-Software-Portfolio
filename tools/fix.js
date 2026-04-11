const fs = require('fs');
let file = 'partials/ribbon-toolbar.html';
let content = fs.readFileSync(file, 'utf8');
let lines = content.split(/\r?\n/);
lines[61] = '            <div class="ribbon-btn" style="min-width:auto;padding:2px 3px;font-size:11px;color:#232946"><span style="font-style:italic">A</span><span style="color:#e74c3c;font-size:9px;margin-left:1px">&times;</span></div>';
fs.writeFileSync(file, lines.join('\r\n'));
