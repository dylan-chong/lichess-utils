# Remaining Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all remaining features: annotations wiring, flash mode loop, blur, full 3D board rendering with parallax, hover mode, piece styles, black segments, and 3D drawings.

**Architecture:** Three phases by dependency order. Phase 1 wires independent features (annotations, flash loop, blur). Phase 2 builds the 3D board foundation (geometries, board plane, piece manager, camera). Phase 3 adds 3D-dependent features (parallax effect, hover animation, piece styles, black segments, 3D drawings). All follow the existing layered architecture: domain (pure logic) → presentation (rendering) → application (effects/handlers wiring signals to renderers).

**Tech Stack:** TypeScript, Preact Signals, Three.js, Vitest, Simone

**Current State:** Settings store, UI components, and all button controls are complete. The presentation layer has scaffolded `annotations.ts`, `flash.ts`, `canvas.ts` files. The domain layer has `commandParser.ts` and `flashTiming.ts`. What's missing is the *wiring* (effects/handlers connecting signals to renderers) and the 3D rendering logic (geometries, piece management, board plane).

---

## File Structure Overview

**Phase 1 (Simple Wiring):**
- Modify: `src/application/input/keyboardInput.ts` - add draw command handling
- Create: `src/application/handlers/handleDrawCommand.ts` - orchestrate annotations
- Create: `src/application/effects/onFlash.ts` - flash mode interval loop
- Create: `src/application/handlers/applyBlur.ts` - CSS filter on container
- Create: `src/application/effects/onBlur.ts` - watch blur/obfuscations signals

**Phase 2 (3D Board Foundation):**
- Create: `src/domain/chess/boardPosition3d.ts` - pixel-to-3D coordinate conversion
- Create: `src/presentation/3d/geometries.ts` - LatheGeometry/ExtrudeGeometry factories for each piece type
- Create: `src/presentation/3d/pieceMesh.ts` - create meshes per piece style
- Create: `src/presentation/3d/boardPlane.ts` - 8x8 colored square grid
- Create: `src/presentation/3d/pieceManager.ts` - add/update/remove piece meshes from scene
- Create: `src/application/handlers/handleCustomBoard.ts` - init/destroy 3D mode
- Create: `src/application/effects/onCustomBoard.ts` - watch customBoardEnabled

**Phase 3 (3D-Dependent Features):**
- Create: `src/presentation/3d/camera.ts` - camera angle from parallax degrees
- Create: `src/application/effects/onParallax.ts` - watch parallax signal
- Create: `src/presentation/3d/hoverAnimation.ts` - oscillating camera animation
- Create: `src/application/effects/onHoverMode.ts` - start/stop animation loop
- Create: `src/application/effects/onPieceStyle.ts` - rebuild pieces on style change
- Create: `src/domain/chess/blackSegments.ts` - quadrant selection logic
- Create: `src/presentation/3d/blackSegments.ts` - black-out squares on board plane
- Create: `src/application/handlers/handleBlackSegments.ts` - interval timer management
- Create: `src/application/effects/onBlackSegments.ts` - watch black segments settings
- Create: `src/presentation/3d/drawings3d.ts` - 3D torus circles and cylinder arrows
- Modify: `src/application/handlers/handleDrawCommand.ts` - dispatch to 2D or 3D

**Integration (wiring in init.tsx):**
- Modify: `src/init.tsx` - add effects and state for all new features

---

## Phase 1: Simple Wiring

---

### Task 1: Wire Drawing Commands from Keyboard Input

**Files:**
- Create: `src/application/handlers/handleDrawCommand.ts`
- Create: `src/application/handlers/handleDrawCommand.test.ts`
- Modify: `src/application/input/keyboardInput.ts`

- [ ] **Step 1: Write failing test for handleDrawCommand**

Create `src/application/handlers/handleDrawCommand.test.ts`:

```typescript
import { describe, it } from 'vitest'
import { mockModule } from 'simone'
import { handleDrawCommand } from './handleDrawCommand'

const annotations = mockModule<
  typeof import('../../presentation/non-preact-components/annotations')
>('../../presentation/non-preact-components/annotations')

const commandParser = mockModule<
  typeof import('../../domain/commands/commandParser')
>('../../domain/commands/commandParser')

describe('handleDrawCommand', () => {
  it('parses command and draws annotations', () => {
    const mockState = { svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg') }
    const parsed = [{ type: 'circle' as const, square: 'e4' }]

    commandParser.expects('parseDrawCommand').withArgs('-e4').returns(parsed)
    annotations.expects('drawAnnotations').withArgs(mockState, parsed).returns(undefined)

    handleDrawCommand('-e4', mockState)
  })

  it('clears annotations for empty result', () => {
    const mockState = { svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg') }

    commandParser.expects('parseDrawCommand').withArgs('-').returns([])
    annotations.expects('drawAnnotations').withArgs(mockState, []).returns(undefined)

    handleDrawCommand('-', mockState)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/application/handlers/handleDrawCommand.test.ts`
Expected: FAIL with "Cannot find module './handleDrawCommand'"

- [ ] **Step 3: Write minimal implementation**

Create `src/application/handlers/handleDrawCommand.ts`:

```typescript
import { parseDrawCommand } from '../../domain/commands/commandParser'
import {
  type AnnotationsState,
  drawAnnotations,
} from '../../presentation/non-preact-components/annotations'

export function handleDrawCommand(command: string, state: AnnotationsState): void {
  const annotations = parseDrawCommand(command)
  drawAnnotations(state, annotations)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/application/handlers/handleDrawCommand.test.ts`
Expected: PASS

- [ ] **Step 5: Wire into keyboardInput.ts**

Modify `src/application/input/keyboardInput.ts` - update the `handleInput` function to call `handleDrawCommand` when input starts with `-`:

In the import section, add:
```typescript
import { handleDrawCommand } from '../handlers/handleDrawCommand'
import type { AnnotationsState } from '../../presentation/non-preact-components/annotations'
```

Change the function signature to accept annotations state:
```typescript
export function setupKeyboardCommands(settings: SettingsStore, annotationsState: AnnotationsState): void {
```

Replace the placeholder comment inside `handleInput`:
```typescript
    // Check for drawing commands
    if (value.startsWith('-')) {
      handleDrawCommand(value, annotationsState)
      return
    }
```

- [ ] **Step 6: Update keyboardInput tests**

Update the test file to pass a mock annotations state to `setupKeyboardCommands`. Add a test for draw command handling.

- [ ] **Step 7: Update init.tsx to create annotations state and pass it**

In `src/init.tsx`, add import:
```typescript
import { createAnnotations, destroyAnnotations } from './presentation/non-preact-components/annotations'
```

After creating dividers state, add:
```typescript
  const annotationsState = createAnnotations()
```

Update the `setupKeyboardCommands` call:
```typescript
  setupKeyboardCommands(settings, annotationsState)
```

Add to cleanup:
```typescript
    destroyAnnotations(annotationsState)
```

- [ ] **Step 8: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 9: Commit**

```bash
git add src/application/handlers/handleDrawCommand.ts src/application/handlers/handleDrawCommand.test.ts src/application/input/keyboardInput.ts src/application/input/keyboardInput.test.ts src/init.tsx
git commit -m "feat: wire drawing commands from keyboard input to annotations renderer"
```

---

### Task 2: Flash Mode Interval Loop

**Files:**
- Create: `src/application/effects/onFlash.ts`
- Create: `src/application/effects/onFlash.test.ts`
- Modify: `src/application/handlers/handleFlash.ts`

The flash mode behavior from the original:
1. When flash mode enabled: board is hidden (black overlay shown)
2. Every `flashInterval` seconds, the board is briefly shown for `flashDuration` ms, then hidden again
3. On board change (move made), also triggers a flash (show then hide)
4. When disabled: overlay removed, board visible

- [ ] **Step 1: Rewrite handleFlash.ts for loop behavior**

Replace `src/application/handlers/handleFlash.ts`:

```typescript
import {
  type FlashOverlayState,
  hideFlash,
  showFlash,
} from '../../presentation/non-preact-components/flash'
import type { SettingsStore } from '../settings/settingsStore'

export interface FlashLoopState {
  intervalId: ReturnType<typeof setInterval> | null
  timeoutId: ReturnType<typeof setTimeout> | null
}

export function createFlashLoopState(): FlashLoopState {
  return { intervalId: null, timeoutId: null }
}

export function triggerFlash(
  overlayState: FlashOverlayState,
  loopState: FlashLoopState,
  settings: SettingsStore
): void {
  // Show board briefly
  hideFlash(overlayState)

  // Clear any pending hide timeout
  if (loopState.timeoutId !== null) {
    clearTimeout(loopState.timeoutId)
  }

  const durationMs = settings.flashDuration.value

  // Hide after duration
  loopState.timeoutId = setTimeout(() => {
    showFlash(overlayState)
    loopState.timeoutId = null
  }, durationMs)
}

export function startFlashLoop(
  overlayState: FlashOverlayState,
  loopState: FlashLoopState,
  settings: SettingsStore
): void {
  stopFlashLoop(loopState)

  // Show overlay immediately (board hidden)
  showFlash(overlayState)

  // Trigger first flash
  triggerFlash(overlayState, loopState, settings)

  // Start interval
  const intervalMs = settings.flashInterval.value * 1000
  loopState.intervalId = setInterval(() => {
    triggerFlash(overlayState, loopState, settings)
  }, intervalMs)
}

export function stopFlashLoop(loopState: FlashLoopState): void {
  if (loopState.intervalId !== null) {
    clearInterval(loopState.intervalId)
    loopState.intervalId = null
  }
  if (loopState.timeoutId !== null) {
    clearTimeout(loopState.timeoutId)
    loopState.timeoutId = null
  }
}
```

