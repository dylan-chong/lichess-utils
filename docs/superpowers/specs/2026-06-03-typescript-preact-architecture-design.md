# TypeScript + Preact Architecture Design

**Date:** 2026-06-03  
**Project:** lichess-board-speaker  
**Purpose:** Migrate existing userscript to maintainable TypeScript + Preact + Vitest architecture

---

## Overview

Redesign the lichess-board-speaker userscript with a functional, testable architecture that:
- Compiles TypeScript + Preact to single `.user.js` file
- Uses Preact signals for reactive state management
- Organizes code by purity level (pure functions, DOM operations, effects, handlers)
- Tests everything with Vitest + Simone
- Builds with Rust tooling (SWC, Biome) for speed

---

## Architecture Decisions

### **Framework: Preact + Signals**

**Why Preact:**
- Small bundle size (~3kb vs Vue's ~34kb)
- React-like API with JSX
- Excellent TypeScript support
- Standard in Vite ecosystem

**Why Signals:**
- Fine-grained reactivity (~2kb)
- Automatic dependency tracking
- No manual subscriptions/cleanup
- Works across components and vanilla JS

### **Build Tool: Vite + SWC**

**Vite:** Standard bundler for Preact projects  
**SWC:** Rust-based TypeScript/JSX compiler (faster than esbuild)  
**Output:** Single `lichess-board-speaker.user.js` file (not minified, with inline sourcemaps)

### **Testing: Vitest + Simone**

**Vitest:** Vite-native test runner with happy-dom for DOM tests  
**Simone:** Type-safe mocking for module-level functions (local install)  
**Pattern:** Tests live next to source files

### **Code Quality: Biome + Husky**

**Biome:** Rust-based linter + formatter (100x faster than ESLint/Prettier)  
**Husky:** Pre-commit hooks (lint, format, type-check, test, build)

---

## File Structure

```
src/
├── main.ts                     # Entry point - coordinates state, sets up effects
├── settings/
│   ├── settingsStore.ts        # Preact signals for all 14 settings
│   ├── types.ts
│   └── defaults.ts
├── pure/                       # Pure functions (no side effects, easy to test)
│   ├── coordinates.ts          # pixelsToSquare, squareToPixels
│   ├── speechText.ts           # generateQuadrantText, generateAllPiecesText
│   ├── commandParser.ts        # parseDrawCommand
│   ├── pieceGrouping.ts        # filterQuadrant, groupByColorAndType
│   └── flashTiming.ts
├── dom/                        # DOM operations (querySelector, createElement, etc.)
│   ├── boardReader.ts          # readPiecePositions, getPlayerColor
│   ├── boardObserver.ts        # MutationObserver → boardChanged signal
│   ├── renderer3d.ts           # Three.js canvas + scene management
│   └── overlays/
│       ├── flash.ts            # Flash overlay element + show/hide
│       ├── dividers.ts         # SVG divider lines
│       └── drawings.ts         # SVG circles/arrows
├── browser/                    # Browser API wrappers
│   └── speechSynthesizer.ts    # Web Speech API wrapper
├── effects/                    # Signal watchers (thin glue layer)
│   ├── on3dBoard.ts            # Watches customBoard/obfuscation settings
│   ├── onDividers.ts           # Watches dividersEnabled + customBoardEnabled
│   ├── onFlash.ts              # Watches flashMode settings + boardChanged
│   ├── onSpeechRate.ts         # Watches speakRate
│   └── onBoardChange.ts        # Watches boardChanged for 3D updates
├── handlers/                   # Business logic (orchestrates pure + DOM + browser)
│   ├── update3dBoard.ts        # Apply settings to 3D renderer
│   ├── updateDividers.ts       # Show/hide/position dividers
│   ├── handleFlash.ts          # Flash timing logic
│   ├── handleBoardUpdate.ts    # Update 3D board with new positions
│   └── handleSpeechCommand.ts  # speakQuadrant, speakAll, speakColor, stop
├── commands/
│   └── keyboardInput.ts        # Listen to move input, dispatch to handlers
└── components/                 # Preact UI
    ├── ControlPanel.tsx        # Root component with nested button rows
    ├── ButtonRow.tsx
    ├── SettingButton.tsx       # Cycles through options, updates signal
    └── PiecesList.tsx          # Shows live piece positions
```

---

## Key Patterns

### **No Classes or Factory Functions**

All code uses module-level functions (required for Simone mocking):

```typescript
// ✓ Module-level functions
export function createRenderer3D(): Renderer3DState { }
export function updateBlur(state: Renderer3DState, amount: number): void { }

// ✗ Classes (not mockable with Simone)
class Renderer3D {
  updateBlur(amount: number) { }
}

// ✗ Factory functions (not mockable with Simone)
function createRenderer3D() {
  return {
    updateBlur(amount) { }
  }
}
```

### **Explicit State Types**

State lives in typed objects, passed to functions:

```typescript
interface Renderer3DState {
  scene: THREE.Scene
  canvas: HTMLCanvasElement
  camera: THREE.Camera
  renderer: THREE.WebGLRenderer
}

export function createRenderer3D(): Renderer3DState {
  // Create and return state
}

export function updateBlur(state: Renderer3DState, amount: number): void {
  // Mutate state (unavoidable with Three.js/DOM)
}
```

### **Settings as Signals**

All 14 settings are Preact signals with auto-save:

```typescript
export const settings = {
  speakRate: signal(0.5),
  blur: signal(0),
  parallax: signal(0),
  customBoardEnabled: signal(false),
  // ... 10 more
}

// Auto-save effect
effect(() => {
  Object.values(settings).forEach(s => s.value) // Track all
  saveSettings()
})
```

### **Effects Watch Signals**

Effects set up automatic reactions to signal changes:

```typescript
export function setup3dBoardEffect(renderer3dState: Renderer3DState) {
  return effect(() => {
    // Reads signals - automatically tracks dependencies
    if (settings.customBoardEnabled.value) {
      updateBlur(renderer3dState, settings.blur.value)
      updateParallax(renderer3dState, settings.parallax.value)
      // ...
    }
  })
}
```

### **Handlers Orchestrate**

Handlers compose pure functions with DOM/browser operations:

```typescript
export function handleSpeechCommand(quadrant: string) {
  const pieces = readPiecePositions()             // DOM
  const filtered = filterQuadrant(pieces, quadrant) // Pure
  const text = generateQuadrantText(filtered)      // Pure
  speak(text, settings.speakRate.value)           // Browser API
}
```

### **Main Coordinates Everything**

```typescript
async function init() {
  await waitForElement('.keyboard-move')
  loadSettings()

  // Create state
  const renderer3dState = createRenderer3D()
  const flashState = createFlashOverlay()
  const dividersState = createDividers()
  const boardObserverState = createBoardObserver()

  // Start observer
  startBoardObserver(boardObserverState)

  // Set up effects (return cleanup functions)
  const cleanup3d = setup3dBoardEffect(renderer3dState)
  const cleanupFlash = setupFlashEffect(flashState, boardObserverState)
  const cleanupDividers = setupDividersEffect(dividersState)

  // Set up commands
  setupKeyboardCommands()

  // Mount Preact UI
  const mountPoint = document.createElement('div')
  document.querySelector('.keyboard-move')?.appendChild(mountPoint)
  render(<ControlPanel />, mountPoint)

  // Return cleanup
  return () => {
    cleanup3d()
    cleanupFlash()
    cleanupDividers()
    destroyRenderer3D(renderer3dState)
    destroyFlashOverlay(flashState)
    destroyDividers(dividersState)
    render(null, mountPoint)
  }
}
```

---

## Data Flow Examples

### **User Clicks Button**

```
1. SettingButton.tsx → settings.blur.value = 1
2. effects/on3dBoard effect detects change (auto)
3. effects/on3dBoard calls handlers/update3dBoard(settings, state)
4. handlers/update3dBoard calls dom/renderer3d.updateBlur(state, 1)
5. dom/renderer3d mutates Three.js scene
```

### **User Makes Move on Lichess**

```
1. Lichess updates DOM
2. dom/boardObserver MutationObserver fires
3. dom/boardObserver increments boardChanged signal
4. effects/onBoardChange effect detects change
5. effects/onBoardChange calls handlers/handleBoardUpdate()
6. handlers/handleBoardUpdate:
   → dom/boardReader.readPiecePositions()
   → dom/renderer3d.updatePieces(state, pieces)
7. effects/onFlash also detects boardChanged
8. effects/onFlash calls handlers/handleFlash()
9. handlers/handleFlash orchestrates flash timing
```

### **User Types "pwk" Command**

```
1. commands/keyboardInput detects "pwk"
2. commands/keyboardInput calls handlers/handleSpeechCommand('wk')
3. handlers/handleSpeechCommand:
   → dom/boardReader.readPiecePositions()
   → pure/pieceGrouping.filterQuadrant(pieces, 'wk')
   → pure/speechText.generateQuadrantText(filtered)
   → browser/speechSynthesizer.speak(text, rate)
```

---

## Testing Strategy

### **Pure Functions** (pure/)
- No mocking needed
- Input → output assertions
- Fast, reliable

### **DOM Operations** (dom/)
- Use happy-dom (built into Vitest)
- Create mock DOM structures
- Test reading/manipulation logic

### **Browser APIs** (browser/)
- Mock Web APIs (vi.stubGlobal)
- Test wrappers call APIs correctly

### **Handlers** (handlers/)
- Mock dependencies with Simone
- Test orchestration logic
- Verify correct functions called with right data

### **Effects** (effects/)
- Mock handlers with Simone
- Manipulate signals directly (no mocking signals)
- Verify handlers called on signal changes

### **Components** (components/)
- Use @testing-library/preact
- Test rendering, interactions, conditional display
- Manipulate signals directly

### **Testing with Simone Pattern**

```typescript
import { mockModule } from 'simone'
import { settings } from '../settings/settingsStore'

const renderer3d = mockModule<typeof import('../dom/renderer3d')>('../dom/renderer3d')

it('updates blur when setting changes', () => {
  const mockState = { /* ... */ }
  
  // Set signal (real, not mocked)
  settings.blur.value = 3
  
  // Expect function called
  renderer3d.expects('updateBlur')
    .withArgs(mockState, 3)
    .returns(undefined)
  
  // Call handler
  update3dBoard(mockState)
  
  // Simone verifies expectation met
})
```

---

## Build Configuration

### **package.json**

```json
{
  "name": "lichess-board-speaker",
  "version": "3.4.7",
  "type": "module",
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "type-check": "tsc --noEmit",
    "lint": "biome check src/",
    "lint:fix": "biome check --write src/",
    "format": "biome format --write src/",
    "prepare": "husky"
  },
  "dependencies": {
    "preact": "^10.19.0",
    "@preact/signals": "^1.2.0",
    "three": "^0.160.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "@swc/core": "^1.7.0",
    "@testing-library/preact": "^3.2.0",
    "@vitest/ui": "^1.2.0",
    "happy-dom": "^12.10.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "typescript": "^5.3.0",
    "unplugin-swc": "^1.5.0",
    "vite": "^5.0.0",
    "vitest": "^1.2.0"
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "biome check --write",
      "biome format --write"
    ]
  }
}
```

### **vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import swc from 'unplugin-swc'

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
      entry: './src/main.ts',
      name: 'LichessBoardSpeaker',
      formats: ['iife'],
      fileName: () => 'lichess-board-speaker.user.js'
    },
    outDir: '.',
    minify: false,
    sourcemap: 'inline',
    rollupOptions: {
      external: [],
      output: {
        banner: generateUserscriptHeader(),
        format: 'iife',
        inlineDynamicImports: true
      }
    }
  }
})

