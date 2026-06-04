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
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'node_modules/**',
        '**/types.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  }
})