- [ ] **Step 2: Write test for handleFlash**

Create `src/application/handlers/handleFlash.test.ts`:

```typescript
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockModule } from 'simone'
import {
  createFlashLoopState,
  startFlashLoop,
  stopFlashLoop,
  triggerFlash,
} from './handleFlash'

const flash = mockModule<
  typeof import('../../presentation/non-preact-components/flash')
>('../../presentation/non-preact-components/flash')

describe('handleFlash', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('triggerFlash shows board then hides after duration', () => {
    const overlayState = { overlay: document.createElement('div') }
    const loopState = createFlashLoopState()
    const settings = { flashDuration: { value: 500 }, flashInterval: { value: 3 } } as any

    flash.expects('hideFlash').withArgs(overlayState).returns(undefined)
    triggerFlash(overlayState, loopState, settings)

    flash.expects('showFlash').withArgs(overlayState).returns(undefined)
    vi.advanceTimersByTime(500)
  })

  it('startFlashLoop shows overlay and starts interval', () => {
    const overlayState = { overlay: document.createElement('div') }
    const loopState = createFlashLoopState()
    const settings = { flashDuration: { value: 500 }, flashInterval: { value: 3 } } as any

    // Initial show + first trigger's hide
    flash.expects('showFlash').withArgs(overlayState).returns(undefined)
    flash.expects('hideFlash').withArgs(overlayState).returns(undefined)

    startFlashLoop(overlayState, loopState, settings)

    expect(loopState.intervalId).not.toBeNull()

    stopFlashLoop(loopState)
  })

  it('stopFlashLoop clears interval and timeout', () => {
    const loopState = createFlashLoopState()
    loopState.intervalId = setInterval(() => {}, 1000)
    loopState.timeoutId = setTimeout(() => {}, 1000)

    stopFlashLoop(loopState)

    expect(loopState.intervalId).toBeNull()
    expect(loopState.timeoutId).toBeNull()
  })
})
```

- [ ] **Step 3: Run tests**

Run: `npx vitest run src/application/handlers/handleFlash.test.ts`
Expected: PASS

- [ ] **Step 4: Create onFlash effect**

Create `src/application/effects/onFlash.ts`:

```typescript
import { effect } from '@preact/signals-core'
import type { Signal } from '@preact/signals-core'
import type { FlashOverlayState } from '../../presentation/non-preact-components/flash'
import { hideFlash } from '../../presentation/non-preact-components/flash'
import {
  type FlashLoopState,
  startFlashLoop,
  stopFlashLoop,
  triggerFlash,
} from '../handlers/handleFlash'
import type { SettingsStore } from '../settings/settingsStore'

export function setupFlashEffect(
  overlayState: FlashOverlayState,
  loopState: FlashLoopState,
  settings: SettingsStore,
  boardChanged: Signal<number>
): () => void {
  // Effect for flash mode enabled/disabled and settings changes
  const cleanupModeEffect = effect(() => {
    const enabled = settings.flashModeEnabled.value
    // Track interval and duration so effect re-runs on change
    settings.flashInterval.value
    settings.flashDuration.value

    if (enabled) {
      startFlashLoop(overlayState, loopState, settings)
    } else {
      stopFlashLoop(loopState)
      hideFlash(overlayState)
    }
  })

  // Effect for board changes triggering a flash
  const cleanupBoardEffect = effect(() => {
    boardChanged.value
    if (settings.flashModeEnabled.value && loopState.intervalId !== null) {
      triggerFlash(overlayState, loopState, settings)
      // Restart interval from this point
      stopFlashLoop(loopState)
      startFlashLoop(overlayState, loopState, settings)
    }
  })

  return () => {
    cleanupModeEffect()
    cleanupBoardEffect()
    stopFlashLoop(loopState)
  }
}
```

- [ ] **Step 5: Wire into init.tsx**

In `src/init.tsx`, add imports:
```typescript
import { createFlashLoopState } from './application/handlers/handleFlash'
import { setupFlashEffect } from './application/effects/onFlash'
```

After creating flashState, add:
```typescript
  const flashLoopState = createFlashLoopState()
```

After the dividers effect setup, add:
```typescript
  const cleanupFlash = setupFlashEffect(flashState, flashLoopState, settings, boardChanged)
```

Add to cleanup:
```typescript
    cleanupFlash()
```

- [ ] **Step 6: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 7: Commit**

```bash
git add src/application/handlers/handleFlash.ts src/application/handlers/handleFlash.test.ts src/application/effects/onFlash.ts src/init.tsx
git commit -m "feat: implement flash mode interval loop with board change triggers"
```

---

### Task 3: Blur Effect

**Files:**
- Create: `src/application/handlers/applyBlur.ts`
- Create: `src/application/handlers/applyBlur.test.ts`
- Create: `src/application/effects/onBlur.ts`

- [ ] **Step 1: Write failing test**

Create `src/application/handlers/applyBlur.test.ts`:

```typescript
import { beforeEach, describe, expect, it } from 'vitest'
import { applyBlur } from './applyBlur'

describe('applyBlur', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.innerHTML = ''
    container.classList.add('cg-container')
    document.body.appendChild(container)
  })

  it('applies blur filter when amount > 0', () => {
    applyBlur(3)
    const el = document.querySelector('cg-container') as HTMLElement
    expect(el.style.filter).toBe('blur(3px)')
  })

  it('removes filter when amount is 0', () => {
    applyBlur(0)
    const el = document.querySelector('cg-container') as HTMLElement
    expect(el.style.filter).toBe('')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/application/handlers/applyBlur.test.ts`
Expected: FAIL with "Cannot find module './applyBlur'"

- [ ] **Step 3: Write implementation**

Create `src/application/handlers/applyBlur.ts`:

```typescript
import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'

export function applyBlur(amount: number): void {
  const container = querySelector(DomSelector.CONTAINER) as HTMLElement | null
  if (!container) return

  if (amount === 0) {
    container.style.filter = ''
  } else {
    container.style.filter = `blur(${amount}px)`
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/application/handlers/applyBlur.test.ts`
Expected: PASS (note: may need to check that DomSelector.CONTAINER matches 'cg-container' - adjust test setup if needed)

- [ ] **Step 5: Create onBlur effect**

Create `src/application/effects/onBlur.ts`:

```typescript
import { effect } from '@preact/signals-core'
import { applyBlur } from '../handlers/applyBlur'
import type { SettingsStore } from '../settings/settingsStore'

export function setupBlurEffect(settings: SettingsStore): () => void {
  return effect(() => {
    const obfuscationsEnabled = settings.obfuscationsEnabled.value
    const blur = settings.blur.value

    if (obfuscationsEnabled) {
      applyBlur(blur)
    } else {
      applyBlur(0)
    }
  })
}
```

- [ ] **Step 6: Wire into init.tsx**

Add import:
```typescript
import { setupBlurEffect } from './application/effects/onBlur'
```

After flash effect setup:
```typescript
  const cleanupBlur = setupBlurEffect(settings)
```

Add to cleanup:
```typescript
    cleanupBlur()
```

- [ ] **Step 7: Run all tests and commit**

Run: `npx vitest run`
Expected: All PASS

```bash
git add src/application/handlers/applyBlur.ts src/application/handlers/applyBlur.test.ts src/application/effects/onBlur.ts src/init.tsx
git commit -m "feat: implement blur CSS filter effect"
```

---

## Phase 2: 3D Board Foundation

---

### Task 4: Pixel-to-3D Coordinate Conversion (Domain)

**Files:**
- Create: `src/domain/chess/boardPosition3d.ts`
- Create: `src/domain/chess/boardPosition3d.test.ts`

This is the pure function that converts a piece's pixel position on the 2D board to a 3D coordinate in the Three.js scene. The 3D board spans from -4 to +4 on both X and Z axes.

- [ ] **Step 1: Write failing test**

Create `src/domain/chess/boardPosition3d.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import { pixelPositionTo3D } from './boardPosition3d'

describe('pixelPositionTo3D', () => {
  it('converts top-left pixel to 3D for white player', () => {
    // Top-left of board (0,0) with boardSize 624
    // Piece center offset: 624/16 = 39
    const result = pixelPositionTo3D(39, 39, 624, false)
    // normalizedX = 39/624*8 = 0.5, normalizedY = 39/624*8 = 0.5
    // white: x = 0.5 - 4 = -3.5, z = (8 - 0.5) - 4 = 3.5
    expect(result.x).toBeCloseTo(-3.5, 1)
    expect(result.z).toBeCloseTo(3.5, 1)
  })

  it('converts center pixel to 3D for white player', () => {
    const result = pixelPositionTo3D(312, 312, 624, false)
    expect(result.x).toBeCloseTo(0, 1)
    expect(result.z).toBeCloseTo(0, 1)
  })

  it('converts for flipped (black) player', () => {
    // For flipped: x = normalizedX - 4, z = normalizedY - 4
    const result = pixelPositionTo3D(39, 39, 624, true)
    expect(result.x).toBeCloseTo(-3.5, 1)
    expect(result.z).toBeCloseTo(-3.5, 1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/domain/chess/boardPosition3d.test.ts`
