const fs = require('fs');
const path = require('path');
let html = fs.readFileSync('index.html', 'utf8');

function extract(filename, start, end) {
    const s = html.indexOf(start);
    const e = html.indexOf(end, s);
    if(s!==-1 && e!==-1) {
        fs.writeFileSync(path.join(__dirname, 'partials', filename), html.substring(s, e));
        html = html.substring(0, s) + `        <include src="./partials/${filename}" />\n` + html.substring(e);
        console.log('Extracted', filename);
    } else {
        console.log('Failed to extract', filename);
    }
}

extract('slides/contact-slide.html', '<!-- SLIDE 5: Contact -->', '        </div>\n      </div>\n    </div>');
extract('presentation-mode.html', '  <!-- PRESENTATION MODE -->', '    <!-- AI CHATBOT UI -->');

fs.writeFileSync('index.html', html);
console.log('Done.');
