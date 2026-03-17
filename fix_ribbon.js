const fs = require('fs');

const filePath = 'C:/Users/AkashK/Desktop/PowerPoint Software Portfolio/index.html';
let content = fs.readFileSync(filePath, 'utf-8');

const newRibbonCss = `    /* ============================
       RIBBON TOOLBAR
    ============================ */
    .ribbon-toolbar {
      background: var(--bg-ribbon);
      backdrop-filter: var(--glass-blur);
      height: 100px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .ribbon-tab-content {
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 12px;
      gap: 6px;
      width: max-content;
    }
    .ribbon-toolbar::-webkit-scrollbar { height: 0; }
    .ribbon-group {
      display: flex;
      align-items: center;
      gap: 4px;
      padding-right: 16px;
      padding-left: 4px;
      margin-right: 8px;
      border-right: 1px solid rgba(99,102,241,0.15);
      height: 84px;
      position: relative;
    }
    body.dark-theme .ribbon-group { border-right: 1px solid rgba(255,255,255,0.1); }
    .ribbon-group:last-child { border-right: none; }
    .ribbon-group-label {
      position: absolute;
      bottom: 2px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 10px;
      color: var(--text-muted);
      font-weight: 500;
    }
    .ribbon-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 6px;
      color: var(--text-main);
      transition: background 0.2s;
      min-width: 54px;
      height: 64px;
      margin-bottom: 12px;
      cursor: pointer;
    }
    .ribbon-btn.small-row {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      min-width: auto;
      height: 24px;
      padding: 4px 8px;
      margin-bottom: 0;
    }
    .ribbon-btn.small-row .label { font-size: 11px; }
    .ribbon-btn.icon-only {
      min-width: 32px;
      padding: 4px;
      height: 32px;
      margin-bottom: 0;
    }
    .ribbon-btn:hover { background: rgba(99,102,241,0.1); }
    body.dark-theme .ribbon-btn:hover { background: rgba(255,255,255,0.08); }
    .ribbon-btn svg {
      width: 28px;
      height: 28px;
      color: currentColor;
    }
    .ribbon-btn.small-row svg, .ribbon-btn.icon-only svg {
      width: 16px;
      height: 16px;
    }
    .ribbon-btn .label {
      font-size: 11px;
      font-weight: 500;
      color: var(--text-main);
      white-space: nowrap;
      text-align: center;
      line-height: 1.2;
    }
    .ribbon-btn.primary .icon { color: var(--ppt-red); }
    .ribbon-btn.primary .label { color: var(--ppt-red); font-weight: 600; font-size: 11px; }
    .ribbon-btn.primary:hover { background: rgba(192,57,43,0.15); }
    
    /* Dark Mode SVG Overrides */
    body.dark-theme .ribbon-btn svg [stroke="#bbb"], body.dark-theme .ribbon-btn svg [stroke="#ccc"],
    body.dark-theme .ribbon-btn svg [stroke="#aaa"], body.dark-theme .ribbon-btn svg [stroke="#555"] { stroke: var(--text-main); }
    body.dark-theme .ribbon-btn svg [fill="#bbb"], body.dark-theme .ribbon-btn svg [fill="#ccc"],
    body.dark-theme .ribbon-btn svg [fill="#aaa"], body.dark-theme .ribbon-btn svg [fill="#555"],
    body.dark-theme .ribbon-btn svg [fill="#777"] { fill: var(--text-main); }
    body.dark-theme .ribbon-btn svg [stroke="#e8e8e8"], body.dark-theme .ribbon-btn svg [stroke="#f0f0f0"] { stroke: #444; }
    body.dark-theme .ribbon-btn svg [fill="#e8e8e8"], body.dark-theme .ribbon-btn svg [fill="#f0f0f0"] { fill: #444; }`;

content = content.replace(/\/\*\s*============================\s*RIBBON TOOLBAR\s*============================\s*\*\/[\s\S]*?(?=\/\*\s*============================\s*MAIN CONTENT AREA)/, newRibbonCss + '\n\n    ');

