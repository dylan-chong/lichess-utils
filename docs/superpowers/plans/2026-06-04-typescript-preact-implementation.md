# TypeScript + Preact Userscript Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the remaining layers of the lichess-board-speaker userscript with TypeScript + Preact architecture.

**Architecture:** Functional architecture with module-level functions, organized by purity level (pure → DOM → browser → handlers → effects → components). Settings store already complete. Preact signals for reactivity, Simone for testing.

**Tech Stack:** TypeScript, Preact, Preact Signals, Three.js, Vitest, Simone, SWC, Biome

**Current State:** Settings store complete (`src/settings/`), project scaffolded, build tooling configured.

---

## File Structure Overview

**Already Complete:**
- `src/settings/settingsStore.ts` - Preact signals for all 14 settings
- `src/settings/types.ts` - Settings interface
- `src/settings/defaults.ts` - Default values
- `src/settings/storage.ts` - localStorage wrapper
- `src/main.ts` - Entry point (minimal, needs expansion)

**To Create:**

**Pure Functions** (no side effects):
- `src/pure/coordinates.ts` - Square/pixel conversion
- `src/pure/speechText.ts` - Generate speech text
- `src/pure/commandParser.ts` - Parse drawing commands
- `src/pure/pieceGrouping.ts` - Filter/group pieces
- `src/pure/flashTiming.ts` - Flash timing calculations

**DOM Operations** (read/write DOM):
- `src/dom/boardReader.ts` - Read piece positions from DOM
- `src/dom/boardObserver.ts` - MutationObserver for board changes
- `src/dom/renderer3d.ts` - Three.js 3D board rendering
- `src/dom/overlays/flash.ts` - Flash overlay element
- `src/dom/overlays/dividers.ts` - SVG divider lines
- `src/dom/overlays/drawings.ts` - SVG circles/arrows

**Browser APIs** (wrappers):
- `src/browser/speechSynthesizer.ts` - Web Speech API wrapper

**Handlers** (orchestration):
- `src/handlers/update3dBoard.ts` - Apply settings to 3D renderer
- `src/handlers/updateDividers.ts` - Show/hide/position dividers
- `src/handlers/handleFlash.ts` - Flash timing orchestration
- `src/handlers/handleBoardUpdate.ts` - Update 3D board with positions
- `src/handlers/handleSpeechCommand.ts` - Process speech commands

**Effects** (signal watchers):
- `src/effects/on3dBoard.ts` - Watch customBoard/obfuscation settings
- `src/effects/onDividers.ts` - Watch dividersEnabled
- `src/effects/onFlash.ts` - Watch flashMode + boardChanged
- `src/effects/onBoardChange.ts` - Watch boardChanged for 3D updates
- `src/effects/onSpeechRate.ts` - Watch speakRate

**Commands** (input handling):
- `src/commands/keyboardInput.ts` - Listen to move input field

**Components** (Preact UI):
- `src/components/ControlPanel.tsx` - Root component
- `src/components/ButtonRow.tsx` - Reusable button row
- `src/components/SettingButton.tsx` - Cycles through options
- `src/components/PiecesList.tsx` - Shows live piece positions

---

## Task 1: Pure Functions - Coordinates

**Files:**
- Create: `src/pure/coordinates.ts`
- Test: `src/pure/coordinates.test.ts`

- [ ] **Step 1: Write failing test for pixelsToSquare**

Create `src/pure/coordinates.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { pixelsToSquare, squareToPixels } from './coordinates'

describe('pixelsToSquare', () => {
  it('converts pixels to square for white player', () => {
    const result = pixelsToSquare(
      { x: 39, y: 58.5 },
      78, // squareSize (board width 624 / 8)
      'white'
    )
    expect(result).toBe('a2')
  })

  it('converts pixels to square for black player', () => {
    const result = pixelsToSquare(
      { x: 39, y: 58.5 },
      78,
      'black'
    )
    expect(result).toBe('h7')
  })

  it('handles exact square boundaries', () => {
    const result = pixelsToSquare(
      { x: 0, y: 0 },
      78,
      'white'
    )
    expect(result).toBe('a8')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- coordinates.test.ts
```

Expected: FAIL with "Cannot find module './coordinates'"

- [ ] **Step 3: Write minimal implementation**

Create `src/pure/coordinates.ts`:

```typescript
export interface PixelPosition {
  x: number
  y: number
}

export type PlayerColor = 'white' | 'black'

const FILES = 'abcdefgh'

export function pixelsToSquare(
  position: PixelPosition,
  squareSize: number,
  playerColor: PlayerColor
): string {
  // Convert pixels to grid indices (0-7)
  let col = Math.round(position.x / squareSize)
  let row = Math.round(position.y / squareSize)

  // Flip coordinates based on player color
  if (playerColor === 'white') {
    row = 7 - row // Flip vertically for white
  } else {
    col = 7 - col // Flip horizontally for black
  }

  // Convert to chess notation
  const file = FILES[col]
  const rank = row + 1

  return `${file}${rank}`
}

export function squareToPixels(
  square: string,
  squareSize: number,
  playerColor: PlayerColor
): PixelPosition {
  // Parse square notation
  const file = square[0]
  const rank = parseInt(square[1], 10)

  // Convert to grid indices (0-7)
  let col = FILES.indexOf(file)
  let row = rank - 1

  // Flip coordinates based on player color
  if (playerColor === 'white') {
    row = 7 - row
  } else {
    col = 7 - col
  }

  // Convert to pixels (center of square)
  return {
    x: col * squareSize + squareSize / 2,
    y: row * squareSize + squareSize / 2,
  }
}
```

- [ ] **Step 4: Add test for squareToPixels**

Add to `src/pure/coordinates.test.ts`:

```typescript
describe('squareToPixels', () => {
  it('converts square to pixels for white player', () => {
    const result = squareToPixels('e4', 78, 'white')
    expect(result).toEqual({ x: 351, y: 312 })
  })

  it('converts square to pixels for black player', () => {
    const result = squareToPixels('e4', 78, 'black')
    expect(result).toEqual({ x: 273, y: 273 })
  })

  it('handles corner squares', () => {
    const result = squareToPixels('a1', 78, 'white')
    expect(result).toEqual({ x: 39, y: 585 })
  })
})
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- coordinates.test.ts
```

Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/pure/coordinates.ts src/pure/coordinates.test.ts
git commit -m "feat: add coordinate conversion functions"
```

---

## Task 2: Pure Functions - Piece Grouping

**Files:**
- Create: `src/pure/pieceGrouping.ts`
- Test: `src/pure/pieceGrouping.test.ts`

- [ ] **Step 1: Write failing test for filterQuadrant**

Create `src/pure/pieceGrouping.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { filterQuadrant, groupByColorAndType } from './pieceGrouping'
import type { PiecePosition } from './pieceGrouping'

