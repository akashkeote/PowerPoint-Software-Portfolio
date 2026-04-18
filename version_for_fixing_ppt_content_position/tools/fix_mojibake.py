import glob
import os

partials_dir = r'c:\Users\AkashK\Desktop\PowerPoint Software Portfolio\partials'

count = 0
for root, dirs, files in os.walk(partials_dir):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fh:
                content = fh.read()
            
            # Fix common mojibake patterns
            new_content = content
            new_content = new_content.replace('\u00e2\u0080\u0094', '&mdash;')  # em-dash
            new_content = new_content.replace('\u00e2\u0080\u0093', '&ndash;')  # en-dash
            new_content = new_content.replace('\u00e2\u0080\u0099', '&rsquo;')  # right single quote
            new_content = new_content.replace('\u00e2\u0080\u009c', '&ldquo;')  # left double quote
            new_content = new_content.replace('\u00e2\u0080\u009d', '&rdquo;')  # right double quote
            new_content = new_content.replace('\u00e2\u0080\u0098', '&lsquo;')  # left single quote
            
            if new_content != content:
                count += 1
                with open(path, 'w', encoding='utf-8') as fh:
                    fh.write(new_content)
                print(f'Fixed: {path}')

print(f'Done. Fixed {count} files.')
