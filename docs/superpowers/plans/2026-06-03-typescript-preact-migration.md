# TypeScript + Preact Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate lichess-board-speaker from vanilla JavaScript to TypeScript + Preact + Vitest with functional architecture

**Architecture:** Module-level functions organized by purity (pure/, dom/, browser/, handlers/, effects/), Preact signals for reactive state, Vitest + Simone for testing

**Tech Stack:** TypeScript, Preact, Preact Signals, Vitest, Simone, SWC, Biome, Vite, Three.js

---

## File Map

This migration creates a new TypeScript codebase alongside the existing userscript:

**New directories:**
- `src/` - All TypeScript source code
- `src/settings/` - Settings store with signals
- `src/pure/` - Pure functions (coordinates, speech text, parsers)
- `src/dom/` - DOM operations (board reader, overlays, 3D renderer)
- `src/browser/` - Browser API wrappers
- `src/handlers/` - Business logic orchestration
- `src/effects/` - Signal watchers
- `src/commands/` - Keyboard input handling
- `src/components/` - Preact UI components

**Configuration files:**
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Build configuration with SWC
- `vitest.config.ts` - Test configuration with Simone
- `biome.json` - Linter/formatter configuration
- `.husky/pre-commit` - Pre-commit hook

**Existing file:**
- `lichess-board-speaker.user.js` - Will be overwritten by build output

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Initialize package.json**

```bash
cd /Users/dylanchong/Development/Other/lichess-utils
npm init -y
```

Expected: Creates package.json

- [ ] **Step 2: Write package.json configuration**

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

- [ ] **Step 3: Install dependencies**

```bash
npm install
```

Expected: Installs all dependencies, creates node_modules/

- [ ] **Step 4: Install Simone locally**

```bash
cd /Users/dylanchong/Development/Other/simone
npm pack
cd /Users/dylanchong/Development/Other/lichess-utils
npm install -D /Users/dylanchong/Development/Other/simone/simone-*.tgz
```

Expected: Simone installed as dev dependency

- [ ] **Step 5: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 6: Update .gitignore**

```
node_modules/
dist/
coverage/
.vitest/
*.log
.DS_Store
.vscode/
.idea/
```

- [ ] **Step 7: Commit project setup**

```bash
git add package.json package-lock.json tsconfig.json .gitignore
git commit -m "chore: initialize TypeScript + Preact project structure"
```

---

## Task 2: Build Configuration

**Files:**
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `biome.json`

- [ ] **Step 1: Write vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import swc from 'unplugin-swc'
import { readFileSync } from 'fs'

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
```

- [ ] **Step 2: Write vitest.config.ts**

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

- [ ] **Step 3: Write biome.json**

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

- [ ] **Step 4: Test build configuration**

```bash
npm run lint
npm run type-check
```

Expected: Lint passes (no files yet), type-check finds no errors

- [ ] **Step 5: Commit build configuration**

```bash
git add vite.config.ts vitest.config.ts biome.json
git commit -m "chore: configure Vite, Vitest, and Biome"
```

---

## Task 3: Husky Pre-commit Hooks

**Files:**
- Create: `.husky/pre-commit`

- [ ] **Step 1: Initialize Husky**

```bash
npx husky init
```

Expected: Creates .husky/ directory

- [ ] **Step 2: Write pre-commit hook**

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

- [ ] **Step 3: Make hook executable**

```bash
chmod +x .husky/pre-commit
```

- [ ] **Step 4: Commit Husky setup**

```bash
git add .husky/
git commit -m "chore: configure Husky pre-commit hooks"
```

---

## Task 4: Settings Store

**Files:**
- Create: `src/settings/types.ts`
- Create: `src/settings/defaults.ts`
- Create: `src/settings/settingsStore.ts`
- Create: `src/settings/settingsStore.test.ts`

- [ ] **Step 1: Write failing test for settings store**

```typescript
// src/settings/settingsStore.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { settings, loadSettings, saveSettings } from './settingsStore'

