import { defineConfig } from 'vite'
import swc from 'unplugin-swc'
import { readFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        parser: { syntax: 'typescript', tsx: true },
        transform: {
          react: {
            pragma: 'h',
            pragmaFrag: 'Fragment',
            importSource: 'preact',
            runtime: 'automatic',
          },
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: './src/main.tsx',
      name: 'LichessBoardSpeaker',
      formats: ['iife'],
      fileName: () => 'lichess-board-speaker.user.js'
    },
    outDir: '.',
    minify: false,
    sourcemap: 'inline',
    rollupOptions: {
      external: ['three'],
      output: {
        banner: generateUserscriptHeader(),
        format: 'iife',
        globals: { three: 'THREE' },
        inlineDynamicImports: true
      }
    }
  }
})

function generateUserscriptHeader() {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
  return `// ==UserScript==
// @name        lichess-board-speaker
// @description Blindfold chess training tool for lichess.org
// @version     ${pkg.version}
// @match       *://lichess.org/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
// @grant       none
// @inject-into content
// @updateURL   https://cdn.jsdelivr.net/gh/dylan-chong/lichess-utils@main/lichess-board-speaker.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/dylan-chong/lichess-utils@main/lichess-board-speaker.user.js
// ==/UserScript==`
}
