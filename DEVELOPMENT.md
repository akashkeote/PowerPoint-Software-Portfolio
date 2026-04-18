# Portfolio Architecture & Contribution Guidelines

Welcome to the PowerPoint Software Portfolio! 🚀 

This repository relies on a highly specialized **Atomic Feature Architecture**. It doesn’t matter if you are a MERN stack developer, a Python guru, or a beginner—our codebase is designed so you can read, debug, and expand it with zero friction.

To maintain maximum code quality and readability, we strictly enforce the following rules.

---

## 1. The 50-Line Modularity Rule (The Golden Rule)
We categorically reject spaghetti code. No single file (HTML, CSS, or JS) should significantly exceed **50-70 lines of code**. 

If your file is getting too long, **domain-split it**:
- **HTML**: Use our `<include src="./path/to/partial.html" />` Vite plugin to extract grids, tabs, or panels into smaller chunks.
- **JavaScript**: Isolate UI logic `.ui.js`, physics logic `.loop.js`, event bindings `.events.js`, or state data into specialized sibling modules. 
- **CSS**: Extract complex layout segments (like the file menu or ribbon tab transitions) out of `responsive.css` and into isolated `src/partials/` CSS feature files.

## 2. Feature-First Folder Structure
Instead of throwing all JavaScript in `src/js/` or all HTML into big blobs, group logic by its **feature domain**.

```text
src/
 ├─ core/                  # Core engine: utils, layouts, theme state
 ├─ features/              # Complex domain logic
 │   ├─ presentation/      # Presentation slide navigation & touch swiping
 │   ├─ physics/           # Matter.js implementations (hero, skills)
 │   └─ scrollytelling/    # Scrubbing renderer and resize observers
 └─ partials/              # Reusable DOM nodes
     ├─ file-menu/         # Extracted file menu pages (home, info, save)
     └─ ribbon/            # Extracted ribbon tabs (insert, animations)
```

**Adding a New Feature?**
Create a new folder in `src/features/`. e.g., `/features/easter-egg/`.
Put the `easter-egg.html`, `easter-egg.js`, and `easter-egg.css` all together. 

## 3. How the HTML Injector Works
We built a custom recursive resolver in `vite.config.ts`. If you need to drop a chunk of HTML into `index.html`, do not copy-paste code.

Instead, add:
`<include src="src/partials/my-new-component.html" />`

The bundler will recursively resolve the paths and stitch them together before serving to the browser. This keeps the DOM legible.

## 4. Single Responsibility Principle (SRP)
Every file must have exactly **one reason to change**:
- A file handling keyboard events *should not* also render UI buttons.
- A file configuring a physics engine *should not* handle window resize debouncing.

By maintaining this, you eliminate 90% of structural bugs. 

If an AI or Junior Dev contributes to this repo in the future, these guidelines are mandatory. Build it granular, keep it readable, and preserve the performance. Happy coding!
