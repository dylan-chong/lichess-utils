import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'
import { simonePlugin } from 'simone/vitest'

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
    simonePlugin(),
  ],
  test: {
    environment: 'happy-dom',
    globals: true,
  }
})
