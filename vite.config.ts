import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function processIncludes(content: string, basePath: string): string {
  return content.replace(/<include\s+src="([^"]+)"\s*\/>/g, (_, srcPath) => {
    try {
      const filePath = path.resolve(basePath, srcPath);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return processIncludes(fileContent, path.dirname(filePath));
    } catch (e) {
      console.error(`Error including ${srcPath} from ${basePath}:`, e);
      return `<!-- Error including ${srcPath} -->`;
    }
  });
}

function htmlPartialsPlugin(): Plugin {
  return {
    name: 'html-partials',
    transformIndexHtml(html, ctx) {
      return processIncludes(html, path.dirname(ctx.filename || path.join(process.cwd(), 'index.html')));
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