function generateUserscriptHeader() {
  const pkg = require('./package.json')
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
```

### **vitest.config.ts**

```typescript
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
    simonePlugin()
  ],
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/main.ts']
    }
  }
})
```

### **biome.json**

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "include": ["src/**/*.ts", "src/**/*.tsx"],
    "ignore": ["node_modules", "dist", "*.user.js"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "warn",
        "noConsoleLog": "off"
      },
      "style": {
        "useConst": "error",
        "noVar": "error"
      }
    }
  },
  "javascript": {
    "formatter": {
      "semicolons": "asNeeded",
      "quoteStyle": "single",
      "trailingCommas": "es5"
    }
  }
}
```

### **Pre-commit Hook** (.husky/pre-commit)

```bash
#!/usr/bin/env sh

# Lint and format staged files
npx lint-staged

# Type check
npm run type-check

# Run tests
npm test

# Build (ensure it compiles)
npm run build
```

---

## Simone Installation

**Pack simone locally:**
```bash
cd /Users/dylanchong/Development/Other/simone
npm pack
# Creates simone-0.0.0.tgz
```

**Install in project:**
```bash
cd /Users/dylanchong/Development/Other/lichess-utils
npm install -D /Users/dylanchong/Development/Other/simone/simone-0.0.0.tgz
```