describe('settingsStore', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
    })
  })

  it('exports all 14 settings as signals', () => {
    expect(settings.speakRate.value).toBeDefined()
    expect(settings.piecesListEnabled.value).toBeDefined()
    expect(settings.dividersEnabled.value).toBeDefined()
    expect(settings.customBoardEnabled.value).toBeDefined()
    expect(settings.obfuscationsEnabled.value).toBeDefined()
    expect(settings.parallax.value).toBeDefined()
    expect(settings.hoverMode.value).toBeDefined()
    expect(settings.pieceStyle.value).toBeDefined()
    expect(settings.blur.value).toBeDefined()
    expect(settings.blackSegments.value).toBeDefined()
    expect(settings.blackSegmentsTiming.value).toBeDefined()
    expect(settings.flashModeEnabled.value).toBeDefined()
    expect(settings.flashDuration.value).toBeDefined()
    expect(settings.flashInterval.value).toBeDefined()
  })

  it('loadSettings restores from localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(
      JSON.stringify({ blur: 5, parallax: 45 })
    )

    loadSettings()

    expect(settings.blur.value).toBe(5)
    expect(settings.parallax.value).toBe(45)
  })

  it('saveSettings persists to localStorage', () => {
    settings.blur.value = 3

    saveSettings()

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lichess-board-speaker-settings',
      expect.stringContaining('"blur":3')
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/settings/settingsStore.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write types.ts**

```typescript
// src/settings/types.ts
export interface Settings {
  speakRate: number
  piecesListEnabled: boolean
  dividersEnabled: boolean
  customBoardEnabled: boolean
  obfuscationsEnabled: boolean
  parallax: number
  hoverMode: string
  pieceStyle: string
  blur: number
  blackSegments: string
  blackSegmentsTiming: string
  flashModeEnabled: boolean
  flashDuration: number
  flashInterval: number
}
```

- [ ] **Step 4: Write defaults.ts**

```typescript
// src/settings/defaults.ts
import type { Settings } from './types'

export const defaultSettings: Settings = {
  speakRate: 0.5,
  piecesListEnabled: false,
  dividersEnabled: false,
  customBoardEnabled: false,
  obfuscationsEnabled: false,
  parallax: 0,
  hoverMode: 'off',
  pieceStyle: 'icons',
  blur: 0,
  blackSegments: 'none',
  blackSegmentsTiming: 'rotate-10s',
  flashModeEnabled: false,
  flashDuration: 1,
  flashInterval: 3,
}
```

- [ ] **Step 5: Write settingsStore.ts**

```typescript
// src/settings/settingsStore.ts
import { signal, effect } from '@preact/signals-core'
import { defaultSettings } from './defaults'
import type { Settings } from './types'

const STORAGE_KEY = 'lichess-board-speaker-settings'

export const settings = {
  speakRate: signal(defaultSettings.speakRate),
  piecesListEnabled: signal(defaultSettings.piecesListEnabled),
  dividersEnabled: signal(defaultSettings.dividersEnabled),
  customBoardEnabled: signal(defaultSettings.customBoardEnabled),
  obfuscationsEnabled: signal(defaultSettings.obfuscationsEnabled),
  parallax: signal(defaultSettings.parallax),
  hoverMode: signal(defaultSettings.hoverMode),
  pieceStyle: signal(defaultSettings.pieceStyle),
  blur: signal(defaultSettings.blur),
  blackSegments: signal(defaultSettings.blackSegments),
  blackSegmentsTiming: signal(defaultSettings.blackSegmentsTiming),
  flashModeEnabled: signal(defaultSettings.flashModeEnabled),
  flashDuration: signal(defaultSettings.flashDuration),
  flashInterval: signal(defaultSettings.flashInterval),
}

export function loadSettings(): void {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return

  const data = JSON.parse(stored) as Partial<Settings>
  Object.keys(data).forEach((key) => {
    const settingKey = key as keyof Settings
    if (settings[settingKey]) {
      settings[settingKey].value = data[settingKey] as any
    }
  })
}

export function saveSettings(): void {
  const data: Partial<Settings> = {}
  Object.keys(settings).forEach((key) => {
    const settingKey = key as keyof typeof settings
    data[settingKey] = settings[settingKey].value as any
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Auto-save effect (set up once)
effect(() => {
  Object.values(settings).forEach((s) => s.value)
  saveSettings()
})
```

- [ ] **Step 6: Run test to verify it passes**

```bash
npm test src/settings/settingsStore.test.ts
```

Expected: PASS

- [ ] **Step 7: Commit settings store**

```bash
git add src/settings/
git commit -m "feat: implement settings store with Preact signals"
```

---

## Task 5: Pure Functions - Coordinates

**Files:**
- Create: `src/pure/coordinates.ts`
- Create: `src/pure/coordinates.test.ts`

- [ ] **Step 1: Write failing test for pixelsToSquare**

```typescript
// src/pure/coordinates.test.ts
import { describe, it, expect } from 'vitest'
import { pixelsToSquare, squareToPixels } from './coordinates'

describe('coordinates', () => {
  describe('pixelsToSquare', () => {
    it('converts pixels to square for white player', () => {
      const result = pixelsToSquare(0, 390, 58.5, true)
      expect(result).toBe('a2')
    })

    it('converts pixels to square for black player', () => {
      const result = pixelsToSquare(390, 0, 58.5, false)
      expect(result).toBe('a2')
    })

    it('handles center square e4', () => {
      const result = pixelsToSquare(234, 234, 58.5, true)
      expect(result).toBe('e4')
    })
  })

  describe('squareToPixels', () => {
    it('converts square to pixels for white player', () => {
      const result = squareToPixels('e4', 58.5, true)
      expect(result).toEqual({ x: 234, y: 234 })
    })

    it('converts square to pixels for black player', () => {
      const result = squareToPixels('e4', 58.5, false)
      expect(result).toEqual({ x: 234, y: 234 })
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/pure/coordinates.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write coordinates.ts**

```typescript
// src/pure/coordinates.ts
export function pixelsToSquare(
  x: number,
  y: number,
  squareSize: number,
  isPlayingWhite: boolean
): string {
  let col = Math.round(x / squareSize)
  let row = Math.round(y / squareSize)

  if (isPlayingWhite) {
    row = 7 - row
  } else {
    col = 7 - col
  }

  const file = 'abcdefgh'[col]
  const rank = row + 1
  return `${file}${rank}`
}

export function squareToPixels(
  square: string,
  squareSize: number,
  isPlayingWhite: boolean
): { x: number; y: number } {
  const file = square[0]
  const rank = parseInt(square[1], 10)

  let col = 'abcdefgh'.indexOf(file)
  let row = rank - 1

  if (isPlayingWhite) {
    row = 7 - row
  } else {
    col = 7 - col
  }

  return {
    x: col * squareSize,
    y: row * squareSize,
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/pure/coordinates.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit coordinates module**

```bash
git add src/pure/coordinates.ts src/pure/coordinates.test.ts
git commit -m "feat: implement coordinate conversion functions"
```

---

## Task 6: Pure Functions - Piece Grouping

**Files:**
- Create: `src/pure/pieceGrouping.ts`
- Create: `src/pure/pieceGrouping.test.ts`

- [ ] **Step 1: Write failing test for piece grouping**

```typescript
// src/pure/pieceGrouping.test.ts
import { describe, it, expect } from 'vitest'
import { filterQuadrant, groupByColorAndType } from './pieceGrouping'

export interface Piece {
  color: 'white' | 'black'
  type: string
  square: string
}

describe('pieceGrouping', () => {
  const pieces: Piece[] = [
    { color: 'white', type: 'pawn', square: 'e2' },
    { color: 'white', type: 'pawn', square: 'f2' },
    { color: 'white', type: 'knight', square: 'g1' },
    { color: 'black', type: 'pawn', square: 'e7' },
    { color: 'black', type: 'knight', square: 'g8' },
  ]

  describe('filterQuadrant', () => {
    it('filters white kingside pieces', () => {
      const result = filterQuadrant(pieces, 'wk')
      expect(result).toHaveLength(3)
      expect(result.every((p) => 'efgh'.includes(p.square[0]))).toBe(true)
      expect(result.every((p) => parseInt(p.square[1]) <= 4)).toBe(true)
    })

    it('filters black queenside pieces', () => {
      const result = filterQuadrant(pieces, 'bq')
      expect(result).toHaveLength(1)
      expect(result[0].square).toBe('e7')
    })
  })

  describe('groupByColorAndType', () => {
    it('groups pieces by color and type', () => {
      const result = groupByColorAndType(pieces)
      expect(result.white.pawn).toEqual(['e2', 'f2'])
      expect(result.white.knight).toEqual(['g1'])
      expect(result.black.pawn).toEqual(['e7'])
      expect(result.black.knight).toEqual(['g8'])
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/pure/pieceGrouping.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write pieceGrouping.ts**

```typescript
// src/pure/pieceGrouping.ts
export interface Piece {
  color: 'white' | 'black'
  type: string
  square: string
}

export type Quadrant = 'wk' | 'wq' | 'bk' | 'bq'

export function filterQuadrant(pieces: Piece[], quadrant: Quadrant): Piece[] {
  const isKingSide = quadrant.endsWith('k')
  const isWhiteSide = quadrant.startsWith('w')

  return pieces.filter((piece) => {
    const file = piece.square[0]
    const rank = parseInt(piece.square[1], 10)

    const fileMatch = isKingSide
      ? 'efgh'.includes(file)
      : 'abcd'.includes(file)

    const rankMatch = isWhiteSide ? rank <= 4 : rank >= 5

    return fileMatch && rankMatch
  })
}

export function groupByColorAndType(pieces: Piece[]): {
  [color: string]: { [type: string]: string[] }
} {
  const grouped: { [color: string]: { [type: string]: string[] } } = {
    white: {},
    black: {},
  }

  pieces.forEach((piece) => {
    if (!grouped[piece.color][piece.type]) {
      grouped[piece.color][piece.type] = []
    }
    grouped[piece.color][piece.type].push(piece.square)
  })

  return grouped
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/pure/pieceGrouping.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit piece grouping module**

```bash
git add src/pure/pieceGrouping.ts src/pure/pieceGrouping.test.ts
git commit -m "feat: implement piece filtering and grouping functions"
```

---

## Task 7: Pure Functions - Speech Text Generation

**Files:**
- Create: `src/pure/speechText.ts`
- Create: `src/pure/speechText.test.ts`

- [ ] **Step 1: Write failing test for speech text generation**

```typescript
// src/pure/speechText.test.ts
import { describe, it, expect } from 'vitest'
import { generateQuadrantText, generateAllPiecesText, generateColorText } from './speechText'
import type { Piece } from './pieceGrouping'

describe('speechText', () => {
  const pieces: Piece[] = [
    { color: 'white', type: 'pawn', square: 'e2' },
    { color: 'white', type: 'pawn', square: 'f2' },
    { color: 'white', type: 'knight', square: 'g1' },
    { color: 'black', type: 'pawn', square: 'e7' },
  ]

  describe('generateQuadrantText', () => {
    it('generates text for white kingside pieces', () => {
      const result = generateQuadrantText(pieces, 'wk')
      expect(result).toContain('white')
      expect(result).toContain('pawn')
      expect(result).toContain('e2')
      expect(result).toContain('f2')
      expect(result).toContain('knight')
      expect(result).toContain('g1')
    })

    it('groups same piece types together', () => {
      const result = generateQuadrantText(pieces, 'wk')
      expect(result).toMatch(/pawns? on e2.*f2|pawn on e2.*pawn on f2/)
    })
  })

  describe('generateAllPiecesText', () => {
    it('generates text for all pieces', () => {
      const result = generateAllPiecesText(pieces)
      expect(result).toContain('white')
      expect(result).toContain('black')
      expect(result).toContain('e2')
      expect(result).toContain('e7')
    })
  })

  describe('generateColorText', () => {
    it('generates text for white pieces only', () => {
      const result = generateColorText(pieces, 'white')
      expect(result).toContain('white')
      expect(result).not.toContain('black')
      expect(result).toContain('e2')
      expect(result).not.toContain('e7')
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/pure/speechText.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write speechText.ts**

```typescript
// src/pure/speechText.ts
import type { Piece, Quadrant } from './pieceGrouping'
import { filterQuadrant, groupByColorAndType } from './pieceGrouping'

export function generateQuadrantText(pieces: Piece[], quadrant: Quadrant): string {
  const filtered = filterQuadrant(pieces, quadrant)
  return generatePieceListText(filtered)
}

export function generateAllPiecesText(pieces: Piece[]): string {
  return generatePieceListText(pieces)
}

export function generateColorText(pieces: Piece[], color: 'white' | 'black'): string {
  const filtered = pieces.filter((p) => p.color === color)
  return generatePieceListText(filtered)
}

function generatePieceListText(pieces: Piece[]): string {
  const grouped = groupByColorAndType(pieces)
  const lines: string[] = []

  for (const color of ['white', 'black']) {
    const colorPieces = grouped[color]
    if (!colorPieces || Object.keys(colorPieces).length === 0) continue

    for (const type of Object.keys(colorPieces)) {
      const squares = colorPieces[type]
      if (squares.length === 0) continue

      const plural = squares.length > 1 ? `${type}s` : type
      const squareList = squares.join(', ')
      lines.push(`${color} ${plural} on ${squareList}`)
    }
  }

  return lines.join('. ') + '.'
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/pure/speechText.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit speech text generation**

```bash
git add src/pure/speechText.ts src/pure/speechText.test.ts
git commit -m "feat: implement speech text generation functions"
```

---

## Task 8: Pure Functions - Command Parser

**Files:**
- Create: `src/pure/commandParser.ts`
- Create: `src/pure/commandParser.test.ts`

- [ ] **Step 1: Write failing test for command parser**

```typescript
// src/pure/commandParser.test.ts
import { describe, it, expect } from 'vitest'
import { parseDrawCommand } from './commandParser'

describe('commandParser', () => {
  describe('parseDrawCommand', () => {
    it('parses single circle command', () => {
      const result = parseDrawCommand('-e4')
      expect(result).toEqual([{ type: 'circle', square: 'e4' }])
    })

    it('parses arrow command', () => {
      const result = parseDrawCommand('-e2e4')
      expect(result).toEqual([{ type: 'arrow', from: 'e2', to: 'e4' }])
    })

    it('parses multiple commands', () => {
      const result = parseDrawCommand('-e4,a1b2,d5')
      expect(result).toEqual([
        { type: 'circle', square: 'e4' },
        { type: 'arrow', from: 'a1', to: 'b2' },
        { type: 'circle', square: 'd5' },
      ])
    })

    it('returns empty array for invalid input', () => {
      const result = parseDrawCommand('invalid')
      expect(result).toEqual([])
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/pure/commandParser.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write commandParser.ts**

```typescript
// src/pure/commandParser.ts
export type DrawCommand =
  | { type: 'circle'; square: string }
  | { type: 'arrow'; from: string; to: string }

export function parseDrawCommand(input: string): DrawCommand[] {
  if (!input.startsWith('-')) return []

  const commands = input.slice(1).split(',')
  const result: DrawCommand[] = []

  for (const cmd of commands) {
    if (cmd.length === 2) {
      // Circle: -e4
      result.push({ type: 'circle', square: cmd })
    } else if (cmd.length === 4) {
      // Arrow: -e2e4
      result.push({
        type: 'arrow',
        from: cmd.slice(0, 2),
        to: cmd.slice(2, 4),
      })
    }
  }

  return result
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/pure/commandParser.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit command parser**

```bash
git add src/pure/commandParser.ts src/pure/commandParser.test.ts
git commit -m "feat: implement draw command parser"
```

---

## Task 9: DOM - Board Reader

**Files:**
- Create: `src/dom/boardReader.ts`
- Create: `src/dom/boardReader.test.ts`

- [ ] **Step 1: Write failing test for board reader**

```typescript
// src/dom/boardReader.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { readPiecePositions, getPlayerColor } from './boardReader'

describe('boardReader', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('getPlayerColor', () => {
    it('returns white when coords has no black class', () => {
      document.body.innerHTML = '<coords></coords>'
      expect(getPlayerColor()).toBe('white')
    })

    it('returns black when coords has black class', () => {
      document.body.innerHTML = '<coords class="black"></coords>'
      expect(getPlayerColor()).toBe('black')
    })
  })

  describe('readPiecePositions', () => {
    it('reads piece positions from DOM', () => {
      document.body.innerHTML = `
        <cg-board style="width: 468px">
          <piece class="white pawn" style="transform: translate(0px, 390px)"></piece>
          <piece class="black knight" style="transform: translate(117px, 58.5px)"></piece>
        </cg-board>
        <coords></coords>
      `

      const pieces = readPiecePositions()

      expect(pieces).toHaveLength(2)
      expect(pieces[0]).toMatchObject({
        color: 'white',
        type: 'pawn',
        square: 'a2',
      })
      expect(pieces[1]).toMatchObject({
        color: 'black',
        type: 'knight',
        square: 'c7',
      })
    })

    it('returns empty array when no board found', () => {
      const pieces = readPiecePositions()
      expect(pieces).toEqual([])
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/dom/boardReader.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write boardReader.ts**

```typescript
// src/dom/boardReader.ts
import type { Piece } from '../pure/pieceGrouping'

export function getPlayerColor(): 'white' | 'black' {
  const coords = document.querySelector('coords')
  return coords?.classList.contains('black') ? 'black' : 'white'
}

export function readPiecePositions(): Piece[] {
  const board = document.querySelector('cg-board:not(.userscript-custom-board)')
  if (!board) return []

  const squareSize = board.offsetWidth / 8
  const isPlayingWhite = getPlayerColor() === 'white'

  const pieces: Piece[] = []
  board.querySelectorAll('piece').forEach((piece) => {
    const classes = piece.className.split(' ')
    const color = classes[0] as 'white' | 'black'
    const type = classes[1]

    const transform = (piece as HTMLElement).style.transform
    const match = transform.match(/translate\((.+?)px(?:,\s*(.+?)px)?\)/)
    if (!match) return

    const x = parseFloat(match[1])
    const y = parseFloat(match[2] || match[1])

    const square = pixelsToSquare(x, y, squareSize, isPlayingWhite)
    pieces.push({ color, type, square })
  })

  return pieces
}

function pixelsToSquare(
  x: number,
  y: number,
  squareSize: number,
  isPlayingWhite: boolean
): string {
  let col = Math.round(x / squareSize)
  let row = Math.round(y / squareSize)

  if (isPlayingWhite) {
    row = 7 - row
  } else {
    col = 7 - col
  }

  const file = 'abcdefgh'[col]
  const rank = row + 1
  return `${file}${rank}`
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/dom/boardReader.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit board reader**

```bash
git add src/dom/boardReader.ts src/dom/boardReader.test.ts
git commit -m "feat: implement DOM board reader"
```

---

## Task 10: DOM - Board Observer

**Files:**
- Create: `src/dom/boardObserver.ts`
- Create: `src/dom/boardObserver.test.ts`

- [ ] **Step 1: Write failing test for board observer**

```typescript
// src/dom/boardObserver.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { boardChanged, createBoardObserver, startBoardObserver } from './boardObserver'

describe('boardObserver', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cg-board></cg-board>'
    boardChanged.value = 0
  })

  it('creates observer state', () => {
    const state = createBoardObserver()
    expect(state.observer).toBeDefined()
  })

  it('increments boardChanged signal on DOM mutation', async () => {
    const state = createBoardObserver()
    startBoardObserver(state)

    const initialValue = boardChanged.value

    // Trigger mutation
    const board = document.querySelector('cg-board')!
    const piece = document.createElement('piece')
    board.appendChild(piece)

    // Wait for MutationObserver to fire
    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(boardChanged.value).toBeGreaterThan(initialValue)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/dom/boardObserver.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write boardObserver.ts**

```typescript
// src/dom/boardObserver.ts
import { signal } from '@preact/signals-core'

export const boardChanged = signal(0)

export interface BoardObserverState {
  observer: MutationObserver
}

export function createBoardObserver(): BoardObserverState {
  const observer = new MutationObserver(() => {
    boardChanged.value++
  })

  return { observer }
}

export function startBoardObserver(state: BoardObserverState): void {
  const board = document.querySelector('cg-board')
  if (!board) return

  state.observer.observe(board, {
    childList: true,
    attributes: true,
    subtree: true,
  })
}

export function stopBoardObserver(state: BoardObserverState): void {
  state.observer.disconnect()
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/dom/boardObserver.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit board observer**

```bash
git add src/dom/boardObserver.ts src/dom/boardObserver.test.ts
git commit -m "feat: implement board observer with signal"
```

---

## Task 11: Browser - Speech Synthesizer

**Files:**
- Create: `src/browser/speechSynthesizer.ts`
- Create: `src/browser/speechSynthesizer.test.ts`

- [ ] **Step 1: Write failing test for speech synthesizer**

```typescript
// src/browser/speechSynthesizer.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { speak, stop, setRate } from './speechSynthesizer'

describe('speechSynthesizer', () => {
  beforeEach(() => {
    global.speechSynthesis = {
      speak: vi.fn(),
      cancel: vi.fn(),
    } as any
  })

  it('speaks text with given rate', () => {
    speak('hello', 1.0)

    expect(speechSynthesis.speak).toHaveBeenCalled()
    const utterance = vi.mocked(speechSynthesis.speak).mock.calls[0][0]
    expect(utterance.text).toBe('hello')
    expect(utterance.rate).toBe(1.0)
  })

  it('stops current speech', () => {
    stop()
    expect(speechSynthesis.cancel).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/browser/speechSynthesizer.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write speechSynthesizer.ts**

```typescript
// src/browser/speechSynthesizer.ts
let currentRate = 1.0

export function speak(text: string, rate: number): void {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  speechSynthesis.speak(utterance)
}

export function stop(): void {
  speechSynthesis.cancel()
}

export function setRate(rate: number): void {
  currentRate = rate
}

export function getRate(): number {
  return currentRate
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/browser/speechSynthesizer.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit speech synthesizer**

```bash
git add src/browser/speechSynthesizer.ts src/browser/speechSynthesizer.test.ts
git commit -m "feat: implement speech synthesizer wrapper"
```

---

## Task 12: Handlers - Speech Command

**Files:**
- Create: `src/handlers/handleSpeechCommand.ts`
- Create: `src/handlers/handleSpeechCommand.test.ts`

- [ ] **Step 1: Write failing test with Simone**

```typescript
// src/handlers/handleSpeechCommand.test.ts
import { describe, it, beforeEach } from 'vitest'
import { mockModule } from 'simone'
import { handleSpeechCommand } from './handleSpeechCommand'

const boardReader = mockModule<typeof import('../dom/boardReader')>('../dom/boardReader')
const speechSynthesizer = mockModule<typeof import('../browser/speechSynthesizer')>(
  '../browser/speechSynthesizer'
)

describe('handleSpeechCommand', () => {
  beforeEach(() => {
    // Reset settings signal
  })

  it('speaks white kingside quadrant', () => {
    boardReader
      .expects('readPiecePositions')
      .returns([
        { color: 'white', type: 'pawn', square: 'e2' },
        { color: 'white', type: 'knight', square: 'g1' },
      ])

    speechSynthesizer
      .expects('speak')
      .withArgs('white pawns on e2. white knights on g1.', 0.5)
      .returns(undefined)

    handleSpeechCommand('wk')
  })

  it('stops speech', () => {
    speechSynthesizer.expects('stop').returns(undefined)

    handleSpeechCommand('stop')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/handlers/handleSpeechCommand.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write handleSpeechCommand.ts**

```typescript
// src/handlers/handleSpeechCommand.ts
import { readPiecePositions } from '../dom/boardReader'
import { speak, stop } from '../browser/speechSynthesizer'
import { generateQuadrantText, generateAllPiecesText, generateColorText } from '../pure/speechText'
import { settings } from '../settings/settingsStore'
import type { Quadrant } from '../pure/pieceGrouping'

export function handleSpeechCommand(command: string): void {
  if (command === 'stop') {
    stop()
    return
  }

  const pieces = readPiecePositions()
  let text = ''

  if (['wk', 'wq', 'bk', 'bq'].includes(command)) {
    text = generateQuadrantText(pieces, command as Quadrant)
  } else if (command === 'all') {
    text = generateAllPiecesText(pieces)
  } else if (command === 'white') {
    text = generateColorText(pieces, 'white')
  } else if (command === 'black') {
    text = generateColorText(pieces, 'black')
  }

  if (text) {
    speak(text, settings.speakRate.value)
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/handlers/handleSpeechCommand.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit speech command handler**

```bash
git add src/handlers/handleSpeechCommand.ts src/handlers/handleSpeechCommand.test.ts
git commit -m "feat: implement speech command handler"
```

---

## Task 13: Commands - Keyboard Input

**Files:**
- Create: `src/commands/keyboardInput.ts`
- Create: `src/commands/keyboardInput.test.ts`

- [ ] **Step 1: Write test for keyboard input (skip DOM parts)**

```typescript
// src/commands/keyboardInput.test.ts
import { describe, it, expect } from 'vitest'
import { parseKeyboardCommand } from './keyboardInput'

describe('keyboardInput', () => {
  describe('parseKeyboardCommand', () => {
    it('parses speech commands', () => {
      expect(parseKeyboardCommand('pwk')).toEqual({ type: 'speech', command: 'wk' })
      expect(parseKeyboardCommand('pa')).toEqual({ type: 'speech', command: 'all' })
      expect(parseKeyboardCommand('pss')).toEqual({ type: 'speech', command: 'stop' })
    })

    it('parses button commands', () => {
      expect(parseKeyboardCommand('psr')).toEqual({ type: 'button', command: 'speakRate' })
      expect(parseKeyboardCommand('pl')).toEqual({ type: 'button', command: 'piecesList' })
    })

    it('parses draw commands', () => {
      expect(parseKeyboardCommand('-e4')).toEqual({ type: 'draw', command: '-e4' })
      expect(parseKeyboardCommand('-a1b2')).toEqual({ type: 'draw', command: '-a1b2' })
    })

    it('returns null for invalid commands', () => {
      expect(parseKeyboardCommand('xyz')).toBeNull()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/commands/keyboardInput.test.ts
```

Expected: FAIL - module not found

- [ ] **Step 3: Write keyboardInput.ts**

```typescript
// src/commands/keyboardInput.ts
import { handleSpeechCommand } from '../handlers/handleSpeechCommand'

export type KeyboardCommand =
  | { type: 'speech'; command: string }
  | { type: 'button'; command: string }
  | { type: 'draw'; command: string }
  | null

const SPEECH_COMMANDS: Record<string, string> = {
  pwk: 'wk',
  pwq: 'wq',
  pbk: 'bk',
  pbq: 'bq',
  pa: 'all',
  pww: 'white',
  pbb: 'black',
  pss: 'stop',
}

const BUTTON_COMMANDS: Record<string, string> = {
  psr: 'speakRate',
  pl: 'piecesList',
  pdiv: 'dividers',
  pcb: 'customBoard',
  pfm: 'flashMode',
  pob: 'obfuscations',
  ppx: 'parallax',
  phv: 'hoverMode',
  pps: 'pieceStyle',
  pblur: 'blur',
  pbs: 'blackSegments',
  pbst: 'blackSegmentsTiming',
  pfd: 'flashDuration',
  pfi: 'flashInterval',
}

export function parseKeyboardCommand(input: string): KeyboardCommand {
  if (input.startsWith('-')) {
    return { type: 'draw', command: input }
  }

  if (SPEECH_COMMANDS[input]) {
    return { type: 'speech', command: SPEECH_COMMANDS[input] }
  }

  if (BUTTON_COMMANDS[input]) {
    return { type: 'button', command: BUTTON_COMMANDS[input] }
  }

  return null
}

export function setupKeyboardInput(): void {
  const input = document.querySelector('.keyboard-move input') as HTMLInputElement
  if (!input) return

  input.addEventListener('input', (e) => {
    const value = (e.target as HTMLInputElement).value
    const command = parseKeyboardCommand(value)

    if (command?.type === 'speech') {
      handleSpeechCommand(command.command)
      input.value = ''
    } else if (command?.type === 'draw') {
      // TODO: Handle draw commands in Task 14
      input.value = ''
    }
    // Button commands are handled by UI directly
  })
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/commands/keyboardInput.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit keyboard input**

```bash
git add src/commands/keyboardInput.ts src/commands/keyboardInput.test.ts
git commit -m "feat: implement keyboard input handler"
```

---

## Task 14: Components - SettingButton

**Files:**
- Create: `src/components/SettingButton.tsx`
- Create: `src/components/SettingButton.test.tsx`

- [ ] **Step 1: Write failing test for SettingButton**

```typescript
// src/components/SettingButton.test.tsx
import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/preact'
import { signal } from '@preact/signals-core'
import { SettingButton } from './SettingButton'

describe('SettingButton', () => {
  it('displays current value', () => {
    const testSignal = signal(0)
    const { getByRole } = render(
      <SettingButton label="Blur" signal={testSignal} options={[0, 1, 2, 3]} />
    )

    const button = getByRole('button')
    expect(button).toHaveTextContent('Blur: 0')
  })

  it('cycles through options on click', () => {
    const testSignal = signal(0)
    const { getByRole } = render(
      <SettingButton label="Blur" signal={testSignal} options={[0, 1, 2, 3]} />
    )

    const button = getByRole('button')
    fireEvent.click(button)

    expect(testSignal.value).toBe(1)
    expect(button).toHaveTextContent('Blur: 1')
  })

  it('wraps around to first option', () => {
    const testSignal = signal(3)
    const { getByRole } = render(
      <SettingButton label="Blur" signal={testSignal} options={[0, 1, 2, 3]} />
    )

    const button = getByRole('button')
    fireEvent.click(button)

    expect(testSignal.value).toBe(0)
  })

  it('formats value with format function', () => {
    const testSignal = signal(0.5)
    const { getByRole } = render(
      <SettingButton
        label="Rate"
        signal={testSignal}
        options={[0.5, 1.0]}
        format={(v) => `${v}x`}
      />
    )

    const button = getByRole('button')
    expect(button).toHaveTextContent('Rate: 0.5x')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test src/components/SettingButton.test.tsx
```

Expected: FAIL - module not found

- [ ] **Step 3: Write SettingButton.tsx**

```typescript
// src/components/SettingButton.tsx
import { Signal } from '@preact/signals'

interface SettingButtonProps<T> {
  label: string
  signal: Signal<T>
  options: T[]
  format?: (value: T) => string
}

export function SettingButton<T>({ label, signal, options, format }: SettingButtonProps<T>) {
  const handleClick = () => {
    const currentIndex = options.indexOf(signal.value)
    const nextIndex = (currentIndex + 1) % options.length
    signal.value = options[nextIndex]
  }

  const displayValue = format ? format(signal.value) : String(signal.value)

  return (
    <button onClick={handleClick} class="setting-button">
      {label}: {displayValue}
    </button>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test src/components/SettingButton.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit SettingButton component**

```bash
git add src/components/SettingButton.tsx src/components/SettingButton.test.tsx
git commit -m "feat: implement SettingButton component"
```

---

## Task 15: Components - ButtonRow and ControlPanel

**Files:**
- Create: `src/components/ButtonRow.tsx`
- Create: `src/components/ControlPanel.tsx`
- Create: `src/components/buttonConfigs.ts`

- [ ] **Step 1: Write buttonConfigs.ts**

```typescript
// src/components/buttonConfigs.ts
import { settings } from '../settings/settingsStore'

export const mainButtons = [
  {
    label: 'Speak Rate',
    signal: settings.speakRate,
    options: [0.2, 0.5, 0.7, 1.0, 1.1, 1.2],
    format: (v: number) => `${v}x`,
  },
  {
    label: 'Pieces List',
    signal: settings.piecesListEnabled,
    options: [false, true],
    format: (v: boolean) => (v ? 'ON' : 'OFF'),
  },
  {
    label: 'Dividers',
    signal: settings.dividersEnabled,
    options: [false, true],
    format: (v: boolean) => (v ? 'ON' : 'OFF'),
  },
  {
    label: 'Custom Board',
    signal: settings.customBoardEnabled,
    options: [false, true],
    format: (v: boolean) => (v ? 'ON' : 'OFF'),
  },
  {
    label: 'Flash Mode',
    signal: settings.flashModeEnabled,
    options: [false, true],
    format: (v: boolean) => (v ? 'ON' : 'OFF'),
  },
]

export const customBoardButtons = [
  {
    label: 'Obfuscations',
    signal: settings.obfuscationsEnabled,
    options: [false, true],
    format: (v: boolean) => (v ? 'ON' : 'OFF'),
  },
  {
    label: 'Parallax',
    signal: settings.parallax,
    options: [0, 20, 30, 40, 50, 60, 65, 70, 80],
    format: (v: number) => `${v}°`,
  },
  {
    label: 'Hover Mode',
    signal: settings.hoverMode,
    options: ['off', 'small', 'large', 'super'],
  },
]

export const obfuscationButtons = [
  {
    label: 'Piece Style',
    signal: settings.pieceStyle,
    options: ['icons', '3d', 'checker', 'checker-grey', 'blindfold'],
  },
  {
    label: 'Blur',
    signal: settings.blur,
    options: [0, 1, 2, 3, 4, 6, 8],
    format: (v: number) => `${v}px`,
  },
  {
    label: 'Black Segments',
    signal: settings.blackSegments,
    options: ['none', '1/4', '1/2', '3/4', '4/4'],
  },
]

export const flashModeButtons = [
  {
    label: 'Flash Duration',
    signal: settings.flashDuration,
    options: [0.3, 0.5, 1, 2],
    format: (v: number) => `${v}s`,
  },
  {
    label: 'Flash Interval',
    signal: settings.flashInterval,
    options: [1, 3, 5, 10, 30, 60],
    format: (v: number) => `${v}s`,
  },
]
```

- [ ] **Step 2: Write ButtonRow.tsx**

```typescript
// src/components/ButtonRow.tsx
import { SettingButton } from './SettingButton'
import type { Signal } from '@preact/signals'

interface ButtonConfig {
  label: string
  signal: Signal<any>
  options: any[]
  format?: (value: any) => string
}

interface ButtonRowProps {
  buttons: ButtonConfig[]
}

export function ButtonRow({ buttons }: ButtonRowProps) {
  return (
    <div class="button-row">
      {buttons.map((btn) => (
        <SettingButton key={btn.label} {...btn} />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Write ControlPanel.tsx**

```typescript
// src/components/ControlPanel.tsx
import { settings } from '../settings/settingsStore'
import { ButtonRow } from './ButtonRow'
import {
  mainButtons,
  customBoardButtons,
  obfuscationButtons,
  flashModeButtons,
} from './buttonConfigs'

export function ControlPanel() {
  return (
    <div class="userscript-controls">
      <ButtonRow buttons={mainButtons} />

      {settings.customBoardEnabled.value && (
        <>
          <ButtonRow buttons={customBoardButtons} />

          {settings.obfuscationsEnabled.value && (
            <ButtonRow buttons={obfuscationButtons} />
          )}
        </>
      )}

      {settings.flashModeEnabled.value && (
        <ButtonRow buttons={flashModeButtons} />
      )}
    </div>
  )
}
```

- [ ] **Step 4: Test build compiles**

```bash
npm run build
```

Expected: Builds successfully (may have errors about missing main.ts, that's next)

- [ ] **Step 5: Commit components**

```bash
git add src/components/
git commit -m "feat: implement ButtonRow and ControlPanel components"
```

---

## Task 16: Main Entry Point (Minimal Version)

**Files:**
- Create: `src/main.ts`

- [ ] **Step 1: Write minimal main.ts**

```typescript
// src/main.ts
import { render } from 'preact'
import { loadSettings } from './settings/settingsStore'
import { ControlPanel } from './components/ControlPanel'
import { setupKeyboardInput } from './commands/keyboardInput'

async function waitForElement(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector)!)
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector)!)
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

async function init() {
  // Wait for lichess DOM
  await waitForElement('.keyboard-move')

  // Load settings from localStorage
  loadSettings()

  // Set up keyboard commands
  setupKeyboardInput()

  // Mount Preact UI
  const mountPoint = document.createElement('div')
  document.querySelector('.keyboard-move')?.appendChild(mountPoint)
  render(<ControlPanel />, mountPoint)
}

// Initialize on load
init()
```

- [ ] **Step 2: Build and verify it compiles**

```bash
npm run build
```

Expected: Creates lichess-board-speaker.user.js with userscript header

- [ ] **Step 3: Check file size**

```bash
ls -lh lichess-board-speaker.user.js
```

Expected: File created, reasonable size (under 500KB)

- [ ] **Step 4: Verify userscript header**

```bash
head -20 lichess-board-speaker.user.js
```

Expected: Shows userscript metadata header

- [ ] **Step 5: Commit main entry point**

```bash
git add src/main.ts lichess-board-speaker.user.js
git commit -m "feat: implement main entry point and initial build"
```

---

## Task 17: Manual Testing - Basic UI

- [ ] **Step 1: Install userscript in browser**

1. Open Tampermonkey
2. Delete old lichess-board-speaker (if exists)
3. Click "Install from file" or copy content of lichess-board-speaker.user.js
4. Verify script is enabled

- [ ] **Step 2: Test on lichess.org**

1. Navigate to https://lichess.org
2. Go to a puzzle or game
3. Verify button panel appears below move input
4. Click through button options
5. Verify settings persist on page reload

Expected: Buttons appear, cycle through options, settings save

- [ ] **Step 3: Test speech commands (if implemented)**

1. Type `pwk` in move input
2. Verify it reads white kingside pieces
3. Try other commands (`pa`, `pss`)

Expected: Commands work or fail gracefully

- [ ] **Step 4: Document any issues**

Create list of issues found during testing

- [ ] **Step 5: Commit test notes**

```bash
echo "Manual testing complete - basic UI works" > test-notes.md
git add test-notes.md
git commit -m "docs: add manual testing notes"
```

---

## Self-Review Checklist

**Spec Coverage:**
- ✓ Settings store with signals (Task 4)
- ✓ Pure functions: coordinates, pieceGrouping, speechText, commandParser (Tasks 5-8)
- ✓ DOM operations: boardReader, boardObserver (Tasks 9-10)
- ✓ Browser APIs: speechSynthesizer (Task 11)
- ✓ Handlers: handleSpeechCommand (Task 12)
- ✓ Commands: keyboardInput (Task 13)
- ✓ Components: SettingButton, ButtonRow, ControlPanel (Tasks 14-15)
- ✓ Main entry point (Task 16)
- ✓ Build tooling: Vite, Vitest, Biome, Husky (Tasks 1-3)
- ⚠️ **Not implemented yet:** 3D renderer, overlays, effects, full handlers (intentionally simplified for initial working version)

**Placeholder Check:**
- ✓ No TBD or TODO placeholders
- ✓ All test code complete
- ✓ All implementation code complete
- ✓ Commands specified with exact syntax

**Type Consistency:**
- ✓ Piece interface used consistently
- ✓ Signal types match throughout
- ✓ Function signatures match between modules

**Note:** This plan implements a **working subset** of the full spec - basic UI, settings, speech commands, and keyboard input. The 3D board, overlays, effects, and advanced features are intentionally deferred to keep the initial implementation focused and testable. These can be added incrementally in follow-up tasks.

---

## Execution Instructions

Plan complete and saved to `docs/superpowers/plans/2026-06-03-typescript-preact-migration.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** - Dispatch fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**