Expected: FAIL

- [ ] **Step 3: Write implementation**

Create `src/domain/chess/boardPosition3d.ts`:

```typescript
export interface Position3D {
  x: number
  z: number
}

export function pixelPositionTo3D(
  pixelX: number,
  pixelY: number,
  boardSize: number,
  isFlipped: boolean
): Position3D {
  const normalizedX = (pixelX / boardSize) * 8
  const normalizedY = (pixelY / boardSize) * 8

  let x: number
  let z: number

  if (isFlipped) {
    x = normalizedX - 4
    z = normalizedY - 4
  } else {
    x = normalizedX - 4
    z = (8 - normalizedY) - 4
  }

  return { x, z }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/domain/chess/boardPosition3d.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/domain/chess/boardPosition3d.ts src/domain/chess/boardPosition3d.test.ts
git commit -m "feat: add pixel-to-3D coordinate conversion"
```

---

### Task 5: Piece Geometry Factories

**Files:**
- Create: `src/presentation/3d/geometries.ts`
- Create: `src/presentation/3d/geometries.test.ts`

Each piece type has a unique 3D geometry created with Three.js LatheGeometry (for rotationally symmetric pieces) or ExtrudeGeometry (for knight).

- [ ] **Step 1: Write test**

Create `src/presentation/3d/geometries.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import {
  createBishopGeometry,
  createCheckerGeometry,
  createKingGeometry,
  createKnightGeometry,
  createPawnGeometry,
  createQueenGeometry,
  createRookGeometry,
} from './geometries'

describe('geometries', () => {
  it('creates pawn geometry', () => {
    const geom = createPawnGeometry()
    expect(geom).toBeDefined()
    expect(geom.attributes.position).toBeDefined()
  })

  it('creates rook geometry', () => {
    const geom = createRookGeometry()
    expect(geom).toBeDefined()
  })

  it('creates knight geometry', () => {
    const geom = createKnightGeometry()
    expect(geom).toBeDefined()
  })

  it('creates bishop geometry', () => {
    const geom = createBishopGeometry()
    expect(geom).toBeDefined()
  })

  it('creates queen geometry', () => {
    const geom = createQueenGeometry()
    expect(geom).toBeDefined()
  })

  it('creates king geometry group', () => {
    const result = createKingGeometry()
    expect(result.base).toBeDefined()
    expect(result.crossV).toBeDefined()
    expect(result.crossH).toBeDefined()
  })

  it('creates checker geometry', () => {
    const geom = createCheckerGeometry()
    expect(geom).toBeDefined()
  })
})
```

- [ ] **Step 2: Write implementation**

Create `src/presentation/3d/geometries.ts`:

```typescript
import { THREE } from '../../platform/three'

export function createPawnGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.35, 0),
    new THREE.Vector2(0.35, 0.05),
    new THREE.Vector2(0.28, 0.1),
    new THREE.Vector2(0.15, 0.35),
    new THREE.Vector2(0.12, 0.45),
    new THREE.Vector2(0.18, 0.55),
    new THREE.Vector2(0.18, 0.6),
    new THREE.Vector2(0.22, 0.65),
    new THREE.Vector2(0.22, 0.85),
    new THREE.Vector2(0, 0.85),
  ]
  return new THREE.LatheGeometry(points, 24)
}

export function createRookGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.4, 0),
    new THREE.Vector2(0.4, 0.08),
    new THREE.Vector2(0.32, 0.12),
    new THREE.Vector2(0.22, 0.2),
    new THREE.Vector2(0.2, 0.7),
    new THREE.Vector2(0.28, 0.75),
    new THREE.Vector2(0.28, 0.85),
    new THREE.Vector2(0.32, 0.85),
    new THREE.Vector2(0.32, 1.0),
    new THREE.Vector2(0, 1.0),
  ]
  return new THREE.LatheGeometry(points, 4)
}

export function createKnightGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-0.15, 0)
  shape.lineTo(0.35, 0)
  shape.lineTo(0.35, 0.08)
  shape.lineTo(0.25, 0.12)
  shape.lineTo(0.15, 0.18)
  shape.quadraticCurveTo(0.08, 0.35, 0.1, 0.5)
  shape.quadraticCurveTo(0.15, 0.65, 0.25, 0.75)
  shape.quadraticCurveTo(0.35, 0.85, 0.38, 0.95)
  shape.lineTo(0.42, 1.0)
  shape.lineTo(0.45, 1.08)
  shape.lineTo(0.42, 1.12)
  shape.lineTo(0.35, 1.08)
  shape.quadraticCurveTo(0.25, 1.02, 0.18, 1.08)
  shape.lineTo(0.22, 1.18)
  shape.lineTo(0.18, 1.22)
  shape.lineTo(0.1, 1.15)
  shape.quadraticCurveTo(-0.05, 1.05, -0.15, 1.1)
  shape.quadraticCurveTo(-0.25, 1.12, -0.32, 1.05)
  shape.lineTo(-0.35, 0.95)
  shape.lineTo(-0.3, 0.88)
  shape.lineTo(-0.2, 0.9)
  shape.quadraticCurveTo(-0.1, 0.85, -0.15, 0.75)
  shape.lineTo(-0.25, 0.7)
  shape.lineTo(-0.35, 0.65)
  shape.lineTo(-0.38, 0.55)
  shape.lineTo(-0.32, 0.5)
  shape.lineTo(-0.22, 0.52)
  shape.quadraticCurveTo(-0.12, 0.48, -0.1, 0.38)
  shape.quadraticCurveTo(-0.08, 0.25, -0.15, 0.15)
  shape.lineTo(-0.2, 0.08)
  shape.lineTo(-0.15, 0)

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 4,
  })
}

export function createBishopGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.38, 0),
    new THREE.Vector2(0.38, 0.06),
    new THREE.Vector2(0.3, 0.1),
    new THREE.Vector2(0.18, 0.25),
    new THREE.Vector2(0.15, 0.4),
    new THREE.Vector2(0.2, 0.5),
    new THREE.Vector2(0.2, 0.55),
    new THREE.Vector2(0.12, 0.7),
    new THREE.Vector2(0.08, 0.95),
    new THREE.Vector2(0.15, 1.05),
    new THREE.Vector2(0.1, 1.15),
    new THREE.Vector2(0.05, 1.2),
    new THREE.Vector2(0, 1.25),
  ]
  return new THREE.LatheGeometry(points, 24)
}

export function createQueenGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.42, 0),
    new THREE.Vector2(0.42, 0.08),
    new THREE.Vector2(0.34, 0.12),
    new THREE.Vector2(0.22, 0.25),
    new THREE.Vector2(0.18, 0.45),
    new THREE.Vector2(0.24, 0.55),
    new THREE.Vector2(0.24, 0.6),
    new THREE.Vector2(0.16, 0.75),
    new THREE.Vector2(0.14, 0.95),
    new THREE.Vector2(0.22, 1.05),
    new THREE.Vector2(0.28, 1.15),
    new THREE.Vector2(0.22, 1.25),
    new THREE.Vector2(0.15, 1.3),
    new THREE.Vector2(0.08, 1.35),
    new THREE.Vector2(0, 1.35),
  ]
  return new THREE.LatheGeometry(points, 8)
}

export interface KingGeometry {
  base: THREE.LatheGeometry
  crossV: THREE.BoxGeometry
  crossH: THREE.BoxGeometry
}

export function createKingGeometry(): KingGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.44, 0),
    new THREE.Vector2(0.44, 0.08),
    new THREE.Vector2(0.36, 0.12),
    new THREE.Vector2(0.24, 0.28),
    new THREE.Vector2(0.2, 0.5),
    new THREE.Vector2(0.26, 0.6),
    new THREE.Vector2(0.26, 0.65),
    new THREE.Vector2(0.18, 0.8),
    new THREE.Vector2(0.16, 1.0),
    new THREE.Vector2(0.24, 1.1),
    new THREE.Vector2(0.24, 1.2),
    new THREE.Vector2(0.18, 1.25),
    new THREE.Vector2(0.18, 1.3),
    new THREE.Vector2(0, 1.3),
  ]

  return {
    base: new THREE.LatheGeometry(points, 24),
    crossV: new THREE.BoxGeometry(0.08, 0.25, 0.08),
    crossH: new THREE.BoxGeometry(0.2, 0.08, 0.08),
  }
}

export function createCheckerGeometry(): THREE.CylinderGeometry {
  return new THREE.CylinderGeometry(0.4, 0.4, 0.15, 32)
}
```

