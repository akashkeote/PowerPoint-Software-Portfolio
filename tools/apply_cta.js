const fs = require('fs');

// 1. Update ribbon-toolbar.html
let ribbonFile = 'partials/ribbon-toolbar.html';
let ribbonHtml = fs.readFileSync(ribbonFile, 'utf8');

// Strip out the global CTA at the very end
ribbonHtml = ribbonHtml.replace(/<!-- GLOBAL CTA BUTTONS[\s\S]*?<\/svg>\s*<span class="label">Toggle<br>Theme<\/span>\s*<\/div>\s*<\/div>\s*/g, '');

// Inject the include right before the closing </div> of each tab
ribbonHtml = ribbonHtml.replace(/      <\/div>\r?\n\r?\n      <!--/g, '        <include src="./cta-group.html"></include>\n      </div>\n\n      <!--');
ribbonHtml = ribbonHtml.replace(/      <\/div>\r?\n\r?\n    <\/div>\r?\n\r?\n    <!-- MAIN CONTENT/g, '        <include src="./cta-group.html"></include>\n      </div>\n\n    </div>\n\n    <!-- MAIN CONTENT');

fs.writeFileSync(ribbonFile, ribbonHtml);


// 2. Update ui.js
let uiFile = 'js/ui.js';
let uiJs = fs.readFileSync(uiFile, 'utf8');

// Replace getElementById with querySelectorAll for the buttons
let startPresOld = "document.getElementById('start-presentation-btn').addEventListener('click', startPresentation);";
let startPresNew = "document.querySelectorAll('.start-presentation-btn').forEach(btn => btn.addEventListener('click', startPresentation));";
uiJs = uiJs.replace(startPresOld, startPresNew);

let downloadOld = "document.getElementById('download-engineering-notes-btn').addEventListener('click', () => {";
let downloadNew = "document.querySelectorAll('.download-engineering-notes-btn').forEach(btn => btn.addEventListener('click', () => {";
uiJs = uiJs.replace(downloadOld, downloadNew + '\n      window.open(\'https://drive.google.com/drive/folders/14gwS2GpMkEbUhupOc-_rJtEkGLhwNldQ\', \'_blank\', \'noopener\');\n    }));');
// Wait, we need to be careful with the download old logic, so we just replace the whole block exactly:
uiJs = uiJs.replace(/document\.getElementById\('download-engineering-notes-btn'\)\.addEventListener\('click', \(\) => {\s*window\.open\('https:\/\/drive\.google\.com\/drive\/folders\/14gwS2GpMkEbUhupOc-_rJtEkGLhwNldQ', '_blank', 'noopener'\);\s*}\);/, 
  `document.querySelectorAll('.download-engineering-notes-btn').forEach(btn => {\n      btn.addEventListener('click', () => {\n        window.open('https://drive.google.com/drive/folders/14gwS2GpMkEbUhupOc-_rJtEkGLhwNldQ', '_blank', 'noopener');\n      });\n    });`);

// Update theme icon logic
uiJs = uiJs.replace(/const iconBtn = document\.getElementById\('theme-icon'\);/g, "const iconBtns = document.querySelectorAll('.theme-icon');");
uiJs = uiJs.replace(/if \(iconBtn\) \{/g, "if (iconBtns.length > 0) {\n        iconBtns.forEach(iconBtn => {");
uiJs = uiJs.replace(/\/\/ Sun icon\s*iconBtn\.innerHTML = '<circle/g, "// Sun icon\n          iconBtn.innerHTML = '<circle");
// We need to close the forEach block
uiJs = uiJs.replace(/iconBtn\.setAttribute\('stroke', '#6366f1'\); \/\/ Indigo for light mode\s*\}\s*\}/, 
  "iconBtn.setAttribute('stroke', '#6366f1'); // Indigo for light mode\n        }\n        });\n      }");

fs.writeFileSync(uiFile, uiJs);

// 3. Revert css/style.css .ribbon-toolbar display: flex
let cssFile = 'css/style.css';
let cssText = fs.readFileSync(cssFile, 'utf8');
cssText = cssText.replace(/    \.ribbon-toolbar {\r?\n      display: flex;\r?\n/g, '    .ribbon-toolbar {\n');
fs.writeFileSync(cssFile, cssText);

console.log('Fixed structure successfully.');
