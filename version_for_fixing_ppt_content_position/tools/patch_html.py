import re

html_to_add = """      <!-- DESIGN TAB -->
      <div class="ribbon-tab-content" id="tab-Design" style="display:none;">
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="8" height="12" fill="#4a90d9"/><rect x="14" y="8" width="8" height="12" fill="#bbb"/></svg><span class="label">Themes</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><circle cx="14" cy="14" r="3" fill="#27ae60"/></svg><span class="label">Variants</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Themes</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="6" y1="11" x2="22" y2="11" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Slide<br>Size</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="8" y="6" width="12" height="16" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="8" y1="10" x2="20" y2="14" stroke="#4a90d9" stroke-width="1.5"/></svg><span class="label">Format<br>Background</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Customize</div>
        </div>
        <div class="ribbon-group" style="border-right:none">
          <div class="ribbon-btn"><svg width="28" height="28"><path d="M14 6L16 12L22 14L16 16L14 22L12 16L6 14L12 12Z" fill="#ffc107"/></svg><span class="label">Designer</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Designer</div>
        </div>
      </div>

      <!-- TRANSITIONS TAB -->
      <div class="ribbon-tab-content" id="tab-Transitions" style="display:none;">
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><polygon points="14,6 16,12 22,14 16,16 14,22 12,16 6,14 12,12" fill="none" stroke="#4a90d9" stroke-width="1.5"/></svg><span class="label">Preview</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Preview</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><polygon points="14,12 16,16 12,16" fill="#bbb"/></svg><span class="label">Morph</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><circle cx="14" cy="14" r="4" fill="#bbb" opacity="0.5"/></svg><span class="label">Fade</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="14" y1="20" x2="14" y2="10" stroke="#bbb" stroke-width="1.5"/><polygon points="14,10 12,13 16,13" fill="#bbb"/></svg><span class="label">Push</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="6" y1="14" x2="22" y2="14" stroke="#bbb" stroke-width="1"/></svg><span class="label">Wipe</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Transition to This Slide</div>
        </div>
        <div class="ribbon-group" style="border-right:none">
          <div class="ribbon-btn"><svg width="28" height="28"><circle cx="14" cy="14" r="7" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="14" y1="14" x2="14" y2="10" stroke="#bbb" stroke-width="1.5"/><line x1="14" y1="14" x2="17" y2="14" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Duration: 02.00</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Timing</div>
        </div>
      </div>

      <!-- ANIMATIONS TAB -->
      <div class="ribbon-tab-content" id="tab-Animations" style="display:none;">
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><polygon points="14,6 16,12 22,14 16,16 14,22 12,16 6,14 12,12" fill="none" stroke="#4a90d9" stroke-width="1.5"/></svg><span class="label">Preview</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Preview</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn active"><svg width="28" height="28"><polygon points="14,8 16,13 21,14 16,15 14,20 12,15 7,14 12,13" fill="#27ae60"/></svg><span class="label">Appear</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><polygon points="14,8 16,13 21,14 16,15 14,20 12,15 7,14 12,13" fill="#27ae60" opacity="0.6"/></svg><span class="label">Fade</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><polygon points="14,8 16,13 21,14 16,15 14,20 12,15 7,14 12,13" fill="#4a90d9"/></svg><span class="label">Fly In</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Animation</div>
        </div>
        <div class="ribbon-group" style="border-right:none">
          <div class="ribbon-btn"><svg width="28" height="28"><polygon points="12,8 14,13 19,14 14,15 12,20 10,15 5,14 10,13" fill="#bbb"/><text x="18" y="16" fill="#4a90d9" font-size="14" font-weight="bold">+</text></svg><span class="label">Add<br>Animation</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="16" y1="8" x2="16" y2="20" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Animation<br>Pane</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Advanced Animation</div>
        </div>
      </div>

      <!-- SLIDE SHOW TAB -->
      <div class="ribbon-tab-content" id="tab-Slide Show" style="display:none;">
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><path d="M7 21L21 21M9 21V19C9 17 11 17 11 17H17C17 17 19 17 19 19V21M10 17V9C10 7 12 7 14 7C16 7 18 7 18 9V17" stroke="#bbb" stroke-width="1.5" fill="none"/><polygon points="13,10 16,12 13,14" fill="#27ae60"/></svg><span class="label">From<br>Beginning</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="10" width="16" height="10" stroke="#bbb" stroke-width="1.5" fill="none"/><polygon points="12,12 16,15 12,18" fill="#27ae60"/></svg><span class="label">From Current<br>Slide</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Start Slide Show</div>
        </div>
        <div class="ribbon-group" style="border-right:none">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><circle cx="18" cy="18" r="4" fill="#fff" stroke="#bbb"/><line x1="16" y1="16" x2="20" y2="20" stroke="#bbb"/><line x1="20" y1="16" x2="16" y2="20" stroke="#bbb"/></svg><span class="label">Hide<br>Slide</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><circle cx="14" cy="14" r="8" fill="none" stroke="#bbb" stroke-width="1.5"/><circle cx="14" cy="14" r="3" fill="#c0392b"/></svg><span class="label">Record</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Set Up</div>
        </div>
      </div>

      <!-- RECORD TAB -->
      <div class="ribbon-tab-content" id="tab-Record" style="display:none;">
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><circle cx="14" cy="14" r="8" fill="none" stroke="#bbb" stroke-width="1.5"/><circle cx="14" cy="14" r="4" fill="#c0392b"/></svg><span class="label" style="color:#c0392b;font-weight:bold;">Record</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Record</div>
        </div>
        <div class="ribbon-group" style="border-right:none">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><polygon points="11,14 17,14 14,18" fill="#bbb"/><path d="M14 10V14" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Export to<br>Video</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Save</div>
        </div>
      </div>

      <!-- REVIEW TAB -->
      <div class="ribbon-tab-content" id="tab-Review" style="display:none;">
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><path d="M10 18L14 22L18 16" fill="none" stroke="#27ae60" stroke-width="2"/><text x="14" y="14" fill="#bbb" font-size="12" text-anchor="middle">abc</text></svg><span class="label">Spelling</span></div>
          <div class="ribbon-btn disabled"><svg width="28" height="28"><rect x="8" y="8" width="12" height="12" fill="none" stroke="#777" stroke-width="1.5"/><line x1="14" y1="8" x2="14" y2="20" stroke="#777" stroke-width="1.5"/><line x1="8" y1="14" x2="20" y2="14" stroke="#777" stroke-width="1.5"/></svg><span class="label">Thesaurus</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Proofing</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="8" y="6" width="12" height="16" fill="none" stroke="#bbb" stroke-width="1.5"/><circle cx="14" cy="14" r="3" fill="none" stroke="#4a90d9" stroke-width="1.5"/><path d="M12 18C12 16 16 16 16 18" fill="none" stroke="#4a90d9" stroke-width="1.5"/></svg><span class="label">Check<br>Accessibility</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Accessibility</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><text x="10" y="16" fill="#4a90d9" font-size="12" font-weight="bold">a</text><text x="18" y="16" fill="#27ae60" font-size="12">文</text><path d="M12 18H16" stroke="#bbb" stroke-width="1"/></svg><span class="label">Translate</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><text x="14" y="18" fill="#bbb" font-size="16" font-family="serif" text-anchor="middle">A</text><path d="M12 22L16 22" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Language</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Language</div>
        </div>
        <div class="ribbon-group disabled">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="8" y="6" width="12" height="16" fill="none" stroke="#777" stroke-width="1.5"/><circle cx="11" cy="10" r="1" fill="#777"/><line x1="13" y1="10" x2="18" y2="10" stroke="#777" stroke-width="1"/><circle cx="11" cy="14" r="1" fill="#777"/><line x1="13" y1="14" x2="18" y2="14" stroke="#777" stroke-width="1"/></svg><span class="label">Mark All<br>as Read</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#777" stroke-width="1.5"/><rect x="8" y="10" width="6" height="8" fill="#555"/></svg><span class="label">Show<br>Changes</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Activity</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><path d="M8 8H20V18H14L10 22V18H8V8Z" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="14" y1="10" x2="14" y2="16" stroke="#27ae60" stroke-width="2"/><line x1="11" y1="13" x2="17" y2="13" stroke="#27ae60" stroke-width="2"/></svg><span class="label">New<br>Comment</span></div>
          <div class="ribbon-btn disabled"><svg width="28" height="28"><path d="M8 8H20V18H14L10 22V18H8V8Z" fill="none" stroke="#777" stroke-width="1.5"/><line x1="12" y1="11" x2="16" y2="15" stroke="#c0392b" stroke-width="1.5"/><line x1="16" y1="11" x2="12" y2="15" stroke="#c0392b" stroke-width="1.5"/></svg><span class="label">Delete</span></div>
          <div class="ribbon-btn disabled"><svg width="28" height="28"><path d="M8 8H20V18H14L10 22V18H8V8Z" fill="none" stroke="#777" stroke-width="1.5"/><polygon points="12,13 16,10 16,16" fill="#777"/></svg><span class="label">Previous</span></div>
          <div class="ribbon-btn disabled"><svg width="28" height="28"><path d="M8 8H20V18H14L10 22V18H8V8Z" fill="none" stroke="#777" stroke-width="1.5"/><polygon points="16,13 12,10 12,16" fill="#777"/></svg><span class="label">Next</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><path d="M8 8H20V18H14L10 22V18H8V8Z" fill="none" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Show<br>Comments</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Comments</div>
        </div>
        <div class="ribbon-group" style="border-right:none">
          <div class="ribbon-btn"><svg width="28" height="28"><path d="M6 18Q10 10 14 18T22 10" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="6" y1="6" x2="22" y2="22" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Hide<br>Ink</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Ink</div>
        </div>
      </div>

      <!-- VIEW TAB -->
      <div class="ribbon-tab-content" id="tab-View" style="display:none;">
        <div class="ribbon-group">
          <div class="ribbon-btn active"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#4a90d9" stroke-width="1.5"/><rect x="6" y="8" width="4" height="12" fill="none" stroke="#4a90d9" stroke-width="1.5"/><line x1="6" y1="14" x2="10" y2="14" stroke="#4a90d9" stroke-width="1.5"/></svg><span class="label">Normal</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="8" y1="11" x2="14" y2="11" stroke="#bbb" stroke-width="1"/><line x1="8" y1="14" x2="16" y2="14" stroke="#bbb" stroke-width="1"/><line x1="8" y1="17" x2="12" y2="17" stroke="#bbb" stroke-width="1"/></svg><span class="label">Outline<br>View</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="6" height="5" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="16" y="8" width="6" height="5" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="6" y="15" width="6" height="5" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="16" y="15" width="6" height="5" fill="none" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Slide<br>Sorter</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="8" y="6" width="12" height="16" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="10" y="8" width="8" height="6" fill="none" stroke="#bbb" stroke-width="1"/><line x1="10" y1="16" x2="18" y2="16" stroke="#4a90d9" stroke-width="1"/><line x1="10" y1="18" x2="16" y2="18" stroke="#bbb" stroke-width="1"/><line x1="10" y1="20" x2="18" y2="20" stroke="#bbb" stroke-width="1"/></svg><span class="label">Notes<br>Page</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M10 20L10 16L18 16L18 20" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="14" y1="16" x2="14" y2="20" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Reading<br>View</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Presentation Views</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#4a90d9" stroke-width="1.5"/><rect x="6" y="8" width="16" height="3" fill="#4a90d9"/><rect x="6" y="18" width="16" height="2" fill="#4a90d9"/></svg><span class="label">Slide<br>Master</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="8" y="6" width="12" height="16" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="10" y="8" width="3" height="3" fill="#4a90d9"/><rect x="15" y="8" width="3" height="3" fill="#4a90d9"/><rect x="10" y="13" width="3" height="3" fill="#4a90d9"/><rect x="15" y="13" width="3" height="3" fill="#4a90d9"/><rect x="10" y="18" width="3" height="3" fill="#4a90d9"/><rect x="15" y="18" width="3" height="3" fill="#4a90d9"/></svg><span class="label">Handout<br>Master</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="8" y="6" width="12" height="16" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="10" y="8" width="8" height="5" fill="none" stroke="#4a90d9" stroke-width="1"/><rect x="10" y="15" width="8" height="5" fill="none" stroke="#4a90d9" stroke-width="1"/></svg><span class="label">Notes<br>Master</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Master Views</div>
        </div>
        <div class="ribbon-group" style="display:flex;flex-direction:column;justify-content:center;gap:4px;padding:0 8px;">
          <label style="display:flex;align-items:center;font-size:11px;color:#ccc;cursor:pointer"><input type="checkbox" style="margin-right:4px;accent-color:#c0392b"> Ruler</label>
          <label style="display:flex;align-items:center;font-size:11px;color:#ccc;cursor:pointer"><input type="checkbox" style="margin-right:4px;accent-color:#c0392b"> Gridlines</label>
          <label style="display:flex;align-items:center;font-size:11px;color:#ccc;cursor:pointer"><input type="checkbox" style="margin-right:4px;accent-color:#c0392b"> Guides</label>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="8" y="6" width="12" height="16" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="10" y1="10" x2="18" y2="10" stroke="#bbb" stroke-width="1"/><line x1="10" y1="14" x2="16" y2="14" stroke="#bbb" stroke-width="1"/><line x1="10" y1="18" x2="18" y2="18" stroke="#bbb" stroke-width="1"/></svg><span class="label">Notes</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Show</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><circle cx="12" cy="12" r="5" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="16" y1="16" x2="20" y2="20" stroke="#bbb" stroke-width="1.5"/><line x1="12" y1="10" x2="12" y2="14" stroke="#bbb" stroke-width="1"/><line x1="10" y1="12" x2="14" y2="12" stroke="#bbb" stroke-width="1"/></svg><span class="label">Zoom</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="16" height="12" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M10 10L14 14M18 10L14 14M10 18L14 14M18 18L14 14" stroke="#4a90d9" stroke-width="1.5"/></svg><span class="label">Fit to<br>Window</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Zoom</div>
        </div>
        <div class="ribbon-group">
          <div style="display:flex;flex-direction:column;gap:2px;">
            <div style="display:flex;align-items:center;padding:2px 4px;border-radius:2px;background:rgba(255,255,255,0.1);cursor:pointer">
              <svg width="16" height="16" style="margin-right:4px"><rect x="2" y="2" width="12" height="12" fill="#27ae60"/><rect x="2" y="8" width="12" height="6" fill="#e74c3c"/><rect x="8" y="2" width="6" height="12" fill="#4a90d9"/></svg>
              <span style="font-size:11px;color:#fff">Color</span>
            </div>
            <div style="display:flex;align-items:center;padding:2px 4px;border-radius:2px;cursor:pointer">
              <svg width="16" height="16" style="margin-right:4px"><rect x="2" y="2" width="12" height="12" fill="#ccc"/><rect x="2" y="8" width="12" height="6" fill="#888"/><rect x="8" y="2" width="6" height="12" fill="#555"/></svg>
              <span style="font-size:11px;color:#bbb">Grayscale</span>
            </div>
            <div style="display:flex;align-items:center;padding:2px 4px;border-radius:2px;cursor:pointer">
              <svg width="16" height="16" style="margin-right:4px"><rect x="2" y="2" width="12" height="12" fill="#fff" stroke="#bbb"/><rect x="8" y="2" width="6" height="12" fill="#000"/></svg>
              <span style="font-size:11px;color:#bbb">Black and White</span>
            </div>
          </div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Color/Grayscale</div>
        </div>
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="6" width="12" height="10" fill="none" stroke="#27ae60" stroke-width="1.5"/><line x1="6" y1="9" x2="18" y2="9" stroke="#27ae60" stroke-width="1.5"/><line x1="12" y1="6" x2="12" y2="16" stroke="#27ae60" stroke-width="1.5"/><line x1="6" y1="12" x2="18" y2="12" stroke="#27ae60" stroke-width="1.5"/></svg><span class="label">New<br>Window</span></div>
          <div style="display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;align-items:center;font-size:11px;color:#ccc;cursor:pointer"><svg width="16" height="16" style="margin-right:4px"><rect x="2" y="2" width="12" height="12" fill="none" stroke="#bbb"/><line x1="2" y1="8" x2="14" y2="8" stroke="#bbb"/></svg> Arrange All</div>
            <div style="display:flex;align-items:center;font-size:11px;color:#ccc;cursor:pointer"><svg width="16" height="16" style="margin-right:4px"><rect x="2" y="2" width="8" height="6" fill="none" stroke="#bbb"/><rect x="6" y="8" width="8" height="6" fill="none" stroke="#bbb"/></svg> Cascade</div>
            <div style="display:flex;align-items:center;font-size:11px;color:#ccc;cursor:pointer"><svg width="16" height="16" style="margin-right:4px"><rect x="2" y="2" width="12" height="12" fill="none" stroke="#bbb"/><line x1="8" y1="2" x2="8" y2="14" stroke="#4a90d9"/><polygon points="8,8 5,5 5,11" fill="#4a90d9"/><polygon points="8,8 11,5 11,11" fill="#4a90d9"/></svg> Move Split</div>
          </div>
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="6" y="8" width="10" height="8" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="12" y="12" width="10" height="8" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M11 6C15 6 18 9 18 13" fill="none" stroke="#4a90d9" stroke-width="1.5"/><polygon points="18,13 16,10 20,10" fill="#4a90d9"/></svg><span class="label">Switch<br>Windows</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Window</div>
        </div>
        <div class="ribbon-group" style="border-right:none">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="8" y="6" width="12" height="16" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M8 10C12 10 12 14 16 14C20 14 20 18 24 18" fill="none" stroke="#c0392b" stroke-width="1.5"/></svg><span class="label">Macros</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Macros</div>
        </div>
      </div>

      <!-- HELP TAB -->
      <div class="ribbon-tab-content" id="tab-Help" style="display:none;">
        <div class="ribbon-group">
          <div class="ribbon-btn"><svg width="28" height="28"><circle cx="14" cy="14" r="10" fill="none" stroke="#4a90d9" stroke-width="1.5"/><text x="14" y="20" fill="#4a90d9" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">?</text></svg><span class="label">Help</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><circle cx="14" cy="10" r="4" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M8 20C8 16 12 15 14 15C16 15 20 16 20 20" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M10 12C9 14 8 16 8 16C8 16 8 18 10 20" fill="none" stroke="#bbb" stroke-width="1"/></svg><span class="label">Contact<br>Support</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><circle cx="12" cy="12" r="4" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M6 22C6 18 10 17 12 17C14 17 18 18 18 22" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M16 8H22V14H18L16 16V14Z" fill="none" stroke="#bbb" stroke-width="1"/></svg><span class="label">Feedback</span></div>
          <div class="ribbon-btn"><svg width="28" height="28"><path d="M6 14L14 10L22 14L14 18Z" fill="none" stroke="#bbb" stroke-width="1.5"/><path d="M10 16V20C10 22 14 24 14 24C14 24 18 22 18 20V16" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="22" y1="14" x2="22" y2="20" stroke="#bbb" stroke-width="1.5"/><polygon points="21,20 23,20 24,22 20,22" fill="#bbb"/></svg><span class="label">Show<br>Training</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Help</div>
        </div>
        <div class="ribbon-group" style="border-right:none">
          <div class="ribbon-btn"><svg width="28" height="28"><rect x="10" y="6" width="8" height="16" rx="1" fill="none" stroke="#bbb" stroke-width="1.5"/><line x1="13" y1="20" x2="15" y2="20" stroke="#bbb" stroke-width="1.5"/></svg><span class="label">Get PowerPoint<br>Mobile App</span></div>
          <div style="font-size:9px;color:#666;align-self:flex-end;padding-bottom:4px;padding-left:4px">Mobile</div>
        </div>
      </div>
"""

file_path = "c:\\Users\\AkashK\\Desktop\\PowerPoint Software Portfolio\\index.html"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

target = "    </div>\n\n    <!-- MAIN CONTENT -->"
if target in text:
    text = text.replace(target, html_to_add + "\n" + target)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Success")
else:
    print("Target not found")