- [ ] **Step 3: Run tests**

Run: `npx vitest run src/presentation/3d/geometries.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/presentation/3d/geometries.ts src/presentation/3d/geometries.test.ts
git commit -m "feat: add 3D piece geometry factories"
```

---

### Task 6: Piece Mesh Creation by Style

**Files:**
- Create: `src/presentation/3d/pieceMesh.ts`
- Create: `src/presentation/3d/pieceMesh.test.ts`

Creates the actual Three.js mesh for a piece based on the current piece style setting.

- [ ] **Step 1: Write implementation**

Create `src/presentation/3d/pieceMesh.ts`:

```typescript
import { THREE } from '../../platform/three'
import {
  createBishopGeometry,
  createCheckerGeometry,
  createKingGeometry,
  createKnightGeometry,
  createPawnGeometry,
  createQueenGeometry,
  createRookGeometry,
} from './geometries'

type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king'

function create3DPieceMesh(pieceType: PieceType, isWhite: boolean): THREE.Object3D {
  const color = isWhite ? 0xf5f5dc : 0x2d2d2d
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1 })

  if (pieceType === 'king') {
    const geometries = createKingGeometry()
    const group = new THREE.Group()
    group.add(new THREE.Mesh(geometries.base, material))
    const crossV = new THREE.Mesh(geometries.crossV, material)
    crossV.position.y = 1.42
    group.add(crossV)
    const crossH = new THREE.Mesh(geometries.crossH, material)
    crossH.position.y = 1.38
    group.add(crossH)
    return group
  }

  let geometry: THREE.BufferGeometry
  if (pieceType === 'pawn') geometry = createPawnGeometry()
  else if (pieceType === 'rook') geometry = createRookGeometry()
  else if (pieceType === 'knight') geometry = createKnightGeometry()
  else if (pieceType === 'bishop') geometry = createBishopGeometry()
  else geometry = createQueenGeometry()

  const mesh = new THREE.Mesh(geometry, material)

  if (pieceType === 'knight') {
    mesh.rotation.y = isWhite ? 0 : Math.PI
    mesh.position.x = isWhite ? 0.05 : -0.05
    mesh.position.z = isWhite ? -0.11 : 0.11
  }

  return mesh
}

function createCheckerPieceMesh(isWhite: boolean, whiteColor: number, blackColor: number): THREE.Mesh {
  const color = isWhite ? whiteColor : blackColor
  const material = new THREE.MeshBasicMaterial({ color })
  const geometry = createCheckerGeometry()
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = 0.075
  return mesh
}

function createIconPieceMesh(pieceType: PieceType, isWhite: boolean): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(1.4, 1.4)
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = 0.01

  const colorChar = isWhite ? 'w' : 'b'
  const pieceChar = pieceType === 'knight' ? 'N' : pieceType.charAt(0).toUpperCase()
  const url = `https://lichess1.org/assets/piece/cburnett/${colorChar}${pieceChar}.svg`

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0, 256, 256)
    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    material.map = texture
    material.needsUpdate = true
  }
  img.src = url

  return mesh
}

export function createPieceMesh(
  pieceType: PieceType,
  isWhite: boolean,
  style: string
): THREE.Object3D | null {
  switch (style) {
    case '3d':
      return create3DPieceMesh(pieceType, isWhite)
    case 'checker':
      return createCheckerPieceMesh(isWhite, 0xe8e8e8, 0x1a1a1a)
    case 'checker-grey':
      return createCheckerPieceMesh(isWhite, 0x505050, 0x505050)
    case 'blindfold':
      return null
    case 'icons':
    default:
      return createIconPieceMesh(pieceType, isWhite)
  }
}
```

- [ ] **Step 2: Write test**

Create `src/presentation/3d/pieceMesh.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import { createPieceMesh } from './pieceMesh'

describe('createPieceMesh', () => {
  it('creates 3d style mesh for pawn', () => {
    const mesh = createPieceMesh('pawn', true, '3d')
    expect(mesh).not.toBeNull()
  })

  it('creates 3d style mesh for king (group)', () => {
    const mesh = createPieceMesh('king', true, '3d')
    expect(mesh).not.toBeNull()
    expect(mesh!.children.length).toBeGreaterThan(0)
  })

  it('creates checker mesh', () => {
    const mesh = createPieceMesh('rook', true, 'checker')
    expect(mesh).not.toBeNull()
  })

  it('creates checker-grey mesh', () => {
    const mesh = createPieceMesh('rook', false, 'checker-grey')
    expect(mesh).not.toBeNull()
  })

  it('returns null for blindfold', () => {
    const mesh = createPieceMesh('pawn', true, 'blindfold')
    expect(mesh).toBeNull()
  })

  it('creates icon mesh (default)', () => {
    const mesh = createPieceMesh('queen', true, 'icons')
    expect(mesh).not.toBeNull()
  })
})
```

- [ ] **Step 3: Run tests**

Run: `npx vitest run src/presentation/3d/pieceMesh.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/presentation/3d/pieceMesh.ts src/presentation/3d/pieceMesh.test.ts
git commit -m "feat: add piece mesh creation by style"
```

---

### Task 7: Board Plane Creation

**Files:**
- Create: `src/presentation/3d/boardPlane.ts`
- Create: `src/presentation/3d/boardPlane.test.ts`

Creates an 8x8 grid of colored squares as a Three.js group.

- [ ] **Step 1: Write implementation**

Create `src/presentation/3d/boardPlane.ts`:

```typescript
import { THREE } from '../../platform/three'

const LIGHT_COLOR = 0xeeeed2
const DARK_COLOR = 0x769656
const BLACK_COLOR = 0x000000

export function createBoardPlane(blackedOutQuadrants: number[]): THREE.Group {
  const boardGroup = new THREE.Group()

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareGeom = new THREE.PlaneGeometry(1, 1)
      const isLight = (row + col) % 2 === 0

      const isBlackedOut = isSquareInBlackedOutQuadrant(col, row, blackedOutQuadrants)
      let material: THREE.MeshBasicMaterial
      if (isBlackedOut) {
        material = new THREE.MeshBasicMaterial({ color: BLACK_COLOR })
      } else {
        material = new THREE.MeshBasicMaterial({ color: isLight ? LIGHT_COLOR : DARK_COLOR })
      }

      const square = new THREE.Mesh(squareGeom, material)
      square.position.set(col - 3.5, 0, row - 3.5)
      square.rotation.x = -Math.PI / 2
      boardGroup.add(square)
    }
  }

  return boardGroup
}

function isSquareInBlackedOutQuadrant(col: number, row: number, quadrants: number[]): boolean {
  if (quadrants.length === 0) return false

  const isLeft = col < 4
  const isTop = row < 4

  let quadrant: number
  if (isTop && isLeft) quadrant = 0
  else if (isTop && !isLeft) quadrant = 1
  else if (!isTop && isLeft) quadrant = 2
  else quadrant = 3

  return quadrants.includes(quadrant)
}
```

- [ ] **Step 2: Write test**

Create `src/presentation/3d/boardPlane.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import { createBoardPlane } from './boardPlane'

describe('createBoardPlane', () => {
  it('creates 64 squares', () => {
    const plane = createBoardPlane([])
    expect(plane.children.length).toBe(64)
  })

  it('creates board without blacked out quadrants', () => {
    const plane = createBoardPlane([])
    // All squares should have either light or dark color, not black
    const firstSquare = plane.children[0] as THREE.Mesh
    expect(firstSquare.material).toBeDefined()
  })

  it('creates board with blacked out quadrant 0 (top-left)', () => {
    const plane = createBoardPlane([0])
    // Square at (0,0) should be black
    const topLeft = plane.children[0] as any
    expect(topLeft.material.color.getHex()).toBe(0x000000)
  })
})
```

- [ ] **Step 3: Run tests**

Run: `npx vitest run src/presentation/3d/boardPlane.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/presentation/3d/boardPlane.ts src/presentation/3d/boardPlane.test.ts
git commit -m "feat: add 3D board plane creation with black segment support"
```

---

### Task 8: Piece Manager

**Files:**
- Create: `src/presentation/3d/pieceManager.ts`
- Create: `src/presentation/3d/pieceManager.test.ts`

Manages piece meshes on the 3D scene - reads DOM pieces, creates/updates/removes meshes.

- [ ] **Step 1: Write implementation**

Create `src/presentation/3d/pieceManager.ts`:

```typescript
import { THREE } from '../../platform/three'
import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'
import { pixelPositionTo3D } from '../../domain/chess/boardPosition3d'
import { createPieceMesh } from './pieceMesh'
import type { Canvas3DState } from './canvas'

export interface PieceManagerState {
  meshes: THREE.Object3D[]
  meshMap: Map<string, THREE.Object3D>
}

export function createPieceManager(): PieceManagerState {
  return { meshes: [], meshMap: new Map() }
}

