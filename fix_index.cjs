const fs = require('fs');
let lines = fs.readFileSync('index.html', 'utf8').split('\n');
// Replace status bar first (bottom up to avoid index shifting)
lines.splice(108, 19, '    <include src="./partials/status-bar.html" />');
// Replace contact slide
lines.splice(75, 29, '          <include src="./partials/slides/contact-slide.html" />');
fs.writeFileSync('index.html', lines.join('\n'));
console.log('Fixed index.html included lines.');
