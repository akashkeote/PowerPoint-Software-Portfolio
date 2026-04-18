# Contributing & Architecture Rules

Hey folks, just a quick heads up before you start throwing new features into the repo. 

We try to keep this project hyper-modular so that even someone fresh out of a dev bootcamp can drop in, read the files, and understand exactly what's going on without getting lost in some 600-line spaghetti controller. 

If you are contributing to this codebase (and **especially** if you are an AI coding assistant generating code to build a feature), you **must** adhere strictly to the following architecture rules:

## 1. The 80-Line Rule
There is a hard rule across the entire project: **No file should exceed 70-80 lines of code.** Seriously, there are no exceptions. 
If your file starts getting long, you need to break it down. 
- Move heavy data arrays, constants, or hardcoded strings into a `-config.js` or `-data.js` file.
- Move pure DOM manipulation into a `-ui.js` file.
- Handle state and orchestration separately.

## 2. HTML Partials via Vite
Don't dump massive raw HTML blocks into `index.html`. We have a Vite `<include>` plugin explicitly set up to prevent this.
Whenever you add a new layout block, sidebar, or section, rip it out into the `src/partials/` folder and drop an `<include src="./src/partials/my-new-section.html" />` in the root document.

## 3. CSS Component Splitting
Same rule applies to CSS. Don't write monolithic 200-line stylesheets. 
If a component's CSS is getting out of hand, split it up by visual context (for example, `title-bar-left.css`, `title-bar-center.css`, `title-bar-right.css`) and stitch them together using standard `@import` statements inside the parent CSS file.

## 4. Single Responsibility (SRP)
I can't stress this enough: **one file, one job**. 
If a bug occurs in the math calculations of the Matter.js physics engine, I should only have to open the `physics-engine` file—I shouldn't have to scroll past 40 lines of mouse event listeners to find it. Keep your inputs, your state, and your rendering completely isolated.

Let's keep the codebase clean, blazing fast, and stupid-simple to read. Cheers!