export function updatePieces(
  canvasState: Canvas3DState,
  pieceManagerState: PieceManagerState,
  pieceStyle: string,
  isFlipped: boolean,
  blackedOutQuadrants: number[]
): void {
  const board = querySelector(DomSelector.BOARD) as HTMLElement | null
  if (!board) return

  const boardSize = board.getBoundingClientRect().width
  const squareSize = boardSize / 8
  const pieceElements = board.querySelectorAll('piece')
  const currentPieceIds = new Set<string>()

  for (const pieceEl of pieceElements) {
    const classes = pieceEl.className
    const match = classes.match(/^(white|black)\s+(king|queen|rook|bishop|knight|pawn)/)
    if (!match) continue
    if (pieceEl.classList.contains('ghost')) continue

    const colour = match[1] as 'white' | 'black'
    const type = match[2] as 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king'

    const el = pieceEl as HTMLElement
    const transform = window.getComputedStyle(el).transform
    let pixelX: number
    let pixelY: number

    const matrixMatch = transform?.match(/matrix\(([^)]+)\)/)
    if (matrixMatch) {
      const values = matrixMatch[1].split(',').map(v => Number.parseFloat(v.trim()))
      pixelX = values[4]
      pixelY = values[5]
    } else {
      const translateMatch = el.style.transform.match(/translate\(([\d.]+)px(?:,\s*([\d.]+)px)?\)/)
      if (!translateMatch) continue
      pixelX = Number.parseFloat(translateMatch[1])
      pixelY = Number.parseFloat(translateMatch[2] || '0')
    }

    const pieceId = `${colour}-${type}-${Math.round(pixelX)}-${Math.round(pixelY)}`
    currentPieceIds.add(pieceId)

    let mesh = pieceManagerState.meshMap.get(pieceId)

    // Try to reuse an existing mesh of the same type that's no longer in use
    if (!mesh) {
      for (const [key, existingMesh] of pieceManagerState.meshMap.entries()) {
        if (key.startsWith(`${colour}-${type}-`) && !currentPieceIds.has(key)) {
          mesh = existingMesh
          pieceManagerState.meshMap.delete(key)
          pieceManagerState.meshMap.set(pieceId, mesh)
          break
        }
      }
    }

    // Create new mesh if needed
    if (!mesh) {
      mesh = createPieceMesh(type, colour === 'white', pieceStyle)
      if (!mesh) continue

      const scale = 0.65
      mesh.scale.set(scale, scale, scale)
      canvasState.scene.add(mesh)
      pieceManagerState.meshes.push(mesh)
      pieceManagerState.meshMap.set(pieceId, mesh)
    }

    // Update position
    const centerOffset = squareSize / 2
    const pos3D = pixelPositionTo3D(pixelX + centerOffset, pixelY + centerOffset, boardSize, isFlipped)
    mesh.position.x = pos3D.x
    mesh.position.z = pos3D.z

    // Store grid position for black segment visibility
    const col = Math.round(pixelX / squareSize)
    const row = Math.round(pixelY / squareSize)
    mesh.userData.col = col
    mesh.userData.row = row

    // Rotate icons for board flip
    if (pieceStyle === 'icons') {
      mesh.rotation.z = isFlipped ? 0 : Math.PI
    }

    // Hide pieces in blacked out quadrants
    const isBlackedOut = isPositionBlackedOut(col, row, blackedOutQuadrants)
    mesh.visible = !isBlackedOut
  }

  // Remove meshes that are no longer on the board
  for (const [key, mesh] of pieceManagerState.meshMap.entries()) {
    if (!currentPieceIds.has(key)) {
      canvasState.scene.remove(mesh)
      disposeMesh(mesh)
      pieceManagerState.meshMap.delete(key)
      const idx = pieceManagerState.meshes.indexOf(mesh)
      if (idx > -1) pieceManagerState.meshes.splice(idx, 1)
    }
  }
}

export function clearAllPieces(
  canvasState: Canvas3DState,
  pieceManagerState: PieceManagerState
): void {
  for (const mesh of pieceManagerState.meshes) {
    canvasState.scene.remove(mesh)
    disposeMesh(mesh)
  }
  pieceManagerState.meshes = []
  pieceManagerState.meshMap.clear()
}

function disposeMesh(obj: THREE.Object3D): void {
  if (obj instanceof THREE.Mesh) {
    obj.geometry?.dispose()
    if (obj.material instanceof THREE.Material) {
      obj.material.dispose()
    }
  }
  if ('children' in obj) {
    for (const child of obj.children) {
      disposeMesh(child)
    }
  }
}

function isPositionBlackedOut(col: number, row: number, quadrants: number[]): boolean {
  if (quadrants.length === 0) return false
  const isLeft = col < 4
  const isTop = row < 4
  let quadrant: number
  if (isTop && isLeft) quadrant = 0
  else if (isTop && !isLeft) quadrant = 1
  else if (!isTop && isLeft) quadrant = 2
  else quadrant = 3
  return quadrants.includes(quadrant)
}
```

- [ ] **Step 2: Write basic test**

Create `src/presentation/3d/pieceManager.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import { clearAllPieces, createPieceManager } from './pieceManager'

describe('pieceManager', () => {
  it('creates empty piece manager state', () => {
    const state = createPieceManager()
    expect(state.meshes).toEqual([])
    expect(state.meshMap.size).toBe(0)
  })
})
```

- [ ] **Step 3: Run tests**

Run: `npx vitest run src/presentation/3d/pieceManager.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/presentation/3d/pieceManager.ts src/presentation/3d/pieceManager.test.ts
git commit -m "feat: add 3D piece manager for creating/updating/removing piece meshes"
```

---

### Task 9: Custom Board Handler and Effect

**Files:**
- Create: `src/application/handlers/handleCustomBoard.ts`
- Create: `src/application/effects/onCustomBoard.ts`

This wires the custom board toggle: when enabled, hides the 2D board, creates 3D canvas, adds board plane and pieces. When disabled, destroys everything and shows 2D board.

- [ ] **Step 1: Write handleCustomBoard**

Create `src/application/handlers/handleCustomBoard.ts`:

```typescript
import { DomSelector } from '../../constants/dom'
import { querySelector } from '../../platform/dom'
import {
  type Canvas3DState,
  create3DCanvas,
  destroy3DCanvas,
  render3D,
} from '../../presentation/3d/canvas'
import { createBoardPlane } from '../../presentation/3d/boardPlane'
import {
  type PieceManagerState,
  clearAllPieces,
  createPieceManager,
  updatePieces,
} from '../../presentation/3d/pieceManager'
import type { SettingsStore } from '../settings/settingsStore'

export interface CustomBoardState {
  canvas: Canvas3DState | null
  pieceManager: PieceManagerState
  boardPlaneName: string
}

export function createCustomBoardState(): CustomBoardState {
  return {
    canvas: null,
    pieceManager: createPieceManager(),
    boardPlaneName: 'boardPlane',
  }
}

export function initCustomBoard(state: CustomBoardState, settings: SettingsStore): void {
  if (state.canvas) return

  // Hide original board
  const board = querySelector(DomSelector.BOARD) as HTMLElement | null
  if (board) {
    board.style.opacity = '0'
    const pieces = board.querySelectorAll('piece')
    for (const piece of pieces) {
      ;(piece as HTMLElement).style.visibility = 'hidden'
    }
  }

  // Create 3D canvas
  state.canvas = create3DCanvas()

  // Add board plane
  const boardPlane = createBoardPlane([])
  boardPlane.name = state.boardPlaneName
  state.canvas.scene.add(boardPlane)

  // Determine if board is flipped
  const coords = querySelector('coords')
  const isFlipped = coords?.classList.contains('black') ?? false

  // Add pieces
  updatePieces(state.canvas, state.pieceManager, getPieceStyle(settings), isFlipped, [])

  render3D(state.canvas)
}

export function destroyCustomBoard(state: CustomBoardState): void {
  if (!state.canvas) return

  clearAllPieces(state.canvas, state.pieceManager)
  destroy3DCanvas(state.canvas)
  state.canvas = null

  // Show original board
  const board = querySelector(DomSelector.BOARD) as HTMLElement | null
  if (board) {
    board.style.opacity = ''
    const pieces = board.querySelectorAll('piece')
    for (const piece of pieces) {
      ;(piece as HTMLElement).style.visibility = ''
    }
  }
}

export function refreshPieces(state: CustomBoardState, settings: SettingsStore): void {
  if (!state.canvas) return

  const coords = querySelector('coords')
  const isFlipped = coords?.classList.contains('black') ?? false

  updatePieces(state.canvas, state.pieceManager, getPieceStyle(settings), isFlipped, [])
  render3D(state.canvas)
}