describe('filterQuadrant', () => {
  const pieces: PiecePosition[] = [
    { square: 'a1', color: 'white', type: 'rook' },
    { square: 'e1', color: 'white', type: 'king' },
    { square: 'a8', color: 'black', type: 'rook' },
    { square: 'e8', color: 'black', type: 'king' },
    { square: 'c3', color: 'white', type: 'pawn' },
    { square: 'f6', color: 'black', type: 'knight' },
  ]

  it('filters white king-side pieces (wk)', () => {
    const result = filterQuadrant(pieces, 'wk')
    expect(result).toEqual([
      { square: 'e1', color: 'white', type: 'king' },
    ])
  })

  it('filters white queen-side pieces (wq)', () => {
    const result = filterQuadrant(pieces, 'wq')
    expect(result).toEqual([
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'c3', color: 'white', type: 'pawn' },
    ])
  })

  it('filters black king-side pieces (bk)', () => {
    const result = filterQuadrant(pieces, 'bk')
    expect(result).toEqual([
      { square: 'e8', color: 'black', type: 'king' },
      { square: 'f6', color: 'black', type: 'knight' },
    ])
  })

  it('filters black queen-side pieces (bq)', () => {
    const result = filterQuadrant(pieces, 'bq')
    expect(result).toEqual([
      { square: 'a8', color: 'black', type: 'rook' },
    ])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- pieceGrouping.test.ts
```

Expected: FAIL with "Cannot find module './pieceGrouping'"

- [ ] **Step 3: Write minimal implementation**

Create `src/pure/pieceGrouping.ts`:

```typescript
export interface PiecePosition {
  square: string
  color: 'white' | 'black'
  type: 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king'
}

export type Quadrant = 'wk' | 'wq' | 'bk' | 'bq'

export function filterQuadrant(
  pieces: PiecePosition[],
  quadrant: Quadrant
): PiecePosition[] {
  return pieces.filter((piece) => {
    const file = piece.square[0]
    const rank = parseInt(piece.square[1], 10)

    // Determine file range (king-side: e-h, queen-side: a-d)
    const isKingSide = file >= 'e'
    
    // Determine rank range (white: 1-4, black: 5-8)
    const isWhiteRanks = rank >= 1 && rank <= 4

    // Match quadrant
    if (quadrant === 'wk') return isKingSide && isWhiteRanks
    if (quadrant === 'wq') return !isKingSide && isWhiteRanks
    if (quadrant === 'bk') return isKingSide && !isWhiteRanks
    if (quadrant === 'bq') return !isKingSide && !isWhiteRanks

    return false
  })
}

export interface GroupedPieces {
  color: 'white' | 'black'
  type: string
  squares: string[]
}

export function groupByColorAndType(
  pieces: PiecePosition[]
): GroupedPieces[] {
  const groups = new Map<string, GroupedPieces>()

  for (const piece of pieces) {
    const key = `${piece.color}-${piece.type}`
    
    if (!groups.has(key)) {
      groups.set(key, {
        color: piece.color,
        type: piece.type,
        squares: [],
      })
    }

    groups.get(key)!.squares.push(piece.square)
  }

  // Sort groups by color (white first) then type
  return Array.from(groups.values()).sort((a, b) => {
    if (a.color !== b.color) {
      return a.color === 'white' ? -1 : 1
    }
    return a.type.localeCompare(b.type)
  })
}
```

- [ ] **Step 4: Add test for groupByColorAndType**

Add to `src/pure/pieceGrouping.test.ts`:

```typescript
describe('groupByColorAndType', () => {
  it('groups pieces by color and type', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: 'white', type: 'pawn' },
      { square: 'b2', color: 'white', type: 'pawn' },
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'a7', color: 'black', type: 'pawn' },
      { square: 'a8', color: 'black', type: 'rook' },
    ]

    const result = groupByColorAndType(pieces)

    expect(result).toEqual([
      { color: 'white', type: 'pawn', squares: ['a2', 'b2'] },
      { color: 'white', type: 'rook', squares: ['a1'] },
      { color: 'black', type: 'pawn', squares: ['a7'] },
      { color: 'black', type: 'rook', squares: ['a8'] },
    ])
  })

  it('handles empty array', () => {
    const result = groupByColorAndType([])
    expect(result).toEqual([])
  })
})
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- pieceGrouping.test.ts
```

Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/pure/pieceGrouping.ts src/pure/pieceGrouping.test.ts
git commit -m "feat: add piece filtering and grouping functions"
```

---

## Task 3: Pure Functions - Speech Text Generation

**Files:**
- Create: `src/pure/speechText.ts`
- Test: `src/pure/speechText.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/pure/speechText.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { generateQuadrantText, generateAllPiecesText, generateColorText } from './speechText'
import type { PiecePosition } from './pieceGrouping'

describe('generateQuadrantText', () => {
  it('generates text for multiple pieces of same type', () => {
    const pieces: PiecePosition[] = [
      { square: 'a2', color: 'white', type: 'pawn' },
      { square: 'b2', color: 'white', type: 'pawn' },
      { square: 'a1', color: 'white', type: 'rook' },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('white pawns on a2, b2. a1 white rook.')
  })

  it('generates text for single pieces', () => {
    const pieces: PiecePosition[] = [
      { square: 'e1', color: 'white', type: 'king' },
    ]

    const result = generateQuadrantText(pieces)
    expect(result).toBe('e1 white king.')
  })

  it('handles empty array', () => {
    const result = generateQuadrantText([])
    expect(result).toBe('')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- speechText.test.ts
```

Expected: FAIL with "Cannot find module './speechText'"

- [ ] **Step 3: Write minimal implementation**

Create `src/pure/speechText.ts`:

```typescript
import { groupByColorAndType, type PiecePosition } from './pieceGrouping'

export function generateQuadrantText(pieces: PiecePosition[]): string {
  if (pieces.length === 0) return ''

  const groups = groupByColorAndType(pieces)
  const sentences: string[] = []

  for (const group of groups) {
    const colorName = group.color
    const typeName = group.squares.length > 1 ? `${group.type}s` : group.type
    
    if (group.squares.length > 1) {
      // Multiple pieces: "white pawns on a2, b2"
      const squares = group.squares.join(', ')
      sentences.push(`${colorName} ${typeName} on ${squares}`)
    } else {
      // Single piece: "e1 white king"
      sentences.push(`${group.squares[0]} ${colorName} ${group.type}`)
    }
  }

  return sentences.join('. ') + '.'
}

export function generateAllPiecesText(pieces: PiecePosition[]): string {
  return generateQuadrantText(pieces)
}

export function generateColorText(
  pieces: PiecePosition[],
  color: 'white' | 'black'
): string {
  const filtered = pieces.filter((p) => p.color === color)
  return generateQuadrantText(filtered)
}
```

- [ ] **Step 4: Add tests for other functions**

Add to `src/pure/speechText.test.ts`:

```typescript
describe('generateAllPiecesText', () => {
  it('generates text for all pieces', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'a8', color: 'black', type: 'rook' },
    ]

    const result = generateAllPiecesText(pieces)
    expect(result).toBe('a1 white rook. a8 black rook.')
  })
})

describe('generateColorText', () => {
  it('generates text for white pieces only', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'a8', color: 'black', type: 'rook' },
    ]

    const result = generateColorText(pieces, 'white')
    expect(result).toBe('a1 white rook.')
  })

  it('generates text for black pieces only', () => {
    const pieces: PiecePosition[] = [
      { square: 'a1', color: 'white', type: 'rook' },
      { square: 'a8', color: 'black', type: 'rook' },
    ]

    const result = generateColorText(pieces, 'black')
    expect(result).toBe('a8 black rook.')
  })
})
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- speechText.test.ts
```

Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/pure/speechText.ts src/pure/speechText.test.ts
git commit -m "feat: add speech text generation functions"
```

---

## Task 4: Pure Functions - Command Parser

**Files:**
- Create: `src/pure/commandParser.ts`
- Test: `src/pure/commandParser.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/pure/commandParser.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { parseDrawCommand } from './commandParser'