const newHomeHtml = `      <!-- HOME TAB -->
      <div class="ribbon-tab-content active" id="tab-Home">
        
        <!-- GROUP: Clipboard -->
        <div class="ribbon-group">
          <div class="ribbon-btn">
            <i data-feather="clipboard" style="width:28px;height:28px;stroke-width:1.5"></i>
            <span class="label">Paste</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:12px;">
            <div class="ribbon-btn small-row">
              <i data-feather="scissors" style="stroke-width:1.5"></i>
              <span class="label">Cut</span>
            </div>
            <div class="ribbon-btn small-row">
              <i data-feather="copy" style="stroke-width:1.5"></i>
              <span class="label">Copy</span>
            </div>
            <div class="ribbon-btn small-row">
              <i data-feather="edit-2" style="stroke-width:1.5"></i>
              <span class="label">Format Painter</span>
            </div>
          </div>
          <div class="ribbon-group-label">Clipboard</div>
        </div>

        <!-- GROUP: Slides -->
        <div class="ribbon-group">
          <div class="ribbon-btn">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="4" y="6" width="24" height="18" rx="2" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="20" width="24" height="6" fill="#c0392b" stroke="#c0392b"/><text x="16" y="25" fill="#fff" font-size="6" text-anchor="middle" font-weight="bold">+</text></svg>
            <span class="label">New<br>Slide</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:12px;">
            <div class="ribbon-btn small-row">
              <i data-feather="layout" style="stroke-width:1.5"></i><span class="label">Layout</span><i data-feather="chevron-down" style="width:12px;height:12px"></i>
            </div>
            <div class="ribbon-btn small-row">
              <i data-feather="rotate-ccw" style="stroke-width:1.5"></i><span class="label">Reset</span>
            </div>
            <div class="ribbon-btn small-row">
              <i data-feather="server" style="stroke-width:1.5"></i><span class="label">Section</span><i data-feather="chevron-down" style="width:12px;height:12px"></i>
            </div>
          </div>
          <div class="ribbon-group-label">Slides</div>
        </div>

        <!-- GROUP: Font -->
        <div class="ribbon-group" style="padding-right:24px;">
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px;width:240px;">
            <div style="display:flex;gap:4px;height:26px;">
              <div style="flex:1;background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15);border-radius:4px;padding:0 8px;display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--text-main);">
                Space Grotesk <i data-feather="chevron-down" style="width:10px;height:10px;opacity:0.6"></i>
              </div>
              <div style="width:48px;background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--text-main);">
                32
              </div>
              <div class="ribbon-btn icon-only" style="height:26px"><i data-feather="arrow-up" style="width:12px;height:12px"></i></div>
              <div class="ribbon-btn icon-only" style="height:26px"><i data-feather="arrow-down" style="width:12px;height:12px"></i></div>
            </div>
            <div style="display:flex;gap:2px;align-items:center;">
              <div class="ribbon-btn icon-only"><i data-feather="bold" style="width:14px;height:14px;"></i></div>
              <div class="ribbon-btn icon-only"><i data-feather="italic" style="width:14px;height:14px;"></i></div>
              <div class="ribbon-btn icon-only"><i data-feather="underline" style="width:14px;height:14px;"></i></div>
              <div style="width:1px;height:16px;background:var(--border);margin:0 4px;"></div>
              <div class="ribbon-btn icon-only" style="flex-direction:column;gap:0;">
                <span style="font-size:12px;font-weight:bold;line-height:1;margin-bottom:2px">A</span>
                <div style="width:12px;height:3px;background:#c0392b;border-radius:2px"></div>
              </div>
              <div class="ribbon-btn icon-only" style="flex-direction:column;gap:0;">
                <span style="font-size:12px;font-weight:bold;line-height:1;margin-bottom:2px">A</span>
                <div style="width:12px;height:3px;background:#2bd3c0;border-radius:2px"></div>
              </div>
            </div>
          </div>
          <div class="ribbon-group-label">Font</div>
        </div>

        <!-- GROUP: Paragraph -->
        <div class="ribbon-group" style="padding-right:24px;">
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px;width:180px;">
            <div style="display:flex;gap:2px;">
              <div class="ribbon-btn icon-only"><i data-feather="list" style="width:14px;height:14px;"></i></div>
              <div class="ribbon-btn icon-only"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M4 18h1v-4h-1"></path></svg></div>
              <div style="width:1px;height:16px;background:var(--border);margin:0 4px;"></div>
              <div class="ribbon-btn icon-only"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line><polyline points="8 8 4 12 8 16"></polyline></svg></div>
              <div class="ribbon-btn icon-only"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line><polyline points="16 8 20 12 16 16"></polyline></svg></div>
            </div>
            <div style="display:flex;gap:2px;">
              <div class="ribbon-btn icon-only"><i data-feather="align-left" style="width:14px;height:14px;"></i></div>
              <div class="ribbon-btn icon-only"><i data-feather="align-center" style="width:14px;height:14px;"></i></div>
              <div class="ribbon-btn icon-only"><i data-feather="align-right" style="width:14px;height:14px;"></i></div>
              <div class="ribbon-btn icon-only"><i data-feather="align-justify" style="width:14px;height:14px;"></i></div>
              <div style="width:1px;height:16px;background:var(--border);margin:0 4px;"></div>
              <div class="ribbon-btn icon-only"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></div>
            </div>
          </div>
          <div class="ribbon-group-label">Paragraph</div>
        </div>

        <!-- GROUP: Drawing -->
        <div class="ribbon-group">
          <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:12px;">
            <div style="display:flex;gap:4px;">
              <div class="ribbon-btn icon-only" style="border:1px solid var(--border)"><svg width="12" height="12"><rect x="1" y="1" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div>
              <div class="ribbon-btn icon-only" style="border:1px solid var(--border)"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div>
              <div class="ribbon-btn icon-only" style="border:1px solid var(--border)"><svg width="12" height="12"><polygon points="6,1 11,11 1,11" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div>
              <div class="ribbon-btn icon-only" style="border:1px solid var(--border)"><i data-feather="more-horizontal" style="width:12px;height:12px"></i></div>
            </div>
            <div style="display:flex;gap:4px;">
              <div class="ribbon-btn small-row" style="background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15)"><span class="label">Arrange</span><i data-feather="chevron-down" style="width:10px;height:10px"></i></div>
              <div class="ribbon-btn small-row" style="background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15)"><span class="label">Quick Styles</span></div>
            </div>
          </div>
          <div class="ribbon-group-label">Drawing</div>
        </div>

        <!-- OUTLINED ACTIONS -->
        <div class="ribbon-group" style="padding-right:8px; border-right:none;">
          <div class="ribbon-btn primary" id="start-presentation-btn" style="min-width:64px; border:1px solid rgba(255,57,43,0.3); background:rgba(255,57,43,0.05);">
            <i data-feather="play-circle" style="color:#c0392b; width:24px; height:24px; stroke-width:1.5;"></i>
            <span class="label" style="color:#c0392b;">Start<br>Presentation</span>
          </div>
          <div class="ribbon-btn" id="download-engineering-notes-btn" style="min-width:64px; border:1px solid rgba(99,102,241,0.2); background:rgba(99,102,241,0.05);">
            <i data-feather="book-open" style="color:#6366f1; width:24px; height:24px; stroke-width:1.5;"></i>
            <span class="label" style="color:#6366f1;">Sem<br>Notes</span>
          </div>
          <div class="ribbon-btn" onclick="window.open('resume.pdf', '_blank')" style="min-width:64px; border:1px solid rgba(39,174,96,0.3); background:rgba(39,174,96,0.05);">
            <i data-feather="download-cloud" style="color:#27ae60; width:24px; height:24px; stroke-width:1.5;"></i>
            <span class="label" style="color:#27ae60;">Download<br>Resume</span>
          </div>
          <!-- Theme Toggle -->
          <div class="ribbon-btn" id="theme-toggle" onclick="toggleTheme()" style="min-width:64px;">
            <svg id="theme-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <span class="label" style="font-weight:600;">Theme</span>
          </div>
        </div>

      </div>`;

content = content.replace(/      <!-- HOME TAB -->\s*<div class="ribbon-tab-content active" id="tab-Home">[\s\S]*?<\/div>(?=\s*<!-- INSERT TAB -->)/, newHomeHtml + '\n');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Ribbon updated successfully!');