function getPieceStyle(settings: SettingsStore): string {
  if (settings.obfuscationsEnabled.value) {
    return settings.pieceStyle.value
  }
  return settings.pieceStyle.value === '3d' ? '3d' : 'icons'
}
```

- [ ] **Step 2: Write onCustomBoard effect**

Create `src/application/effects/onCustomBoard.ts`:

```typescript
import { effect } from '@preact/signals-core'
import type { Signal } from '@preact/signals-core'
import {
  type CustomBoardState,
  destroyCustomBoard,
  initCustomBoard,
  refreshPieces,
} from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export function setupCustomBoardEffect(
  state: CustomBoardState,
  settings: SettingsStore,
  boardChanged: Signal<number>
): () => void {
  const cleanupEnabled = effect(() => {
    const enabled = settings.customBoardEnabled.value
    if (enabled) {
      initCustomBoard(state, settings)
    } else {
      destroyCustomBoard(state)
    }
  })

  const cleanupBoardChange = effect(() => {
    boardChanged.value
    if (settings.customBoardEnabled.value && state.canvas) {
      refreshPieces(state, settings)
    }
  })

  return () => {
    cleanupEnabled()
    cleanupBoardChange()
    destroyCustomBoard(state)
  }
}
```

- [ ] **Step 3: Wire into init.tsx**

Add imports:
```typescript
import { createCustomBoardState } from './application/handlers/handleCustomBoard'
import { setupCustomBoardEffect } from './application/effects/onCustomBoard'
```

After board observer start:
```typescript
  const customBoardState = createCustomBoardState()
```

After blur effect:
```typescript
  const cleanupCustomBoard = setupCustomBoardEffect(customBoardState, settings, boardChanged)
```

Add to cleanup:
```typescript
    cleanupCustomBoard()
```

- [ ] **Step 4: Run all tests**

Run: `npx vitest run`
Expected: All PASS

- [ ] **Step 5: Commit**

```bash
git add src/application/handlers/handleCustomBoard.ts src/application/effects/onCustomBoard.ts src/init.tsx
git commit -m "feat: implement custom board init/destroy with 3D canvas and piece management"
```

---

## Phase 3: 3D-Dependent Features

---

### Task 10: Camera Angle (Parallax)

**Files:**
- Create: `src/presentation/3d/camera.ts`
- Create: `src/presentation/3d/camera.test.ts`
- Create: `src/application/effects/onParallax.ts`

- [ ] **Step 1: Write camera module**

Create `src/presentation/3d/camera.ts`:

```typescript
import type { Canvas3DState } from './canvas'

export function updateCameraAngle(state: Canvas3DState, angleDegrees: number, isFlipped: boolean): void {
  const angleRad = (angleDegrees * Math.PI) / 180
  const distance = 15

  const y = Math.cos(angleRad) * distance
  const z = Math.sin(angleRad) * distance
  const zDirection = isFlipped ? 1 : -1

  state.camera.position.set(0, y, z * zDirection)
  state.camera.up.set(0, 0, -1 * zDirection)
  state.camera.lookAt(0, 0, 0)
}
```

- [ ] **Step 2: Write test**

Create `src/presentation/3d/camera.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import { THREE } from '../../platform/three'
import { updateCameraAngle } from './camera'

describe('updateCameraAngle', () => {
  it('positions camera overhead at 0 degrees', () => {
    const state = {
      camera: new THREE.PerspectiveCamera(),
      scene: new THREE.Scene(),
      renderer: { render: () => {} } as any,
      canvasElement: document.createElement('canvas'),
    }

    updateCameraAngle(state, 0, false)

    expect(state.camera.position.y).toBeCloseTo(15, 0)
    expect(state.camera.position.z).toBeCloseTo(0, 0)
  })

  it('tilts camera at 45 degrees', () => {
    const state = {
      camera: new THREE.PerspectiveCamera(),
      scene: new THREE.Scene(),
      renderer: { render: () => {} } as any,
      canvasElement: document.createElement('canvas'),
    }

    updateCameraAngle(state, 45, false)

    expect(state.camera.position.y).toBeCloseTo(10.6, 0)
    expect(state.camera.position.z).toBeLessThan(0)
  })
})
```

- [ ] **Step 3: Write onParallax effect**

Create `src/application/effects/onParallax.ts`:

```typescript
import { effect } from '@preact/signals-core'
import { querySelector } from '../../platform/dom'
import { updateCameraAngle } from '../../presentation/3d/camera'
import { render3D } from '../../presentation/3d/canvas'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export function setupParallaxEffect(
  customBoardState: CustomBoardState,
  settings: SettingsStore
): () => void {
  return effect(() => {
    const angle = settings.parallax.value
    if (!customBoardState.canvas) return

    const coords = querySelector('coords')
    const isFlipped = coords?.classList.contains('black') ?? false

    updateCameraAngle(customBoardState.canvas, angle, isFlipped)
    render3D(customBoardState.canvas)
  })
}
```

- [ ] **Step 4: Wire into init.tsx**

Add imports and setup after custom board effect:
```typescript
import { setupParallaxEffect } from './application/effects/onParallax'
// ...
  const cleanupParallax = setupParallaxEffect(customBoardState, settings)
```

Add to cleanup.

- [ ] **Step 5: Run tests and commit**

```bash
git add src/presentation/3d/camera.ts src/presentation/3d/camera.test.ts src/application/effects/onParallax.ts src/init.tsx
git commit -m "feat: implement parallax camera angle effect"
```

---

### Task 11: Hover Mode Animation

**Files:**
- Create: `src/presentation/3d/hoverAnimation.ts`
- Create: `src/application/effects/onHoverMode.ts`

Hover mode oscillates the camera position using `requestAnimationFrame`. The oscillation amplitude is scaled by the hover mode setting (off=0, small=1, large=2, super=3).

- [ ] **Step 1: Write hoverAnimation module**

Create `src/presentation/3d/hoverAnimation.ts`:

```typescript
import { render3D, type Canvas3DState } from './canvas'

const OSCILLATION_ANGLE = 1.95
const OSCILLATION_PERIOD_MS = 2000
const OSCILLATION_Y_ANGLE = 1.95
const OSCILLATION_Y_PERIOD_MS = 2500

export interface HoverAnimationState {
  animationId: number | null
  startTime: number | null
}

export function createHoverAnimationState(): HoverAnimationState {
  return { animationId: null, startTime: null }
}

export function startHoverAnimation(
  hoverState: HoverAnimationState,
  canvasState: Canvas3DState,
  getParams: () => { baseAngle: number; scale: number; isFlipped: boolean }
): void {
  if (hoverState.animationId !== null) return
  hoverState.startTime = performance.now()

  const animate = (timestamp: number) => {
    const params = getParams()
    if (params.scale === 0) {
      stopHoverAnimation(hoverState)
      return
    }

    const elapsed = timestamp - (hoverState.startTime ?? timestamp)
    const { baseAngle, scale, isFlipped } = params

    const oscillationX = Math.sin(elapsed / OSCILLATION_PERIOD_MS) * OSCILLATION_ANGLE * scale
    const angleX = baseAngle + oscillationX
    const angleRad = (angleX * Math.PI) / 180

    const distance = 15
    const y = Math.cos(angleRad) * distance
    const z = Math.sin(angleRad) * distance
    const zDirection = isFlipped ? 1 : -1

    canvasState.camera.position.set(0, y, z * zDirection)

    const oscillationZ = Math.sin(elapsed / OSCILLATION_Y_PERIOD_MS) * OSCILLATION_Y_ANGLE * scale
    const oscillationZRad = (oscillationZ * Math.PI) / 180
    canvasState.camera.position.x = Math.sin(oscillationZRad) * distance * 0.1 * scale

    canvasState.camera.up.set(0, 0, -1 * zDirection)
    canvasState.camera.lookAt(0, 0, 0)

    render3D(canvasState)
    hoverState.animationId = requestAnimationFrame(animate)
  }

  hoverState.animationId = requestAnimationFrame(animate)
}

export function stopHoverAnimation(hoverState: HoverAnimationState): void {
  if (hoverState.animationId !== null) {
    cancelAnimationFrame(hoverState.animationId)
    hoverState.animationId = null
  }
  hoverState.startTime = null
}
```

- [ ] **Step 2: Write onHoverMode effect**

Create `src/application/effects/onHoverMode.ts`:

```typescript
import { effect } from '@preact/signals-core'
import { querySelector } from '../../platform/dom'
import { updateCameraAngle } from '../../presentation/3d/camera'
import { render3D } from '../../presentation/3d/canvas'
import {
  type HoverAnimationState,
  createHoverAnimationState,
  startHoverAnimation,
  stopHoverAnimation,
} from '../../presentation/3d/hoverAnimation'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

const HOVER_SCALES: Record<string, number> = {
  off: 0,
  small: 1,
  large: 2,
  super: 3,
}

export function setupHoverModeEffect(
  customBoardState: CustomBoardState,
  hoverState: HoverAnimationState,
  settings: SettingsStore
): () => void {
  return effect(() => {
    const mode = settings.hoverMode.value
    const scale = HOVER_SCALES[mode] ?? 0

    if (!customBoardState.canvas) {
      stopHoverAnimation(hoverState)
      return
    }

    if (scale > 0) {
      // Auto-enable parallax if at 0
      if (settings.parallax.value === 0) {
        settings.parallax.value = 40
      }
      startHoverAnimation(hoverState, customBoardState.canvas, () => {
        const coords = querySelector('coords')
        const isFlipped = coords?.classList.contains('black') ?? false
        return { baseAngle: settings.parallax.value, scale, isFlipped }
      })
    } else {
      stopHoverAnimation(hoverState)
      // Reset camera to static parallax angle
      const coords = querySelector('coords')
      const isFlipped = coords?.classList.contains('black') ?? false
      updateCameraAngle(customBoardState.canvas, settings.parallax.value, isFlipped)
      render3D(customBoardState.canvas)
    }
  })
}

