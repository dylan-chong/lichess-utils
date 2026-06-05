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
        'src/platform/three.ts', // 3D platform abstraction - not testable in test environment
        'src/presentation/3d/canvas.ts', // 3D rendering - requires WebGL context
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