---

## Development Workflow

### **Development Mode**
```bash
npm run dev
```
- SWC compiles TypeScript/JSX
- Vite watches for changes
- Auto-rebuilds `lichess-board-speaker.user.js`
- Reload lichess.org to test

### **Testing**
```bash
npm run test:watch
```
- SWC compiles test files
- Vitest re-runs affected tests
- Instant feedback

### **Before Commit**
```bash
git add .
git commit -m "message"
```
Pre-commit hook runs automatically:
1. Lint + format staged files (~50ms)
2. Type check (~1-3s)
3. Run all tests (~1-2s)
4. Build (~0.8s)

Total: ~3-7 seconds

If any step fails → commit blocked

### **Production Build**
```bash
npm run build
```
- Outputs single `lichess-board-speaker.user.js`
- Not minified (readable)
- Inline source maps
- Userscript header auto-generated

---

## Why This Architecture

### **Testability**
- Pure functions: zero setup
- DOM operations: happy-dom provides environment
- All code testable with Vitest + Simone
- Fast tests (~1-2s full suite)

### **Maintainability**
- Clear separation: pure / dom / browser / effects / handlers
- Easy to find code ("where's coordinate math?" → pure/)
- Module-level functions (no `this` confusion)
- Explicit state types

### **Type Safety**
- Full TypeScript coverage
- Simone enforces correct function signatures
- Preact signals typed
- Compile-time errors caught early