export { createHoverAnimationState }
```

- [ ] **Step 3: Wire into init.tsx**

Add imports and setup:
```typescript
import { createHoverAnimationState, setupHoverModeEffect } from './application/effects/onHoverMode'
// ...
  const hoverState = createHoverAnimationState()
  const cleanupHover = setupHoverModeEffect(customBoardState, hoverState, settings)
```

- [ ] **Step 4: Commit**

```bash
git add src/presentation/3d/hoverAnimation.ts src/application/effects/onHoverMode.ts src/init.tsx
git commit -m "feat: implement hover mode camera oscillation animation"
```

---

### Task 12: Piece Style Effect

**Files:**
- Create: `src/application/effects/onPieceStyle.ts`

When piece style changes, clear all existing 3D pieces and recreate them with the new style.

- [ ] **Step 1: Write effect**

Create `src/application/effects/onPieceStyle.ts`:

```typescript
import { effect } from '@preact/signals-core'
import { querySelector } from '../../platform/dom'
import { render3D } from '../../presentation/3d/canvas'
import { clearAllPieces, updatePieces } from '../../presentation/3d/pieceManager'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export function setupPieceStyleEffect(
  customBoardState: CustomBoardState,
  settings: SettingsStore
): () => void {
  return effect(() => {
    settings.pieceStyle.value
    settings.obfuscationsEnabled.value
    if (!customBoardState.canvas) return

    const coords = querySelector('coords')
    const isFlipped = coords?.classList.contains('black') ?? false
    const style = settings.obfuscationsEnabled.value
      ? settings.pieceStyle.value
      : settings.pieceStyle.value === '3d' ? '3d' : 'icons'

    clearAllPieces(customBoardState.canvas, customBoardState.pieceManager)
    updatePieces(customBoardState.canvas, customBoardState.pieceManager, style, isFlipped, [])
    render3D(customBoardState.canvas)
  })
}
```

- [ ] **Step 2: Wire into init.tsx and commit**

```bash
git add src/application/effects/onPieceStyle.ts src/init.tsx
git commit -m "feat: implement piece style change effect"
```

---

### Task 13: Black Segments

**Files:**
- Create: `src/domain/chess/blackSegments.ts`
- Create: `src/domain/chess/blackSegments.test.ts`
- Create: `src/application/handlers/handleBlackSegments.ts`
- Create: `src/application/effects/onBlackSegments.ts`

Black segments blackout certain quadrants of the board and rotate which quadrants are blacked out on a timer.

- [ ] **Step 1: Write pure domain logic**

Create `src/domain/chess/blackSegments.ts`:

```typescript
export function getBlackedOutQuadrants(mode: string, counter: number): number[] {
  switch (mode) {
    case 'none':
      return []
    case '1/4':
      return [counter % 4]
    case '1/2':
      return [[0, 1], [2, 3], [0, 2], [1, 3]][counter % 4]
    case '3/4': {
      const visible = counter % 4
      return [0, 1, 2, 3].filter(q => q !== visible)
    }
    case '4/4':
      return [0, 1, 2, 3]
    default:
      return []
  }
}

export function getTimingMs(timing: string): number | null {
  switch (timing) {
    case 'rotate-10s':
      return 10000
    case 'rotate-30s':
      return 30000
    case 'rotate-60s':
      return 60000
    case 'dont-rotate':
      return null
    default:
      return null
  }
}
```

- [ ] **Step 2: Write test for domain logic**

Create `src/domain/chess/blackSegments.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import { getBlackedOutQuadrants, getTimingMs } from './blackSegments'

describe('getBlackedOutQuadrants', () => {
  it('returns empty for none', () => {
    expect(getBlackedOutQuadrants('none', 0)).toEqual([])
  })

  it('returns one quadrant for 1/4', () => {
    expect(getBlackedOutQuadrants('1/4', 0)).toEqual([0])
    expect(getBlackedOutQuadrants('1/4', 1)).toEqual([1])
    expect(getBlackedOutQuadrants('1/4', 4)).toEqual([0])
  })

  it('returns two quadrants for 1/2', () => {
    expect(getBlackedOutQuadrants('1/2', 0)).toEqual([0, 1])
    expect(getBlackedOutQuadrants('1/2', 1)).toEqual([2, 3])
  })

  it('returns three quadrants for 3/4', () => {
    expect(getBlackedOutQuadrants('3/4', 0)).toEqual([1, 2, 3])
    expect(getBlackedOutQuadrants('3/4', 1)).toEqual([0, 2, 3])
  })

  it('returns all quadrants for 4/4', () => {
    expect(getBlackedOutQuadrants('4/4', 0)).toEqual([0, 1, 2, 3])
  })
})

describe('getTimingMs', () => {
  it('returns correct milliseconds', () => {
    expect(getTimingMs('rotate-10s')).toBe(10000)
    expect(getTimingMs('rotate-30s')).toBe(30000)
    expect(getTimingMs('rotate-60s')).toBe(60000)
  })

  it('returns null for dont-rotate', () => {
    expect(getTimingMs('dont-rotate')).toBeNull()
  })
})
```

- [ ] **Step 3: Write handler for interval management**

Create `src/application/handlers/handleBlackSegments.ts`:

```typescript
import { getBlackedOutQuadrants, getTimingMs } from '../../domain/chess/blackSegments'
import { querySelector } from '../../platform/dom'
import { createBoardPlane } from '../../presentation/3d/boardPlane'
import { render3D } from '../../presentation/3d/canvas'
import { updatePieces } from '../../presentation/3d/pieceManager'
import type { CustomBoardState } from './handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export interface BlackSegmentsState {
  counter: number
  intervalId: ReturnType<typeof setInterval> | null
}

export function createBlackSegmentsState(): BlackSegmentsState {
  return { counter: 0, intervalId: null }
}

export function startBlackSegmentsInterval(
  segState: BlackSegmentsState,
  customBoardState: CustomBoardState,
  settings: SettingsStore
): void {
  stopBlackSegmentsInterval(segState)

  const timingMs = getTimingMs(settings.blackSegmentsTiming.value)
  if (timingMs === null) return

  segState.intervalId = setInterval(() => {
    segState.counter++
    updateBlackSegments(segState, customBoardState, settings)
  }, timingMs)
}

export function stopBlackSegmentsInterval(segState: BlackSegmentsState): void {
  if (segState.intervalId !== null) {
    clearInterval(segState.intervalId)
    segState.intervalId = null
  }
}

export function updateBlackSegments(
  segState: BlackSegmentsState,
  customBoardState: CustomBoardState,
  settings: SettingsStore
): void {
  if (!customBoardState.canvas) return

  const quadrants = getBlackedOutQuadrants(settings.blackSegments.value, segState.counter)

  // Rebuild board plane with new black segments
  const existingBoard = customBoardState.canvas.scene.getObjectByName(customBoardState.boardPlaneName)
  if (existingBoard) {
    customBoardState.canvas.scene.remove(existingBoard)
  }
  const newBoard = createBoardPlane(quadrants)
  newBoard.name = customBoardState.boardPlaneName
  customBoardState.canvas.scene.add(newBoard)

  // Update piece visibility
  const coords = querySelector('coords')
  const isFlipped = coords?.classList.contains('black') ?? false
  const style = settings.obfuscationsEnabled.value ? settings.pieceStyle.value : 'icons'
  updatePieces(customBoardState.canvas, customBoardState.pieceManager, style, isFlipped, quadrants)

  render3D(customBoardState.canvas)
}
```

- [ ] **Step 4: Write effect**

Create `src/application/effects/onBlackSegments.ts`:

```typescript
import { effect } from '@preact/signals-core'
import {
  type BlackSegmentsState,
  startBlackSegmentsInterval,
  stopBlackSegmentsInterval,
  updateBlackSegments,
} from '../handlers/handleBlackSegments'
import type { CustomBoardState } from '../handlers/handleCustomBoard'
import type { SettingsStore } from '../settings/settingsStore'

export function setupBlackSegmentsEffect(
  segState: BlackSegmentsState,
  customBoardState: CustomBoardState,
  settings: SettingsStore
): () => void {
  return effect(() => {
    const mode = settings.blackSegments.value
    const timing = settings.blackSegmentsTiming.value
    const obfuscationsEnabled = settings.obfuscationsEnabled.value

    if (!obfuscationsEnabled || mode === 'none' || !customBoardState.canvas) {
      stopBlackSegmentsInterval(segState)
      if (customBoardState.canvas) {
        updateBlackSegments(segState, customBoardState, settings)
      }
      return
    }

    updateBlackSegments(segState, customBoardState, settings)
    startBlackSegmentsInterval(segState, customBoardState, settings)
  })
}
```

- [ ] **Step 5: Wire into init.tsx**

Add imports and state:
```typescript
import { createBlackSegmentsState } from './application/handlers/handleBlackSegments'
import { setupBlackSegmentsEffect } from './application/effects/onBlackSegments'
// ...
  const blackSegmentsState = createBlackSegmentsState()
  const cleanupBlackSegments = setupBlackSegmentsEffect(blackSegmentsState, customBoardState, settings)
