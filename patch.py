import sys

file_path = r'c:\Users\AkashK\Desktop\PowerPoint Software Portfolio\css\style.css'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

insert_idx = -1
for i, line in enumerate(lines):
    if 'body.dark-theme .ribbon-btn svg [fill="#e8e8e8"]' in line:
        insert_idx = i
        break

if insert_idx != -1:
    css_to_insert = """
    /* Light Mode SVG Overrides */
    body:not(.dark-theme) .ribbon-btn svg [stroke="#bbb"], body:not(.dark-theme) .ribbon-btn svg [stroke="#ccc"] { stroke: #666; }
    body:not(.dark-theme) .ribbon-btn svg [fill="#bbb"], body:not(.dark-theme) .ribbon-btn svg [fill="#ccc"] { fill: #666; }
    body:not(.dark-theme) .ribbon-btn svg [fill="#e8e8e8"], body:not(.dark-theme) .ribbon-btn svg [fill="#f0f0f0"] { fill: #fff; }
    body:not(.dark-theme) .ribbon-btn svg [stroke="#e8e8e8"], body:not(.dark-theme) .ribbon-btn svg [stroke="#f0f0f0"] { stroke: #aaa; }
    body:not(.dark-theme) .ribbon-btn svg [fill="#aaa"] { fill: #555; }
    body:not(.dark-theme) .ribbon-btn svg [stroke="#aaa"] { stroke: #555; }
    body:not(.dark-theme) .ribbon-btn svg [fill="#d0d0d0"] { fill: #888; }
    body:not(.dark-theme) .ribbon-btn svg [stroke="#d0d0d0"] { stroke: #888; }
    body:not(.dark-theme) .ribbon-btn svg circle[fill="#fff"] { fill: #f8f8f8; stroke: #666; }

    /* Primary and Engineering CTA Buttons Light/Dark Mode Fixes */
    .start-pres-label {
      color: #ff9f95; font-weight: 700; font-size: 10.5px; text-shadow: 0 0 6px rgba(255,106,95,0.35);
    }
    .start-pres-icon { filter: drop-shadow(0 0 6px rgba(255,106,95,0.45)); }
    
    .eng-notes-label {
      color: #eaf2ff; text-shadow: 0 0 6px rgba(102,163,255,0.35);
    }
    .eng-notes-icon { filter: drop-shadow(0 0 6px rgba(66,133,244,0.35)); }

    /* Overrides for Light Mode */
    body:not(.dark-theme) .start-pres-label {
      color: var(--ppt-red); text-shadow: none; font-weight: 700;
    }
    body:not(.dark-theme) .start-pres-icon { filter: none; }
    body:not(.dark-theme) .start-pres-icon path.start-pres-lines { stroke: #b03020; }
    
    body:not(.dark-theme) .eng-notes-label {
      color: #1155cc; text-shadow: none; font-weight: 600;
    }
    body:not(.dark-theme) .eng-notes-icon { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
    body:not(.dark-theme) .eng-notes-icon .eng-notes-poly1 { fill: #0f9d58; }
    body:not(.dark-theme) .eng-notes-icon .eng-notes-poly2 { fill: #f4b400; }
    body:not(.dark-theme) .eng-notes-icon .eng-notes-poly3 { fill: #4285f4; }
"""
    lines.insert(insert_idx + 1, css_to_insert)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully inserted CSS.")
else:
    print("Could not find insert line.")