### **Performance**
- Rust tooling (SWC + Biome) = fast builds
- Preact signals = fine-grained reactivity
- Small bundle (~5kb Preact + signals)
- Minimal overhead on lichess pages

### **Developer Experience**
- Instant rebuilds (SWC watch mode)
- Fast tests (Vitest + SWC)
- Auto-format on save (Biome)
- Pre-commit hooks catch issues early
- Hot module replacement in dev

---

## Trade-offs

### **Honest Mutation**
- DOM, Three.js, timers require mutation
- We don't hide this - functions explicitly mutate state
- Pure where possible, mutable where necessary

### **Simone Constraint**
- Requires module-level functions (no classes)
- Can't mock class methods
- This is a feature - forces functional style

### **Build Complexity**
- Vite + SWC + Biome + Husky = more tools
- But: faster builds, better DX, catch errors early
- Worth the setup cost

### **State Management**
- Signals for settings (reactive)
- Explicit state objects for DOM/Three.js/timers (honest mutation)
- No single state management library
- Simple, transparent

---

## Next Steps

1. Scaffold project structure
2. Set up build tooling (Vite + SWC)
3. Configure testing (Vitest + Simone)
4. Set up Biome + Husky
5. Implement settings store with signals
6. Implement pure functions (coordinates, text generation, parsers)
7. Implement DOM operations (board reader, overlays, 3D renderer)
8. Implement handlers (orchestration logic)
9. Implement effects (signal watchers)
10. Implement Preact components
11. Wire everything together in main.ts
12. Test coverage for all layers
13. Manual testing on lichess.org

---

**End of Design Document**