```

- [ ] **Step 6: Run tests and commit**

```bash
git add src/domain/chess/blackSegments.ts src/domain/chess/blackSegments.test.ts src/application/handlers/handleBlackSegments.ts src/application/effects/onBlackSegments.ts src/init.tsx
git commit -m "feat: implement black segments with rotation timer"
```

---

### Task 14: 3D Drawing Commands

**Files:**
- Create: `src/presentation/3d/drawings3d.ts`
- Modify: `src/application/handlers/handleDrawCommand.ts`

When custom board is enabled, drawing commands render as 3D objects (torus for circles, cylinder+cone for arrows) instead of 2D SVG.

- [ ] **Step 1: Write 3D drawings module**

Create `src/presentation/3d/drawings3d.ts`:

```typescript
import { THREE } from '../../platform/three'
import type { Canvas3DState } from './canvas'
import { render3D } from './canvas'
import type { DrawAnnotation } from '../../domain/commands/commandParser'

const DRAWING_COLOR = 0xff6b6b

export interface Drawings3DState {
  objects: THREE.Object3D[]
}

export function createDrawings3DState(): Drawings3DState {
  return { objects: [] }
}

function squareTo3DCoords(square: string): { x: number; z: number } {
  const fileIndex = square.charCodeAt(0) - 'a'.charCodeAt(0)
  const rankIndex = Number.parseInt(square[1]) - 1
  return { x: 3.5 - fileIndex, z: rankIndex - 3.5 }
}

function create3DCircle(x: number, z: number): THREE.Mesh {
  const geometry = new THREE.TorusGeometry(0.35, 0.06, 8, 32)
  const material = new THREE.MeshStandardMaterial({
    color: DRAWING_COLOR,
    roughness: 0.5,
    metalness: 0.1,
  })
  const torus = new THREE.Mesh(geometry, material)
  torus.position.set(x, 0.05, z)
  torus.rotation.x = -Math.PI / 2
  return torus
}

function create3DArrow(x1: number, z1: number, x2: number, z2: number): THREE.Group {
  const group = new THREE.Group()
  const dx = x2 - x1
  const dz = z2 - z1
  const length = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(-dx, -dz)

  const arrowHeadLength = 0.45
  const shaftLength = length - arrowHeadLength

  const shaftGeometry = new THREE.CylinderGeometry(0.07, 0.07, shaftLength, 8)
  const shaftMaterial = new THREE.MeshStandardMaterial({
    color: DRAWING_COLOR,
    roughness: 0.5,
    metalness: 0.1,
  })
  const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial)
  shaft.position.set(0, 0, -shaftLength / 2)
  shaft.rotation.x = Math.PI / 2
  group.add(shaft)

  const headGeometry = new THREE.ConeGeometry(0.22, arrowHeadLength, 8)
  const headMaterial = new THREE.MeshStandardMaterial({
    color: DRAWING_COLOR,
    roughness: 0.5,
    metalness: 0.1,
  })
  const head = new THREE.Mesh(headGeometry, headMaterial)
  head.position.set(0, 0, -(shaftLength + arrowHeadLength / 2))
  head.rotation.x = -Math.PI / 2
  group.add(head)

  group.position.set(x1, 0.08, z1)
  group.rotation.y = angle

  return group
}

export function draw3DAnnotations(
  canvasState: Canvas3DState,
  drawingsState: Drawings3DState,
  annotations: DrawAnnotation[]
): void {
  clear3DDrawings(canvasState, drawingsState)

  for (const annotation of annotations) {
    if (annotation.type === 'circle') {
      const coords = squareTo3DCoords(annotation.square)
      const circle = create3DCircle(coords.x, coords.z)
      canvasState.scene.add(circle)
      drawingsState.objects.push(circle)
    } else if (annotation.type === 'arrow') {
      const from = squareTo3DCoords(annotation.from)
      const to = squareTo3DCoords(annotation.to)
      const arrow = create3DArrow(from.x, from.z, to.x, to.z)
      canvasState.scene.add(arrow)
      drawingsState.objects.push(arrow)
    }
  }

  render3D(canvasState)
}

export function clear3DDrawings(
  canvasState: Canvas3DState,
  drawingsState: Drawings3DState
): void {
  for (const obj of drawingsState.objects) {
    canvasState.scene.remove(obj)
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry?.dispose()
        if (child.material instanceof THREE.Material) {
          child.material.dispose()
        }
      }
    })
  }
  drawingsState.objects = []
}
```

- [ ] **Step 2: Update handleDrawCommand to dispatch to 2D or 3D**

Replace `src/application/handlers/handleDrawCommand.ts`:

```typescript
import { parseDrawCommand } from '../../domain/commands/commandParser'
import {
  type AnnotationsState,
  drawAnnotations,
} from '../../presentation/non-preact-components/annotations'
import {
  type Drawings3DState,
  draw3DAnnotations,
} from '../../presentation/3d/drawings3d'
import type { CustomBoardState } from './handleCustomBoard'

export function handleDrawCommand(
  command: string,
  annotationsState: AnnotationsState,
  customBoardState: CustomBoardState,
  drawings3DState: Drawings3DState
): void {
  const annotations = parseDrawCommand(command)

  if (customBoardState.canvas) {
    draw3DAnnotations(customBoardState.canvas, drawings3DState, annotations)
  } else {
    drawAnnotations(annotationsState, annotations)
  }
}
```

- [ ] **Step 3: Update handleDrawCommand.test.ts and keyboardInput.ts for new signature**

Update the test and wiring to pass the additional `customBoardState` and `drawings3DState` parameters.

- [ ] **Step 4: Wire drawings3DState into init.tsx**

```typescript
import { createDrawings3DState } from './presentation/3d/drawings3d'
// ...
  const drawings3DState = createDrawings3DState()
```

Pass to `setupKeyboardCommands`.

- [ ] **Step 5: Run all tests and commit**

```bash
git add src/presentation/3d/drawings3d.ts src/application/handlers/handleDrawCommand.ts src/application/handlers/handleDrawCommand.test.ts src/application/input/keyboardInput.ts src/init.tsx
git commit -m "feat: implement 3D drawing annotations (circles and arrows)"
```

---

## Integration: Final init.tsx Wiring

### Task 15: Final Integration and Cleanup

- [ ] **Step 1: Review init.tsx has all effects wired**

The final `init.tsx` should have these effects in order:
1. `setupDividersEffect` (existing)
2. `setupFlashEffect` (Task 2)
3. `setupBlurEffect` (Task 3)
4. `setupCustomBoardEffect` (Task 9)
5. `setupParallaxEffect` (Task 10)
6. `setupHoverModeEffect` (Task 11)
7. `setupPieceStyleEffect` (Task 12)
8. `setupBlackSegmentsEffect` (Task 13)

- [ ] **Step 2: Run full test suite**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: Builds successfully

- [ ] **Step 5: Commit any integration fixes**

```bash
git add -A
git commit -m "feat: complete integration of all remaining features"
```

---

## Verification

### Manual Testing Checklist

After all tasks complete, test on lichess.org:

1. **Annotations:** Type `-e4` in move input → red circle appears on e4. Type `-e2e4` → arrow appears.
2. **Flash mode:** Enable flash mode → board goes black, flashes briefly every N seconds. Make a move → triggers flash.
3. **Blur:** Enable custom board + obfuscations, increase blur → board becomes blurry.
4. **Custom board:** Enable custom board → 3D canvas appears, pieces rendered.
5. **Parallax:** Change parallax → camera tilts.
6. **Hover mode:** Enable hover → camera oscillates.
7. **Piece styles:** Cycle through icons/3d/checker/checker-grey/blindfold.
8. **Black segments:** Enable → quadrants go black, rotate on timer.
9. **3D annotations:** With custom board on, type `-e4` → 3D torus appears.

---

## Self-Review Checklist

**Spec Coverage:**
- ✓ Annotations wiring from keyboard (Task 1)
- ✓ Flash mode interval loop (Task 2)
- ✓ Blur CSS filter (Task 3)
- ✓ 3D coordinate conversion (Task 4)
- ✓ Piece geometries (Task 5)
- ✓ Piece mesh by style (Task 6)
- ✓ Board plane with black segments (Task 7)
- ✓ Piece manager (Task 8)
- ✓ Custom board init/destroy (Task 9)
- ✓ Parallax camera (Task 10)
- ✓ Hover animation (Task 11)
- ✓ Piece style effect (Task 12)
- ✓ Black segments with timer (Task 13)
- ✓ 3D drawings (Task 14)
- ✓ Integration (Task 15)

**Placeholder Scan:** No TBD/TODO/placeholder content found.

**Type Consistency:**
- `Canvas3DState` used consistently from `presentation/3d/canvas.ts`
- `CustomBoardState` defined in `handleCustomBoard.ts`, referenced everywhere
- `PieceManagerState` from `pieceManager.ts`
- `SettingsStore` from `application/settings/settingsStore.ts`
- `DrawAnnotation` from `domain/commands/commandParser.ts`
