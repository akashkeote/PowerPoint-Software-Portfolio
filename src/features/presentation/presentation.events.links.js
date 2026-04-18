export function bindLinkEvents() {
    document.querySelectorAll('.download-engineering-notes-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://drive.google.com/drive/folders/14gwS2GpMkEbUhupOc-_rJtEkGLhwNldQ', '_blank', 'noopener,noreferrer');
        });
    });

    document.querySelectorAll('.download-resume-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://drive.google.com/drive/folders/1ID1uHzPu7DBdMX9e4SsYGLmeYbclXA76?usp=drive_link', '_blank', 'noopener,noreferrer');
        });
    });
}
