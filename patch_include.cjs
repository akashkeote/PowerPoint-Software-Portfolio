const fs = require('fs');
let file = 'partials/ribbon-toolbar.html';
let c = fs.readFileSync(file, 'utf8');
c = c.replace(/<include src="\.\/cta-group\.html"><\/include>/g, '<include src="./partials/cta-group.html" />');
fs.writeFileSync(file, c);
console.log("Patched includes successfully!");