describe('parseDrawCommand', () => {
  it('parses single circle command', () => {
    const result = parseDrawCommand('-e4')
    expect(result).toEqual([
      { type: 'circle', square: 'e4' },
    ])
  })

  it('parses single arrow command', () => {
    const result = parseDrawCommand('-e2e4')
    expect(result).toEqual([
      { type: 'arrow', from: 'e2', to: 'e4' },
    ])
  })

  it('parses multiple annotations', () => {
    const result = parseDrawCommand('-a1,b2c3,d4')
    expect(result).toEqual([
      { type: 'circle', square: 'a1' },
      { type: 'arrow', from: 'b2', to: 'c3' },
      { type: 'circle', square: 'd4' },
    ])
  })

  it('returns empty array for invalid command', () => {
    const result = parseDrawCommand('e4')
    expect(result).toEqual([])
  })

  it('returns empty array for dash only', () => {
    const result = parseDrawCommand('-')
    expect(result).toEqual([])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- commandParser.test.ts
```

Expected: FAIL with "Cannot find module './commandParser'"

- [ ] **Step 3: Write minimal implementation**

Create `src/pure/commandParser.ts`:

```typescript
export type DrawAnnotation =
  | { type: 'circle'; square: string }
  | { type: 'arrow'; from: string; to: string }

export function parseDrawCommand(command: string): DrawAnnotation[] {
  if (!command.startsWith('-')) return []
  
  const content = command.slice(1)
  if (!content) return []

  const parts = content.split(',')
  const annotations: DrawAnnotation[] = []

  for (const part of parts) {
    if (part.length === 2) {
      // Single square: circle
      annotations.push({ type: 'circle', square: part })
    } else if (part.length === 4) {
      // Two squares: arrow
      const from = part.slice(0, 2)
      const to = part.slice(2, 4)
      annotations.push({ type: 'arrow', from, to })
    }
  }

  return annotations
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- commandParser.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/pure/commandParser.ts src/pure/commandParser.test.ts
git commit -m "feat: add drawing command parser"
```

---

## Task 5: Pure Functions - Flash Timing

**Files:**
- Create: `src/pure/flashTiming.ts`
- Test: `src/pure/flashTiming.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/pure/flashTiming.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { shouldFlash, getNextFlashTime } from './flashTiming'

describe('shouldFlash', () => {
  it('returns true when interval has elapsed', () => {
    const lastFlash = 1000
    const now = 4000
    const interval = 3 // 3 seconds
    
    const result = shouldFlash(lastFlash, now, interval)
    expect(result).toBe(true)
  })

  it('returns false when interval has not elapsed', () => {
    const lastFlash = 1000
    const now = 3000
    const interval = 3
    
    const result = shouldFlash(lastFlash, now, interval)
    expect(result).toBe(false)
  })

  it('handles exact boundary', () => {
    const lastFlash = 1000
    const now = 4000
    const interval = 3
    
    const result = shouldFlash(lastFlash, now, interval)
    expect(result).toBe(true)
  })
})

describe('getNextFlashTime', () => {
  it('calculates next flash time', () => {
    const now = 1000
    const interval = 5
    
    const result = getNextFlashTime(now, interval)
    expect(result).toBe(6000) // 1000 + 5000
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- flashTiming.test.ts
```

Expected: FAIL with "Cannot find module './flashTiming'"

- [ ] **Step 3: Write minimal implementation**

Create `src/pure/flashTiming.ts`:

```typescript
export function shouldFlash(
  lastFlashTime: number,
  currentTime: number,
  intervalSeconds: number
): boolean {
  const elapsedMs = currentTime - lastFlashTime
  const intervalMs = intervalSeconds * 1000
  return elapsedMs >= intervalMs
}

export function getNextFlashTime(
  currentTime: number,
  intervalSeconds: number
): number {
  return currentTime + intervalSeconds * 1000
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- flashTiming.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/pure/flashTiming.ts src/pure/flashTiming.test.ts
git commit -m "feat: add flash timing calculation functions"
```

---

## Task 6: DOM Operations - Board Reader

**Files:**
- Create: `src/dom/boardReader.ts`
- Test: `src/dom/boardReader.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/dom/boardReader.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { readPiecePositions, getPlayerColor, waitForElement } from './boardReader'

describe('getPlayerColor', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('returns white when coords has no black class', () => {
    document.body.innerHTML = '<coords></coords>'
    expect(getPlayerColor()).toBe('white')
  })

  it('returns black when coords has black class', () => {
    document.body.innerHTML = '<coords class="black"></coords>'
    expect(getPlayerColor()).toBe('black')
  })

  it('returns white when coords element missing', () => {
    expect(getPlayerColor()).toBe('white')
  })
})

describe('readPiecePositions', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('reads piece positions for white player', () => {
    document.body.innerHTML = `
      <cg-board style="width: 624px">
        <piece class="white pawn" style="transform: translate(0px, 546px)"></piece>
        <piece class="white rook" style="transform: translate(0px, 624px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()
    
    expect(result).toEqual([
      { square: 'a2', color: 'white', type: 'pawn' },
      { square: 'a1', color: 'white', type: 'rook' },
    ])
  })

  it('ignores pieces on userscript custom board', () => {
    document.body.innerHTML = `
      <cg-board class="userscript-custom-board">
        <piece class="white pawn" style="transform: translate(0px, 546px)"></piece>
      </cg-board>
      <coords></coords>
    `

    const result = readPiecePositions()
    expect(result).toEqual([])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- boardReader.test.ts
```

Expected: FAIL with "Cannot find module './boardReader'"

- [ ] **Step 3: Write minimal implementation**

Create `src/dom/boardReader.ts`:

```typescript
import { pixelsToSquare, type PlayerColor } from '../pure/coordinates'
import type { PiecePosition } from '../pure/pieceGrouping'

export function getPlayerColor(): PlayerColor {
  const coords = document.querySelector('coords')
  return coords?.classList.contains('black') ? 'black' : 'white'
}

export function readPiecePositions(): PiecePosition[] {
  const board = document.querySelector('cg-board:not(.userscript-custom-board)')
  if (!board) return []

  const squareSize = board.getBoundingClientRect().width / 8
  const playerColor = getPlayerColor()

  const pieces = board.querySelectorAll('piece')
  const positions: PiecePosition[] = []

  for (const piece of pieces) {
    // Extract color and type from class
    const classes = piece.className.split(' ')
    const color = classes[0] as 'white' | 'black'
    const type = classes[1] as PiecePosition['type']

    // Extract position from transform
    const transform = (piece as HTMLElement).style.transform
    const match = transform.match(/translate\(([0-9.]+)px,?\s*([0-9.]+)?px?\)/)
    if (!match) continue

    const x = parseFloat(match[1])
    const y = parseFloat(match[2] || match[1])

    const square = pixelsToSquare({ x, y }, squareSize, playerColor)
    positions.push({ square, color, type })
  }

  return positions
}

export function waitForElement(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)
      if (element) {
        observer.disconnect()
        resolve(element)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
```

- [ ] **Step 4: Add test for waitForElement**

Add to `src/dom/boardReader.test.ts`:

```typescript
describe('waitForElement', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('resolves immediately if element exists', async () => {
    document.body.innerHTML = '<div class="test"></div>'
    
    const element = await waitForElement('.test')
    expect(element).toBeInstanceOf(Element)
  })

  it('waits for element to be added', async () => {
    const promise = waitForElement('.test')
    
    setTimeout(() => {
      document.body.innerHTML = '<div class="test"></div>'
    }, 10)

    const element = await promise
    expect(element).toBeInstanceOf(Element)
  })
})
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- boardReader.test.ts
```

Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/dom/boardReader.ts src/dom/boardReader.test.ts
git commit -m "feat: add board reading functions"
```

---

## Task 7: DOM Operations - Board Observer

**Files:**
- Create: `src/dom/boardObserver.ts`
- Test: `src/dom/boardObserver.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/dom/boardObserver.test.ts`:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './boardObserver'
import { signal } from '@preact/signals-core'

describe('boardObserver', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cg-board></cg-board>'
  })

  it('increments boardChanged signal when board mutates', async () => {
    const boardChanged = signal(0)
    const state = createBoardObserver(boardChanged)
    startBoardObserver(state)

    const board = document.querySelector('cg-board')!
    board.innerHTML = '<piece class="white pawn"></piece>'

    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(boardChanged.value).toBe(1)
    
    stopBoardObserver(state)
  })

  it('does not increment after stopping', async () => {
    const boardChanged = signal(0)
    const state = createBoardObserver(boardChanged)
    startBoardObserver(state)
    stopBoardObserver(state)

    const board = document.querySelector('cg-board')!
    board.innerHTML = '<piece class="white pawn"></piece>'

    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(boardChanged.value).toBe(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- boardObserver.test.ts
```

Expected: FAIL with "Cannot find module './boardObserver'"

- [ ] **Step 3: Write minimal implementation**

Create `src/dom/boardObserver.ts`:

```typescript
import type { Signal } from '@preact/signals-core'

export interface BoardObserverState {
  observer: MutationObserver
  boardChanged: Signal<number>
}

export function createBoardObserver(boardChanged: Signal<number>): BoardObserverState {
  const observer = new MutationObserver(() => {
    boardChanged.value += 1
  })

  return { observer, boardChanged }
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

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- boardObserver.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/dom/boardObserver.ts src/dom/boardObserver.test.ts
git commit -m "feat: add board mutation observer"
```

---

## Task 8: Browser API - Speech Synthesizer

**Files:**
- Create: `src/browser/speechSynthesizer.ts`
- Test: `src/browser/speechSynthesizer.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/browser/speechSynthesizer.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { speak, stopSpeaking, setRate } from './speechSynthesizer'

describe('speechSynthesizer', () => {
  beforeEach(() => {
    const mockSpeak = vi.fn()
    const mockCancel = vi.fn()
    
    vi.stubGlobal('speechSynthesis', {
      speak: mockSpeak,
      cancel: mockCancel,
    })

    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text = ''
      rate = 1
      constructor(text: string) {
        this.text = text
      }
    })
  })

  it('calls speechSynthesis.speak with correct text', () => {
    speak('test message', 1.0)
    
    expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'test message' })
    )
  })

  it('applies rate to utterance', () => {
    speak('test', 0.5)
    
    expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
      expect.objectContaining({ rate: 0.5 })
    )
  })

  it('stopSpeaking calls cancel', () => {
    stopSpeaking()
    expect(window.speechSynthesis.cancel).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- speechSynthesizer.test.ts
```

Expected: FAIL with "Cannot find module './speechSynthesizer'"

- [ ] **Step 3: Write minimal implementation**

Create `src/browser/speechSynthesizer.ts`:

```typescript
let currentRate = 1.0

export function speak(text: string, rate: number): void {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  window.speechSynthesis.cancel()
}

export function setRate(rate: number): void {
  currentRate = rate
}

export function getRate(): number {
  return currentRate
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- speechSynthesizer.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/browser/speechSynthesizer.ts src/browser/speechSynthesizer.test.ts
git commit -m "feat: add speech synthesis wrapper"
```

---

## Task 9: Handlers - Speech Command Handler

**Files:**
- Create: `src/handlers/handleSpeechCommand.ts`
- Test: `src/handlers/handleSpeechCommand.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/handlers/handleSpeechCommand.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mockModule } from 'simone'
import { handleSpeechCommand } from './handleSpeechCommand'
import { settings } from '../settings/settingsStore'

const boardReader = mockModule<typeof import('../dom/boardReader')>('../dom/boardReader')
const speechSynthesizer = mockModule<typeof import('../browser/speechSynthesizer')>('../browser/speechSynthesizer')
const pieceGrouping = mockModule<typeof import('../pure/pieceGrouping')>('../pure/pieceGrouping')
const speechText = mockModule<typeof import('../pure/speechText')>('../pure/speechText')

describe('handleSpeechCommand', () => {
  it('speaks quadrant pieces', () => {
    const pieces = [
      { square: 'e1', color: 'white' as const, type: 'king' as const },
    ]

    boardReader.expects('readPiecePositions').returns(pieces)
    pieceGrouping.expects('filterQuadrant').withArgs(pieces, 'wk').returns(pieces)
    speechText.expects('generateQuadrantText').withArgs(pieces).returns('e1 white king.')
    speechSynthesizer.expects('speak').withArgs('e1 white king.', settings.speakRate.value).returns(undefined)

    handleSpeechCommand('wk')
  })

  it('speaks all pieces', () => {
    const pieces = [
      { square: 'e1', color: 'white' as const, type: 'king' as const },
    ]

    boardReader.expects('readPiecePositions').returns(pieces)
    speechText.expects('generateAllPiecesText').withArgs(pieces).returns('e1 white king.')
    speechSynthesizer.expects('speak').withArgs('e1 white king.', settings.speakRate.value).returns(undefined)

    handleSpeechCommand('all')
  })

  it('speaks pieces by color', () => {
    const pieces = [
      { square: 'e1', color: 'white' as const, type: 'king' as const },
    ]

    boardReader.expects('readPiecePositions').returns(pieces)
    speechText.expects('generateColorText').withArgs(pieces, 'white').returns('e1 white king.')
    speechSynthesizer.expects('speak').withArgs('e1 white king.', settings.speakRate.value).returns(undefined)

    handleSpeechCommand('white')
  })

  it('stops speaking', () => {
    speechSynthesizer.expects('stopSpeaking').returns(undefined)
    handleSpeechCommand('stop')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- handleSpeechCommand.test.ts
```

Expected: FAIL with "Cannot find module './handleSpeechCommand'"

- [ ] **Step 3: Write minimal implementation**

Create `src/handlers/handleSpeechCommand.ts`:

```typescript
import { readPiecePositions } from '../dom/boardReader'
import { filterQuadrant, type Quadrant } from '../pure/pieceGrouping'
import { generateQuadrantText, generateAllPiecesText, generateColorText } from '../pure/speechText'
import { speak, stopSpeaking } from '../browser/speechSynthesizer'
import { settings } from '../settings/settingsStore'

export function handleSpeechCommand(command: string): void {
  if (command === 'stop') {
    stopSpeaking()
    return
  }

  const pieces = readPiecePositions()

  if (command === 'all') {
    const text = generateAllPiecesText(pieces)
    speak(text, settings.speakRate.value)
    return
  }

  if (command === 'white' || command === 'black') {
    const text = generateColorText(pieces, command)
    speak(text, settings.speakRate.value)
    return
  }

  // Quadrant commands: wk, wq, bk, bq
  const quadrant = command as Quadrant
  const filtered = filterQuadrant(pieces, quadrant)
  const text = generateQuadrantText(filtered)
  speak(text, settings.speakRate.value)
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- handleSpeechCommand.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/handlers/handleSpeechCommand.ts src/handlers/handleSpeechCommand.test.ts
git commit -m "feat: add speech command handler"
```

---

## Task 10: DOM Operations - Flash Overlay

**Files:**
- Create: `src/dom/overlays/flash.ts`
- Test: `src/dom/overlays/flash.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/dom/overlays/flash.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { createFlashOverlay, showFlash, hideFlash, destroyFlashOverlay } from './flash'

describe('flash overlay', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cg-container></cg-container>'
  })

  it('creates overlay element', () => {
    const state = createFlashOverlay()
    
    expect(state.overlay).toBeInstanceOf(HTMLElement)
    expect(state.overlay.className).toBe('userscript-flash-overlay')
  })

  it('shows overlay', () => {
    const state = createFlashOverlay()
    showFlash(state)
    
    expect(state.overlay.style.display).toBe('block')
  })

  it('hides overlay', () => {
    const state = createFlashOverlay()
    showFlash(state)
    hideFlash(state)
    
    expect(state.overlay.style.display).toBe('none')
  })

  it('removes overlay on destroy', () => {
    const state = createFlashOverlay()
    const parent = state.overlay.parentElement
    
    destroyFlashOverlay(state)
    
    expect(parent?.contains(state.overlay)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- flash.test.ts
```

Expected: FAIL with "Cannot find module './flash'"

- [ ] **Step 3: Write minimal implementation**

Create `src/dom/overlays/flash.ts`:

```typescript
export interface FlashOverlayState {
  overlay: HTMLElement
}

export function createFlashOverlay(): FlashOverlayState {
  const overlay = document.createElement('div')
  overlay.className = 'userscript-flash-overlay'
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 1000;
    display: none;
  `

  const container = document.querySelector('cg-container')
  container?.appendChild(overlay)

  return { overlay }
}

export function showFlash(state: FlashOverlayState): void {
  state.overlay.style.display = 'block'
}

export function hideFlash(state: FlashOverlayState): void {
  state.overlay.style.display = 'none'
}

export function destroyFlashOverlay(state: FlashOverlayState): void {
  state.overlay.remove()
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- flash.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/dom/overlays/flash.ts src/dom/overlays/flash.test.ts
git commit -m "feat: add flash overlay DOM operations"
```

---

## Task 11: Handlers - Flash Handler

**Files:**
- Create: `src/handlers/handleFlash.ts`
- Test: `src/handlers/handleFlash.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/handlers/handleFlash.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockModule } from 'simone'
import { handleFlash } from './handleFlash'
import { settings } from '../settings/settingsStore'
import type { FlashOverlayState } from '../dom/overlays/flash'

const flash = mockModule<typeof import('../dom/overlays/flash')>('../dom/overlays/flash')

describe('handleFlash', () => {
  let mockState: FlashOverlayState

  beforeEach(() => {
    mockState = {
      overlay: document.createElement('div'),
    }
    settings.flashDuration.value = 1
    vi.useFakeTimers()
  })

  it('hides flash immediately then shows after duration', () => {
    flash.expects('hideFlash').withArgs(mockState).returns(undefined)
    
    handleFlash(mockState)
    
    flash.expects('showFlash').withArgs(mockState).returns(undefined)
    vi.advanceTimersByTime(1000)
  })

  it('uses flash duration from settings', () => {
    settings.flashDuration.value = 2
    
    flash.expects('hideFlash').withArgs(mockState).returns(undefined)
    handleFlash(mockState)
    
    flash.expects('showFlash').withArgs(mockState).returns(undefined)
    vi.advanceTimersByTime(2000)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- handleFlash.test.ts
```

Expected: FAIL with "Cannot find module './handleFlash'"

- [ ] **Step 3: Write minimal implementation**

Create `src/handlers/handleFlash.ts`:

```typescript
import { showFlash, hideFlash, type FlashOverlayState } from '../dom/overlays/flash'
import { settings } from '../settings/settingsStore'

export function handleFlash(state: FlashOverlayState): void {
  hideFlash(state)
  
  const durationMs = settings.flashDuration.value * 1000
  
  setTimeout(() => {
    showFlash(state)
  }, durationMs)
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- handleFlash.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/handlers/handleFlash.ts src/handlers/handleFlash.test.ts
git commit -m "feat: add flash timing handler"
```

---

## Task 12: Commands - Keyboard Input

**Files:**
- Create: `src/commands/keyboardInput.ts`
- Test: `src/commands/keyboardInput.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/commands/keyboardInput.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mockModule } from 'simone'
import { setupKeyboardCommands, teardownKeyboardCommands } from './keyboardInput'

const handleSpeechCommand = mockModule<typeof import('../handlers/handleSpeechCommand')>('../handlers/handleSpeechCommand')

describe('keyboardInput', () => {
  let input: HTMLInputElement

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="keyboard-move">
        <input type="text" />
      </div>
    `
    input = document.querySelector('.keyboard-move input')!
  })

  it('handles speech command starting with p', () => {
    setupKeyboardCommands()
    
    handleSpeechCommand.expects('handleSpeechCommand').withArgs('wk').returns(undefined)
    
    input.value = 'pwk'
    input.dispatchEvent(new Event('input'))
    
    expect(input.value).toBe('')
  })

  it('handles stop command', () => {
    setupKeyboardCommands()
    
    handleSpeechCommand.expects('handleSpeechCommand').withArgs('stop').returns(undefined)
    
    input.value = 'pss'
    input.dispatchEvent(new Event('input'))
  })

  it('ignores non-command input', () => {
    setupKeyboardCommands()
    
    input.value = 'e4'
    input.dispatchEvent(new Event('input'))
    
    expect(input.value).toBe('e4')
  })

  it('stops listening after teardown', () => {
    setupKeyboardCommands()
    teardownKeyboardCommands()
    
    input.value = 'pwk'
    input.dispatchEvent(new Event('input'))
    
    expect(input.value).toBe('pwk')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- keyboardInput.test.ts
```

Expected: FAIL with "Cannot find module './keyboardInput'"

- [ ] **Step 3: Write minimal implementation**

Create `src/commands/keyboardInput.ts`:

```typescript
import { handleSpeechCommand } from '../handlers/handleSpeechCommand'

let inputListener: ((e: Event) => void) | null = null

const SPEECH_COMMANDS = new Map([
  ['pwk', 'wk'],
  ['pwq', 'wq'],
  ['pbk', 'bk'],
  ['pbq', 'bq'],
  ['pa', 'all'],
  ['pww', 'white'],
  ['pbb', 'black'],
  ['pss', 'stop'],
])

export function setupKeyboardCommands(): void {
  const input = document.querySelector('.keyboard-move input') as HTMLInputElement
  if (!input) return

  inputListener = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value

    // Check for speech commands
    if (SPEECH_COMMANDS.has(value)) {
      const command = SPEECH_COMMANDS.get(value)!
      handleSpeechCommand(command)
      target.value = ''
      return
    }

    // Check for drawing commands (handled elsewhere)
    if (value.startsWith('-')) {
      // Will be handled by drawing handler
      return
    }
  }

  input.addEventListener('input', inputListener)
}

export function teardownKeyboardCommands(): void {
  if (!inputListener) return

  const input = document.querySelector('.keyboard-move input') as HTMLInputElement
  if (input) {
    input.removeEventListener('input', inputListener)
  }
  inputListener = null
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- keyboardInput.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/commands/keyboardInput.ts src/commands/keyboardInput.test.ts
git commit -m "feat: add keyboard input command handler"
```

---

## Task 13: DOM Operations - Dividers

**Files:**
- Create: `src/dom/overlays/dividers.ts`
- Test: `src/dom/overlays/dividers.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/dom/overlays/dividers.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { createDividers, showDividers, hideDividers, destroyDividers } from './dividers'

describe('dividers', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cg-board style="width: 624px; height: 624px"></cg-board>'
  })

  it('creates SVG with lines', () => {
    const state = createDividers()
    
    expect(state.svg).toBeInstanceOf(SVGElement)
    expect(state.svg.className.baseVal).toBe('userscript-dividers')
  })

  it('shows dividers', () => {
    const state = createDividers()
    showDividers(state)
    
    expect(state.svg.style.display).toBe('block')
  })

  it('hides dividers', () => {
    const state = createDividers()
    showDividers(state)
    hideDividers(state)
    
    expect(state.svg.style.display).toBe('none')
  })

  it('removes SVG on destroy', () => {
    const state = createDividers()
    const parent = state.svg.parentElement
    
    destroyDividers(state)
    
    expect(parent?.contains(state.svg)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- dividers.test.ts
```

Expected: FAIL with "Cannot find module './dividers'"

- [ ] **Step 3: Write minimal implementation**

Create `src/dom/overlays/dividers.ts`:

```typescript
export interface DividersState {
  svg: SVGSVGElement
}

export function createDividers(): DividersState {
  const board = document.querySelector('cg-board')
  if (!board) {
    throw new Error('Board not found')
  }

  const rect = board.getBoundingClientRect()
  const size = rect.width

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('class', 'userscript-dividers')
  svg.setAttribute('width', size.toString())
  svg.setAttribute('height', size.toString())
  svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: none;
  `

  // Vertical line
  const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  vLine.setAttribute('x1', (size / 2).toString())
  vLine.setAttribute('y1', '0')
  vLine.setAttribute('x2', (size / 2).toString())
  vLine.setAttribute('y2', size.toString())
  vLine.setAttribute('stroke', 'red')
  vLine.setAttribute('stroke-width', '2')

  // Horizontal line
  const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  hLine.setAttribute('x1', '0')
  hLine.setAttribute('y1', (size / 2).toString())
  hLine.setAttribute('x2', size.toString())
  hLine.setAttribute('y2', (size / 2).toString())
  hLine.setAttribute('stroke', 'red')
  hLine.setAttribute('stroke-width', '2')

  svg.appendChild(vLine)
  svg.appendChild(hLine)

  board.appendChild(svg)

  return { svg }
}

export function showDividers(state: DividersState): void {
  state.svg.style.display = 'block'
}

export function hideDividers(state: DividersState): void {
  state.svg.style.display = 'none'
}

export function destroyDividers(state: DividersState): void {
  state.svg.remove()
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- dividers.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/dom/overlays/dividers.ts src/dom/overlays/dividers.test.ts
git commit -m "feat: add dividers overlay DOM operations"
```

---

## Task 14: Handlers - Dividers Handler

**Files:**
- Create: `src/handlers/updateDividers.ts`
- Test: `src/handlers/updateDividers.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/handlers/updateDividers.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mockModule } from 'simone'
import { updateDividers } from './updateDividers'
import { settings } from '../settings/settingsStore'
import type { DividersState } from '../dom/overlays/dividers'

const dividers = mockModule<typeof import('../dom/overlays/dividers')>('../dom/overlays/dividers')

describe('updateDividers', () => {
  const mockState: DividersState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  }

  it('shows dividers when enabled', () => {
    settings.dividersEnabled.value = true
    
    dividers.expects('showDividers').withArgs(mockState).returns(undefined)
    
    updateDividers(mockState)
  })

  it('hides dividers when disabled', () => {
    settings.dividersEnabled.value = false
    
    dividers.expects('hideDividers').withArgs(mockState).returns(undefined)
    
    updateDividers(mockState)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- updateDividers.test.ts
```

Expected: FAIL with "Cannot find module './updateDividers'"

- [ ] **Step 3: Write minimal implementation**

Create `src/handlers/updateDividers.ts`:

```typescript
import { showDividers, hideDividers, type DividersState } from '../dom/overlays/dividers'
import { settings } from '../settings/settingsStore'

export function updateDividers(state: DividersState): void {
  if (settings.dividersEnabled.value) {
    showDividers(state)
  } else {
    hideDividers(state)
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- updateDividers.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/handlers/updateDividers.ts src/handlers/updateDividers.test.ts
git commit -m "feat: add dividers update handler"
```

---

## Task 15: Effects - Dividers Effect

**Files:**
- Create: `src/effects/onDividers.ts`
- Test: `src/effects/onDividers.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/effects/onDividers.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mockModule } from 'simone'
import { setupDividersEffect } from './onDividers'
import { settings } from '../settings/settingsStore'
import type { DividersState } from '../dom/overlays/dividers'

const updateDividers = mockModule<typeof import('../handlers/updateDividers')>('../handlers/updateDividers')

describe('onDividers effect', () => {
  const mockState: DividersState = {
    svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  }

  it('calls updateDividers when dividersEnabled changes', () => {
    updateDividers.expects('updateDividers').withArgs(mockState).returns(undefined)
    
    const cleanup = setupDividersEffect(mockState)
    
    updateDividers.expects('updateDividers').withArgs(mockState).returns(undefined)
    settings.dividersEnabled.value = !settings.dividersEnabled.value
    
    cleanup()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- onDividers.test.ts
```

Expected: FAIL with "Cannot find module './onDividers'"

- [ ] **Step 3: Write minimal implementation**

Create `src/effects/onDividers.ts`:

```typescript
import { effect } from '@preact/signals-core'
import { updateDividers } from '../handlers/updateDividers'
import { settings } from '../settings/settingsStore'
import type { DividersState } from '../dom/overlays/dividers'

export function setupDividersEffect(state: DividersState): () => void {
  return effect(() => {
    settings.dividersEnabled.value
    updateDividers(state)
  })
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- onDividers.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/effects/onDividers.ts src/effects/onDividers.test.ts
git commit -m "feat: add dividers effect watcher"
```

---

## Task 16: Preact Component - SettingButton

**Files:**
- Create: `src/components/SettingButton.tsx`
- Test: `src/components/SettingButton.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/SettingButton.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { signal } from '@preact/signals-core'
import { SettingButton } from './SettingButton'
import userEvent from '@testing-library/user-event'

describe('SettingButton', () => {
  it('renders current value', () => {
    const setting = signal(0.5)
    const options = [0.2, 0.5, 1.0]
    
    render(
      <SettingButton
        label="Speed"
        setting={setting}
        options={options}
        format={(v) => `${v}x`}
      />
    )
    
    expect(screen.getByText('Speed: 0.5x')).toBeInTheDocument()
  })

  it('cycles through options on click', async () => {
    const setting = signal(0.5)
    const options = [0.2, 0.5, 1.0]
    
    render(
      <SettingButton
        label="Speed"
        setting={setting}
        options={options}
        format={(v) => `${v}x`}
      />
    )
    
    await userEvent.click(screen.getByRole('button'))
    
    expect(setting.value).toBe(1.0)
  })

  it('wraps around to first option', async () => {
    const setting = signal(1.0)
    const options = [0.2, 0.5, 1.0]
    
    render(
      <SettingButton
        label="Speed"
        setting={setting}
        options={options}
        format={(v) => `${v}x`}
      />
    )
    
    await userEvent.click(screen.getByRole('button'))
    
    expect(setting.value).toBe(0.2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- SettingButton.test.tsx
```

Expected: FAIL with "Cannot find module './SettingButton'"

- [ ] **Step 3: Install @testing-library/user-event**

```bash
npm install -D @testing-library/user-event
```

- [ ] **Step 4: Write minimal implementation**

Create `src/components/SettingButton.tsx`:

```typescript
import { type Signal } from '@preact/signals-core'

interface SettingButtonProps<T> {
  label: string
  setting: Signal<T>
  options: T[]
  format: (value: T) => string
}

export function SettingButton<T>({
  label,
  setting,
  options,
  format,
}: SettingButtonProps<T>) {
  const handleClick = () => {
    const currentIndex = options.indexOf(setting.value)
    const nextIndex = (currentIndex + 1) % options.length
    setting.value = options[nextIndex]
  }

  return (
    <button onClick={handleClick}>
      {label}: {format(setting.value)}
    </button>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- SettingButton.test.tsx
```

Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/SettingButton.tsx src/components/SettingButton.test.tsx package.json package-lock.json
git commit -m "feat: add SettingButton component"
```

---

## Task 17: Preact Component - ButtonRow

**Files:**
- Create: `src/components/ButtonRow.tsx`
- Test: `src/components/ButtonRow.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/ButtonRow.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { ButtonRow } from './ButtonRow'
import { signal } from '@preact/signals-core'

describe('ButtonRow', () => {
  it('renders children', () => {
    render(
      <ButtonRow>
        <button>Test</button>
      </ButtonRow>
    )
    
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('conditionally renders based on visible signal', () => {
    const visible = signal(false)
    
    const { rerender } = render(
      <ButtonRow visible={visible}>
        <button>Test</button>
      </ButtonRow>
    )
    
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
    
    visible.value = true
    rerender(
      <ButtonRow visible={visible}>
        <button>Test</button>
      </ButtonRow>
    )
    
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('renders without visible prop', () => {
    render(
      <ButtonRow>
        <button>Test</button>
      </ButtonRow>
    )
    
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- ButtonRow.test.tsx
```

Expected: FAIL with "Cannot find module './ButtonRow'"

- [ ] **Step 3: Write minimal implementation**

Create `src/components/ButtonRow.tsx`:

```typescript
import { type Signal } from '@preact/signals-core'
import { type ComponentChildren } from 'preact'

interface ButtonRowProps {
  children: ComponentChildren
  visible?: Signal<boolean>
}

export function ButtonRow({ children, visible }: ButtonRowProps) {
  if (visible && !visible.value) {
    return null
  }

  return <div class="button-row">{children}</div>
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- ButtonRow.test.tsx
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ButtonRow.tsx src/components/ButtonRow.test.tsx
git commit -m "feat: add ButtonRow component"
```

---

## Task 18: Preact Component - PiecesList

**Files:**
- Create: `src/components/PiecesList.tsx`
- Test: `src/components/PiecesList.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/PiecesList.test.tsx`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { mockModule } from 'simone'
import { signal } from '@preact/signals-core'
import { PiecesList } from './PiecesList'
import { settings } from '../settings/settingsStore'

const boardReader = mockModule<typeof import('../dom/boardReader')>('../dom/boardReader')
const pieceGrouping = mockModule<typeof import('../pure/pieceGrouping')>('../pure/pieceGrouping')

describe('PiecesList', () => {
  beforeEach(() => {
    settings.piecesListEnabled.value = false
  })

  it('renders nothing when disabled', () => {
    const boardChanged = signal(0)
    
    boardReader.expects('readPiecePositions').returns([])
    boardReader.expects('getPlayerColor').returns('white')
    pieceGrouping.expects('groupByColorAndType').withArgs([]).returns([])
    
    render(<PiecesList boardChanged={boardChanged} />)
    
    expect(screen.queryByText('You are:')).not.toBeInTheDocument()
  })

  it('renders pieces list when enabled', () => {
    settings.piecesListEnabled.value = true
    const boardChanged = signal(0)
    
    const pieces = [
      { square: 'e1', color: 'white' as const, type: 'king' as const },
    ]
    const grouped = [
      { color: 'white' as const, type: 'king', squares: ['e1'] },
    ]
    
    boardReader.expects('readPiecePositions').returns(pieces)
    boardReader.expects('getPlayerColor').returns('white')
    pieceGrouping.expects('groupByColorAndType').withArgs(pieces).returns(grouped)
    
    render(<PiecesList boardChanged={boardChanged} />)
    
    expect(screen.getByText('You are: WHITE')).toBeInTheDocument()
    expect(screen.getByText('king: e1')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- PiecesList.test.tsx
```

Expected: FAIL with "Cannot find module './PiecesList'"

- [ ] **Step 3: Write minimal implementation**

Create `src/components/PiecesList.tsx`:

```typescript
import { type Signal } from '@preact/signals-core'
import { readPiecePositions, getPlayerColor } from '../dom/boardReader'
import { groupByColorAndType } from '../pure/pieceGrouping'
import { settings } from '../settings/settingsStore'

interface PiecesListProps {
  boardChanged: Signal<number>
}

export function PiecesList({ boardChanged }: PiecesListProps) {
  if (!settings.piecesListEnabled.value) {
    return null
  }

  // Force re-render when board changes
  boardChanged.value

  const pieces = readPiecePositions()
  const playerColor = getPlayerColor()
  const grouped = groupByColorAndType(pieces)

  return (
    <div class="pieces-list-box">
      <div>You are: {playerColor.toUpperCase()}</div>
      <div>Turn: {/* Will be implemented later */}</div>
      
      {grouped.map((group) => (
        <div key={`${group.color}-${group.type}`}>
          {group.type}: {group.squares.join(', ')}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- PiecesList.test.tsx
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/PiecesList.tsx src/components/PiecesList.test.tsx
git commit -m "feat: add PiecesList component"
```

---

## Task 19: Preact Component - ControlPanel

**Files:**
- Create: `src/components/ControlPanel.tsx`
- Test: `src/components/ControlPanel.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/ControlPanel.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { signal } from '@preact/signals-core'
import { ControlPanel } from './ControlPanel'

describe('ControlPanel', () => {
  it('renders speak rate button', () => {
    const boardChanged = signal(0)
    
    render(<ControlPanel boardChanged={boardChanged} />)
    
    expect(screen.getByText(/Speak Rate:/)).toBeInTheDocument()
  })

  it('renders pieces list button', () => {
    const boardChanged = signal(0)
    
    render(<ControlPanel boardChanged={boardChanged} />)
    
    expect(screen.getByText(/Pieces List:/)).toBeInTheDocument()
  })

  it('renders dividers button', () => {
    const boardChanged = signal(0)
    
    render(<ControlPanel boardChanged={boardChanged} />)
    
    expect(screen.getByText(/Dividers:/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- ControlPanel.test.tsx
```

Expected: FAIL with "Cannot find module './ControlPanel'"

- [ ] **Step 3: Write minimal implementation**

Create `src/components/ControlPanel.tsx`:

```typescript
import { type Signal } from '@preact/signals-core'
import { ButtonRow } from './ButtonRow'
import { SettingButton } from './SettingButton'
import { PiecesList } from './PiecesList'
import { settings } from '../settings/settingsStore'

interface ControlPanelProps {
  boardChanged: Signal<number>
}

export function ControlPanel({ boardChanged }: ControlPanelProps) {
  return (
    <div class="control-panel">
      <ButtonRow>
        <SettingButton
          label="Speak Rate"
          setting={settings.speakRate}
          options={[0.2, 0.5, 0.7, 1.0, 1.1, 1.2]}
          format={(v) => `${v}x`}
        />
        
        <SettingButton
          label="Pieces List"
          setting={settings.piecesListEnabled}
          options={[false, true]}
          format={(v) => (v ? 'ON' : 'OFF')}
        />
        
        <SettingButton
          label="Dividers"
          setting={settings.dividersEnabled}
          options={[false, true]}
          format={(v) => (v ? 'ON' : 'OFF')}
        />
        
        <SettingButton
          label="Custom Board"
          setting={settings.customBoardEnabled}
          options={[false, true]}
          format={(v) => (v ? 'ON' : 'OFF')}
        />
        
        <SettingButton
          label="Flash Mode"
          setting={settings.flashModeEnabled}
          options={[false, true]}
          format={(v) => (v ? 'ON' : 'OFF')}
        />
      </ButtonRow>
      
      <PiecesList boardChanged={boardChanged} />
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- ControlPanel.test.tsx
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ControlPanel.tsx src/components/ControlPanel.test.tsx
git commit -m "feat: add ControlPanel root component"
```

---

## Task 20: Wire Everything in main.ts

**Files:**
- Modify: `src/main.ts`

- [ ] **Step 1: Import required modules**

Edit `src/main.ts`:

```typescript
import { render } from 'preact'
import { signal } from '@preact/signals-core'
import { setupAutoSave, loadSettings } from './settings/settingsStore'
import { waitForElement } from './dom/boardReader'
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './dom/boardObserver'
import { createFlashOverlay, destroyFlashOverlay } from './dom/overlays/flash'
import { createDividers, destroyDividers } from './dom/overlays/dividers'
import { setupDividersEffect } from './effects/onDividers'
import { setupKeyboardCommands, teardownKeyboardCommands } from './commands/keyboardInput'
import { ControlPanel } from './components/ControlPanel'

async function init() {
  // Wait for lichess to load the board
  await waitForElement('.keyboard-move')
  
  // Initialize settings
  loadSettings()
  setupAutoSave()

  // Create shared board change signal
  const boardChanged = signal(0)

  // Create DOM state
  const flashState = createFlashOverlay()
  const dividersState = createDividers()
  const boardObserverState = createBoardObserver(boardChanged)

  // Start observer
  startBoardObserver(boardObserverState)

  // Set up effects
  const cleanupDividers = setupDividersEffect(dividersState)

  // Set up commands
  setupKeyboardCommands()

  // Mount Preact UI
  const mountPoint = document.createElement('div')
  const keyboardMove = document.querySelector('.keyboard-move')
  keyboardMove?.appendChild(mountPoint)
  render(<ControlPanel boardChanged={boardChanged} />, mountPoint)

  // Return cleanup function
  return () => {
    cleanupDividers()
    stopBoardObserver(boardObserverState)
    destroyFlashOverlay(flashState)
    destroyDividers(dividersState)
    teardownKeyboardCommands()
    render(null, mountPoint)
  }
}

// Start the application
init().catch(console.error)
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: No type errors

- [ ] **Step 3: Run all tests**

```bash
npm test
```

Expected: All tests PASS

- [ ] **Step 4: Build userscript**

```bash
npm run build
```

Expected: Build succeeds, creates `lichess-board-speaker.user.js`

- [ ] **Step 5: Verify userscript header is present**

```bash
head -20 lichess-board-speaker.user.js
```

Expected: Should see userscript header with version, match pattern, etc.

- [ ] **Step 6: Commit**

```bash
git add src/main.ts lichess-board-speaker.user.js
git commit -m "feat: wire all components in main entry point"
```

---

## Task 21: Manual Testing on Lichess

**Files:**
- None (manual testing)

- [ ] **Step 1: Install userscript in Tampermonkey**

1. Open Tampermonkey dashboard
2. Click "Create new script"
3. Copy contents of `lichess-board-speaker.user.js`
4. Paste into editor
5. Save

- [ ] **Step 2: Test on lichess.org puzzle**

1. Navigate to https://lichess.org/training
2. Open a puzzle
3. Verify control panel appears below move input
4. Test Speak Rate button cycles through values
5. Test Pieces List shows/hides

- [ ] **Step 3: Test speech commands**

1. Type `pwk` in move input → should speak white king-side pieces
2. Type `pa` in move input → should speak all pieces
3. Type `pss` in move input → should stop speaking

- [ ] **Step 4: Test dividers**

1. Click Dividers button to ON
2. Verify red lines appear dividing board into quadrants
3. Click Dividers button to OFF
4. Verify lines disappear

- [ ] **Step 5: Test settings persistence**

1. Change Speak Rate to 1.0x
2. Enable Pieces List
3. Refresh page
4. Verify settings are restored

- [ ] **Step 6: Document any issues**

Create issues for any bugs found during testing.

---

## Next Steps After This Plan

**Remaining features not in this plan:**
- 3D board rendering (`src/dom/renderer3d.ts`)
- 3D board effects and handlers
- Obfuscation features (piece styles, blur, black segments)
- Flash mode interval logic
- Drawing commands (circles/arrows)
- Full ControlPanel with nested button rows

These will be covered in future plans after the foundation is tested and working.

---

**End of Implementation Plan**
