import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function htmlPartialsPlugin(): Plugin {
  return {
    name: 'html-partials',
    transformIndexHtml(html) {
      // Support nested includes by running it recursively if needed,
      // but for now simple regex works since we only do one level of `<include src="..."/>`
      let transformed = html;
      let previous = '';
      while (transformed !== previous) {
        previous = transformed;
        transformed = transformed.replace(/<include\s+src="([^"]+)"\s*\/>/g, (_, srcPath) => {
          try {
            const filePath = path.resolve(process.cwd(), srcPath);
            return fs.readFileSync(filePath, 'utf-8');
          } catch (e) {
            console.error(`Error including ${srcPath}:`, e);
            return `<!-- Error including ${srcPath} -->`;
          }
        });
      }
      return transformed;
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  plugins: [react(), htmlPartialsPlugin()],
})
