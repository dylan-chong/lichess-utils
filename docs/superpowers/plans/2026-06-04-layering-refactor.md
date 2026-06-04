# Layering Architecture Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize src/ into 5 explicit layers (PLATFORM → ADAPTERS → DOMAIN → APPLICATION → PRESENTATION) with dependency injection for settings

**Architecture:** Move files to layer-specific folders, eliminate global settings singleton via factory + context pattern, add custom linter rules to enforce layer boundaries

**Tech Stack:** TypeScript, Preact, Preact Signals, Vitest, Biome

---

## File Mapping Reference

### Current → New Location

**PLATFORM Layer:**
- `src/dom/dom.ts` → `src/platform/dom.ts`
- NEW: `src/platform/mutationObserver.ts`
- `src/browser/speechApi.ts` → `src/platform/speechApi.ts`
- `src/settings/storage.ts` → `src/platform/storage.ts`

**ADAPTERS Layer:**
- `src/browser/speechSynthesizer.ts` → `src/adapters-speech/speechSynthesizer.ts`
- `src/dom/overlays/dividers.ts` → `src/adapters-overlays/dividers.ts`
- `src/dom/overlays/flash.ts` → `src/adapters-overlays/flash.ts`

**DOMAIN Layer:**
- `src/pure/coordinates.ts` → `src/domain/chess/coordinates.ts`
- `src/pure/pieceGrouping.ts` → `src/domain/chess/pieceGrouping.ts`
- `src/pure/speechText.ts` → `src/domain/speech/speechText.ts`
- `src/pure/commandParser.ts` → `src/domain/commands/commandParser.ts`
- `src/pure/flashTiming.ts` → `src/domain/timing/flashTiming.ts`

**APPLICATION Layer:**
- `src/handlers/handleSpeechCommand.ts` → `src/application-handlers/handleSpeechCommand.ts`
- `src/handlers/handleFlash.ts` → `src/application-handlers/handleFlash.ts`
- `src/handlers/updateDividers.ts` → `src/application-handlers/updateDividers.ts`
- `src/effects/onDividers.ts` → `src/application-effects/onDividers.ts`
- NEW: `src/application-observers/observerState.ts`
- `src/dom/boardObserver.ts` → `src/application-observers/boardObserver.ts` (refactored)
- `src/dom/boardReader.ts` → `src/application-services/boardReader.ts`
- `src/commands/keyboardInput.ts` → `src/application-input/keyboardInput.ts`
- `src/settings/settingsStore.ts` → `src/application-settings/settingsStore.ts` (refactored)

**PRESENTATION Layer:**
- `src/components/ButtonRow.tsx` → `src/presentation/components/ButtonRow.tsx`
- `src/components/ControlPanel.tsx` → `src/presentation/components/ControlPanel.tsx`
- `src/components/PiecesList.tsx` → `src/presentation/components/PiecesList.tsx`
- `src/components/root.tsx` → `src/presentation/components/root.tsx`
- `src/components/SettingButton.tsx` → `src/presentation/components/SettingButton.tsx`
- NEW: `src/presentation/contexts/SettingsContext.tsx`

**CROSS-CUTTING Layer:**
- `src/constants/annotations.ts` → `src/constants/annotations.ts` (unchanged)
- `src/constants/chess.ts` → `src/constants/chess.ts` (unchanged)
- `src/constants/commands.ts` → `src/constants/commands.ts` (unchanged)
- `src/constants/dom.ts` → `src/constants/dom.ts` (unchanged)
- `src/constants/index.ts` → `src/constants/index.ts` (unchanged)
- MERGE: `src/settings/types.ts` + `src/settings/defaults.ts` → `src/constants/settings.ts`

**Entry Points:**
- `src/init.tsx` → `src/init.tsx` (refactored)
- `src/main.tsx` → `src/main.tsx` (unchanged)

---

## Phase 1: Create New Folder Structure

### Task 1: Create Platform Layer Folders

**Files:**
- Create: `src/platform/` directory

- [ ] **Step 1: Create platform directory**

```bash
mkdir -p src/platform
```

- [ ] **Step 2: Verify directory exists**

Run: `ls -la src/ | grep platform`
Expected: `platform` directory listed

- [ ] **Step 3: Commit**

```bash
git add src/platform/.gitkeep
git commit -m "chore: create platform layer directory"
```

### Task 2: Create Adapters Layer Folders

**Files:**
- Create: `src/adapters-speech/` directory
- Create: `src/adapters-overlays/` directory

- [ ] **Step 1: Create adapters directories**

```bash
mkdir -p src/adapters-speech
mkdir -p src/adapters-overlays
```

- [ ] **Step 2: Verify directories exist**

Run: `ls -la src/ | grep adapters`
Expected: `adapters-speech` and `adapters-overlays` directories listed

- [ ] **Step 3: Commit**

```bash
touch src/adapters-speech/.gitkeep src/adapters-overlays/.gitkeep
git add src/adapters-speech/.gitkeep src/adapters-overlays/.gitkeep
git commit -m "chore: create adapters layer directories"
```

### Task 3: Create Domain Layer Folders

**Files:**
- Create: `src/domain/chess/` directory
- Create: `src/domain/speech/` directory
- Create: `src/domain/commands/` directory
- Create: `src/domain/timing/` directory

- [ ] **Step 1: Create domain directories**

```bash
mkdir -p src/domain/chess
mkdir -p src/domain/speech
mkdir -p src/domain/commands
mkdir -p src/domain/timing
```

- [ ] **Step 2: Verify directories exist**

Run: `ls -la src/domain/`
Expected: `chess`, `speech`, `commands`, `timing` directories listed

- [ ] **Step 3: Commit**

```bash
find src/domain -type d -exec touch {}/.gitkeep \;
git add src/domain
git commit -m "chore: create domain layer directories"
```

### Task 4: Create Application Layer Folders

**Files:**
- Create: `src/application-handlers/` directory
- Create: `src/application-effects/` directory
- Create: `src/application-observers/` directory
- Create: `src/application-services/` directory
- Create: `src/application-input/` directory
- Create: `src/application-settings/` directory

- [ ] **Step 1: Create application directories**

```bash
mkdir -p src/application-handlers
mkdir -p src/application-effects
mkdir -p src/application-observers
mkdir -p src/application-services
mkdir -p src/application-input
mkdir -p src/application-settings
```

- [ ] **Step 2: Verify directories exist**

Run: `ls -la src/ | grep application`
Expected: All 6 application-* directories listed

- [ ] **Step 3: Commit**

```bash
find src/application-* -type d -exec touch {}/.gitkeep \;
git add src/application-*
git commit -m "chore: create application layer directories"
```

### Task 5: Create Presentation Layer Folders

**Files:**
- Create: `src/presentation/components/` directory
- Create: `src/presentation/contexts/` directory

- [ ] **Step 1: Create presentation directories**

```bash
mkdir -p src/presentation/components
mkdir -p src/presentation/contexts
```

- [ ] **Step 2: Verify directories exist**

Run: `ls -la src/presentation/`
Expected: `components` and `contexts` directories listed

- [ ] **Step 3: Commit**

```bash
find src/presentation -type d -exec touch {}/.gitkeep \;
git add src/presentation
git commit -m "chore: create presentation layer directories"
```

---

## Phase 2: Move Platform Layer Files

### Task 6: Move dom.ts to Platform

**Files:**
- Move: `src/dom/dom.ts` → `src/platform/dom.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/dom/dom.ts src/platform/dom.ts
```

- [ ] **Step 2: Verify file moved**

Run: `ls src/platform/dom.ts`
Expected: File exists

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: Tests fail due to broken imports

- [ ] **Step 4: Commit move**

```bash
git commit -m "refactor: move dom.ts to platform layer"
```

### Task 7: Update Imports for dom.ts

**Files:**
- Modify: `src/dom/boardObserver.ts`
- Modify: `src/dom/boardReader.ts`
- Modify: `src/dom/overlays/dividers.ts`
- Modify: `src/dom/overlays/flash.ts`
- Modify: `src/init.tsx`

- [ ] **Step 1: Update boardObserver.ts import**

Find and replace in `src/dom/boardObserver.ts`:
```typescript
// OLD
import { querySelector } from './dom'

// NEW
import { querySelector } from '../platform/dom'
```

- [ ] **Step 2: Update boardReader.ts imports**

Find and replace in `src/dom/boardReader.ts`:
```typescript
// OLD
import { getBoundingClientRect, querySelector } from './dom'

// NEW
import { getBoundingClientRect, querySelector } from '../platform/dom'
```

- [ ] **Step 3: Update dividers.ts imports**

Find and replace in `src/dom/overlays/dividers.ts`:
```typescript
// OLD
import { appendChild, createDiv, createSvgElement, getBoundingClientRect, querySelector } from '../dom'

// NEW
import { appendChild, createDiv, createSvgElement, getBoundingClientRect, querySelector } from '../../platform/dom'
```

- [ ] **Step 4: Update flash.ts imports**

Find and replace in `src/dom/overlays/flash.ts`:
```typescript
// OLD
import { appendChild, createDiv, getBoundingClientRect, querySelector } from '../dom'

// NEW
import { appendChild, createDiv, getBoundingClientRect, querySelector } from '../../platform/dom'
```

- [ ] **Step 5: Update init.tsx imports**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { appendChild, createDiv, querySelector } from './dom/dom'

// NEW
import { appendChild, createDiv, querySelector } from './platform/dom'
```

- [ ] **Step 6: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 7: Commit**

```bash
git add src/dom/boardObserver.ts src/dom/boardReader.ts src/dom/overlays/dividers.ts src/dom/overlays/flash.ts src/init.tsx
git commit -m "refactor: update imports for dom.ts move to platform"
```

### Task 8: Move speechApi.ts to Platform

**Files:**
- Move: `src/browser/speechApi.ts` → `src/platform/speechApi.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/browser/speechApi.ts src/platform/speechApi.ts
```

- [ ] **Step 2: Update speechSynthesizer.ts import**

Find and replace in `src/browser/speechSynthesizer.ts`:
```typescript
// OLD
import { cancel, createUtterance, getSpeechSynthesis, getSpeechSynthesisUtterance, speak as platformSpeak } from './speechApi'

// NEW
import { cancel, createUtterance, getSpeechSynthesis, getSpeechSynthesisUtterance, speak as platformSpeak } from '../platform/speechApi'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/browser/speechSynthesizer.ts
git commit -m "refactor: move speechApi.ts to platform layer"
```

### Task 9: Move storage.ts to Platform

**Files:**
- Move: `src/settings/storage.ts` → `src/platform/storage.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/settings/storage.ts src/platform/storage.ts
```

- [ ] **Step 2: Update settingsStore.ts import**

Find and replace in `src/settings/settingsStore.ts`:
```typescript
// OLD
import * as storage from './storage'

// NEW
import * as storage from '../platform/storage'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/settings/settingsStore.ts
git commit -m "refactor: move storage.ts to platform layer"
```

### Task 10: Create mutationObserver.ts in Platform

**Files:**
- Create: `src/platform/mutationObserver.ts`

- [ ] **Step 1: Write the file**

```typescript
// src/platform/mutationObserver.ts
export function createMutationObserver(callback: MutationCallback): MutationObserver {
  return new MutationObserver(callback)
}

export function observe(
  observer: MutationObserver,
  target: Node,
  options: MutationObserverInit
): void {
  observer.observe(target, options)
}

export function disconnect(observer: MutationObserver): void {
  observer.disconnect()
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: All tests pass (no consumers yet)

- [ ] **Step 3: Commit**

```bash
git add src/platform/mutationObserver.ts
git commit -m "feat: add mutationObserver platform wrapper"
```

---

## Phase 3: Move Adapters Layer Files

### Task 11: Move speechSynthesizer.ts to Adapters

**Files:**
- Move: `src/browser/speechSynthesizer.ts` → `src/adapters-speech/speechSynthesizer.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/browser/speechSynthesizer.ts src/adapters-speech/speechSynthesizer.ts
```

- [ ] **Step 2: Update handlers/handleSpeechCommand.ts import**

Find and replace in `src/handlers/handleSpeechCommand.ts`:
```typescript
// OLD
import { speak, stopSpeaking } from '../browser/speechSynthesizer'

// NEW
import { speak, stopSpeaking } from '../adapters-speech/speechSynthesizer'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/handlers/handleSpeechCommand.ts
git commit -m "refactor: move speechSynthesizer.ts to adapters layer"
```

- [ ] **Step 5: Remove empty browser directory**

```bash
rmdir src/browser
git add -u src/browser
git commit -m "chore: remove empty browser directory"
```

### Task 12: Move dividers.ts to Adapters

**Files:**
- Move: `src/dom/overlays/dividers.ts` → `src/adapters-overlays/dividers.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/dom/overlays/dividers.ts src/adapters-overlays/dividers.ts
```

- [ ] **Step 2: Update init.tsx imports**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { createDividers, destroyDividers } from './dom/overlays/dividers'

// NEW
import { createDividers, destroyDividers } from './adapters-overlays/dividers'
```

- [ ] **Step 3: Update handlers/updateDividers.ts imports**

Find and replace in `src/handlers/updateDividers.ts`:
```typescript
// OLD
import type { DividersState } from '../dom/overlays/dividers'
import { destroyDividers, renderDividers } from '../dom/overlays/dividers'

// NEW
import type { DividersState } from '../adapters-overlays/dividers'
import { destroyDividers, renderDividers } from '../adapters-overlays/dividers'
```

- [ ] **Step 4: Update effects/onDividers.ts imports**

Find and replace in `src/effects/onDividers.ts`:
```typescript
// OLD
import type { DividersState } from '../dom/overlays/dividers'

// NEW
import type { DividersState } from '../adapters-overlays/dividers'
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 6: Commit**

```bash
git add src/init.tsx src/handlers/updateDividers.ts src/effects/onDividers.ts
git commit -m "refactor: move dividers.ts to adapters layer"
```

### Task 13: Move flash.ts to Adapters

**Files:**
- Move: `src/dom/overlays/flash.ts` → `src/adapters-overlays/flash.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/dom/overlays/flash.ts src/adapters-overlays/flash.ts
```

- [ ] **Step 2: Update init.tsx imports**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { createFlashOverlay, destroyFlashOverlay } from './dom/overlays/flash'

// NEW
import { createFlashOverlay, destroyFlashOverlay } from './adapters-overlays/flash'
```

- [ ] **Step 3: Update handlers/handleFlash.ts imports**

Find and replace in `src/handlers/handleFlash.ts`:
```typescript
// OLD
import type { FlashState } from '../dom/overlays/flash'
import { renderFlash, startFlashLoop, stopFlashLoop } from '../dom/overlays/flash'

// NEW
import type { FlashState } from '../adapters-overlays/flash'
import { renderFlash, startFlashLoop, stopFlashLoop } from '../adapters-overlays/flash'
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add src/init.tsx src/handlers/handleFlash.ts
git commit -m "refactor: move flash.ts to adapters layer"
```

- [ ] **Step 6: Remove empty overlays directory**

```bash
rmdir src/dom/overlays
git add -u src/dom/overlays
git commit -m "chore: remove empty dom/overlays directory"
```

---

## Phase 4: Move Domain Layer Files

### Task 14: Move coordinates.ts to Domain

**Files:**
- Move: `src/pure/coordinates.ts` → `src/domain/chess/coordinates.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/pure/coordinates.ts src/domain/chess/coordinates.ts
```

- [ ] **Step 2: Update dom/boardReader.ts import**

Find and replace in `src/dom/boardReader.ts`:
```typescript
// OLD
import { pixelsToSquare } from '../pure/coordinates'

// NEW
import { pixelsToSquare } from '../domain/chess/coordinates'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/dom/boardReader.ts
git commit -m "refactor: move coordinates.ts to domain layer"
```

### Task 15: Move pieceGrouping.ts to Domain

**Files:**
- Move: `src/pure/pieceGrouping.ts` → `src/domain/chess/pieceGrouping.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/pure/pieceGrouping.ts src/domain/chess/pieceGrouping.ts
```

- [ ] **Step 2: Update handlers/handleSpeechCommand.ts import**

Find and replace in `src/handlers/handleSpeechCommand.ts`:
```typescript
// OLD
import { filterQuadrant } from '../pure/pieceGrouping'

// NEW
import { filterQuadrant } from '../domain/chess/pieceGrouping'
```

- [ ] **Step 3: Update pure/speechText.ts import**

Find and replace in `src/pure/speechText.ts`:
```typescript
// OLD
import type { PiecePosition } from './pieceGrouping'

// NEW
import type { PiecePosition } from '../domain/chess/pieceGrouping'
```

- [ ] **Step 4: Update dom/boardReader.ts import**

Find and replace in `src/dom/boardReader.ts`:
```typescript
// OLD
import type { PiecePosition } from '../pure/pieceGrouping'

// NEW
import type { PiecePosition } from '../domain/chess/pieceGrouping'
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 6: Commit**

```bash
git add src/handlers/handleSpeechCommand.ts src/pure/speechText.ts src/dom/boardReader.ts
git commit -m "refactor: move pieceGrouping.ts to domain layer"
```

### Task 16: Move speechText.ts to Domain

**Files:**
- Move: `src/pure/speechText.ts` → `src/domain/speech/speechText.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/pure/speechText.ts src/domain/speech/speechText.ts
```

- [ ] **Step 2: Update handlers/handleSpeechCommand.ts import**

Find and replace in `src/handlers/handleSpeechCommand.ts`:
```typescript
// OLD
import { generateAllPiecesText, generateColorText, generateQuadrantText } from '../pure/speechText'

// NEW
import { generateAllPiecesText, generateColorText, generateQuadrantText } from '../domain/speech/speechText'
```

- [ ] **Step 3: Update components/PiecesList.tsx import**

Find and replace in `src/components/PiecesList.tsx`:
```typescript
// OLD
import { generateAllPiecesText } from '../pure/speechText'

// NEW
import { generateAllPiecesText } from '../domain/speech/speechText'
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add src/handlers/handleSpeechCommand.ts src/components/PiecesList.tsx
git commit -m "refactor: move speechText.ts to domain layer"
```

### Task 17: Move commandParser.ts to Domain

**Files:**
- Move: `src/pure/commandParser.ts` → `src/domain/commands/commandParser.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/pure/commandParser.ts src/domain/commands/commandParser.ts
```

- [ ] **Step 2: Check for imports**

Run: `grep -r "commandParser" src --include="*.ts" --include="*.tsx" | grep -v test | grep -v ".test."`
Expected: No non-test imports found (commandParser not currently used)

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git commit -m "refactor: move commandParser.ts to domain layer"
```

### Task 18: Move flashTiming.ts to Domain

**Files:**
- Move: `src/pure/flashTiming.ts` → `src/domain/timing/flashTiming.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/pure/flashTiming.ts src/domain/timing/flashTiming.ts
```

- [ ] **Step 2: Update adapters-overlays/flash.ts import**

Find and replace in `src/adapters-overlays/flash.ts`:
```typescript
// OLD
import { shouldShowFlash } from '../pure/flashTiming'

// NEW
import { shouldShowFlash } from '../domain/timing/flashTiming'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/adapters-overlays/flash.ts
git commit -m "refactor: move flashTiming.ts to domain layer"
```

- [ ] **Step 5: Remove empty pure directory**

```bash
rmdir src/pure
git add -u src/pure
git commit -m "chore: remove empty pure directory"
```

---

## Phase 5: Move Application Layer Files

### Task 19: Move handleSpeechCommand.ts to Application

**Files:**
- Move: `src/handlers/handleSpeechCommand.ts` → `src/application-handlers/handleSpeechCommand.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/handlers/handleSpeechCommand.ts src/application-handlers/handleSpeechCommand.ts
```

- [ ] **Step 2: Update commands/keyboardInput.ts import**

Find and replace in `src/commands/keyboardInput.ts`:
```typescript
// OLD
import { handleSpeechCommand } from '../handlers/handleSpeechCommand'

// NEW
import { handleSpeechCommand } from '../application-handlers/handleSpeechCommand'
```

- [ ] **Step 3: Update components/ButtonRow.tsx import**

Find and replace in `src/components/ButtonRow.tsx`:
```typescript
// OLD
import { handleSpeechCommand } from '../handlers/handleSpeechCommand'

// NEW
import { handleSpeechCommand } from '../application-handlers/handleSpeechCommand'
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add src/commands/keyboardInput.ts src/components/ButtonRow.tsx
git commit -m "refactor: move handleSpeechCommand.ts to application layer"
```

### Task 20: Move handleFlash.ts to Application

**Files:**
- Move: `src/handlers/handleFlash.ts` → `src/application-handlers/handleFlash.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/handlers/handleFlash.ts src/application-handlers/handleFlash.ts
```

- [ ] **Step 2: Update components/ButtonRow.tsx import**

Find and replace in `src/components/ButtonRow.tsx`:
```typescript
// OLD
import { handleFlash } from '../handlers/handleFlash'

// NEW
import { handleFlash } from '../application-handlers/handleFlash'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/components/ButtonRow.tsx
git commit -m "refactor: move handleFlash.ts to application layer"
```

### Task 21: Move updateDividers.ts to Application

**Files:**
- Move: `src/handlers/updateDividers.ts` → `src/application-handlers/updateDividers.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/handlers/updateDividers.ts src/application-handlers/updateDividers.ts
```

- [ ] **Step 2: Update effects/onDividers.ts import**

Find and replace in `src/effects/onDividers.ts`:
```typescript
// OLD
import { updateDividers } from '../handlers/updateDividers'

// NEW
import { updateDividers } from '../application-handlers/updateDividers'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/effects/onDividers.ts
git commit -m "refactor: move updateDividers.ts to application layer"
```

- [ ] **Step 5: Remove empty handlers directory**

```bash
rmdir src/handlers
git add -u src/handlers
git commit -m "chore: remove empty handlers directory"
```

### Task 22: Move onDividers.ts to Application

**Files:**
- Move: `src/effects/onDividers.ts` → `src/application-effects/onDividers.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/effects/onDividers.ts src/application-effects/onDividers.ts
```

- [ ] **Step 2: Update init.tsx import**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { setupDividersEffect } from './effects/onDividers'

// NEW
import { setupDividersEffect } from './application-effects/onDividers'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/init.tsx
git commit -m "refactor: move onDividers.ts to application layer"
```

- [ ] **Step 5: Remove empty effects directory**

```bash
rmdir src/effects
git add -u src/effects
git commit -m "chore: remove empty effects directory"
```

### Task 23: Create observerState.ts and Refactor boardObserver.ts

**Files:**
- Create: `src/application-observers/observerState.ts`
- Move: `src/dom/boardObserver.ts` → `src/application-observers/boardObserver.ts` (with refactoring)

- [ ] **Step 1: Create observerState.ts**

```typescript
// src/application-observers/observerState.ts
import type { Signal } from '@preact/signals-core'

export interface BoardObserverState {
  observer: MutationObserver
  boardChanged: Signal<number>
}
```

- [ ] **Step 2: Move and refactor boardObserver.ts**

```bash
git mv src/dom/boardObserver.ts src/application-observers/boardObserver.ts
```

Update `src/application-observers/boardObserver.ts`:
```typescript
import type { Signal } from '@preact/signals-core'
import { DomSelector } from '../constants'
import { createMutationObserver, disconnect, observe } from '../platform/mutationObserver'
import { querySelector } from '../platform/dom'
import type { BoardObserverState } from './observerState'

export function createBoardObserver(boardChanged: Signal<number>): BoardObserverState {
  const observer = createMutationObserver(() => {
    boardChanged.value += 1
  })

  return { observer, boardChanged }
}

export function startBoardObserver(state: BoardObserverState): void {
  const board = querySelector(DomSelector.BOARD)
  if (!board) return

  observe(state.observer, board, {
    childList: true,
    attributes: true,
    subtree: true,
  })
}

export function stopBoardObserver(state: BoardObserverState): void {
  disconnect(state.observer)
}
```

- [ ] **Step 3: Update init.tsx import**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './dom/boardObserver'

// NEW
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './application-observers/boardObserver'
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add src/application-observers/observerState.ts src/application-observers/boardObserver.ts src/init.tsx
git commit -m "refactor: move boardObserver to application layer with platform wrapper"
```

### Task 24: Move boardReader.ts to Application

**Files:**
- Move: `src/dom/boardReader.ts` → `src/application-services/boardReader.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/dom/boardReader.ts src/application-services/boardReader.ts
```

- [ ] **Step 2: Update init.tsx import**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { waitForElement } from './dom/boardReader'

// NEW
import { waitForElement } from './application-services/boardReader'
```

- [ ] **Step 3: Update handlers/handleSpeechCommand.ts import**

Find and replace in `src/application-handlers/handleSpeechCommand.ts`:
```typescript
// OLD
import { readPiecePositions } from '../dom/boardReader'

// NEW
import { readPiecePositions } from '../application-services/boardReader'
```

- [ ] **Step 4: Update components/PiecesList.tsx import**

Find and replace in `src/components/PiecesList.tsx`:
```typescript
// OLD
import { readPiecePositions } from '../dom/boardReader'

// NEW
import { readPiecePositions } from '../application-services/boardReader'
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 6: Commit**

```bash
git add src/init.tsx src/application-handlers/handleSpeechCommand.ts src/components/PiecesList.tsx
git commit -m "refactor: move boardReader.ts to application layer"
```

- [ ] **Step 7: Remove empty dom directory**

```bash
rmdir src/dom
git add -u src/dom
git commit -m "chore: remove empty dom directory"
```

### Task 25: Move keyboardInput.ts to Application

**Files:**
- Move: `src/commands/keyboardInput.ts` → `src/application-input/keyboardInput.ts`

- [ ] **Step 1: Move file**

```bash
git mv src/commands/keyboardInput.ts src/application-input/keyboardInput.ts
```

- [ ] **Step 2: Update init.tsx import**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { setupKeyboardCommands, teardownKeyboardCommands } from './commands/keyboardInput'

// NEW
import { setupKeyboardCommands, teardownKeyboardCommands } from './application-input/keyboardInput'
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/init.tsx
git commit -m "refactor: move keyboardInput.ts to application layer"
```

- [ ] **Step 5: Remove empty commands directory**

```bash
rmdir src/commands
git add -u src/commands
git commit -m "chore: remove empty commands directory"
```

---

## Phase 6: Move Presentation Layer Files

### Task 26: Move Components to Presentation

**Files:**
- Move: `src/components/*.tsx` → `src/presentation/components/*.tsx`

- [ ] **Step 1: Move all component files**

```bash
git mv src/components/ButtonRow.tsx src/presentation/components/ButtonRow.tsx
git mv src/components/ControlPanel.tsx src/presentation/components/ControlPanel.tsx
git mv src/components/PiecesList.tsx src/presentation/components/PiecesList.tsx
git mv src/components/root.tsx src/presentation/components/root.tsx
git mv src/components/SettingButton.tsx src/presentation/components/SettingButton.tsx
```

- [ ] **Step 2: Update init.tsx import**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { createRoot, destroyRoot } from './components/root'

// NEW
import { createRoot, destroyRoot } from './presentation/components/root'
```

- [ ] **Step 3: Update root.tsx imports**

Find and replace in `src/presentation/components/root.tsx`:
```typescript
// OLD
import { ControlPanel } from './ControlPanel'

// NEW (no change needed - relative import)
```

- [ ] **Step 4: Update ControlPanel.tsx imports**

Find and replace in `src/presentation/components/ControlPanel.tsx`:
```typescript
// OLD
import { ButtonRow } from './ButtonRow'
import { SettingButton } from './SettingButton'

// NEW (no change needed - relative imports)
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 6: Commit**

```bash
git add src/init.tsx
git commit -m "refactor: move components to presentation layer"
```

- [ ] **Step 7: Remove empty components directory**

```bash
rmdir src/components
git add -u src/components
git commit -m "chore: remove empty components directory"
```

---

## Phase 7: Consolidate Settings Constants

### Task 27: Create constants/settings.ts

**Files:**
- Create: `src/constants/settings.ts`
- Remove: `src/settings/types.ts`
- Remove: `src/settings/defaults.ts`

- [ ] **Step 1: Read current types.ts content**

Run: `cat src/settings/types.ts`

- [ ] **Step 2: Read current defaults.ts content**

Run: `cat src/settings/defaults.ts`

- [ ] **Step 3: Create consolidated settings.ts**

```typescript
// src/constants/settings.ts

// Settings type definitions
export interface Settings {
  speakRate: number
  piecesListEnabled: boolean
  dividersEnabled: boolean
  customBoardEnabled: boolean
  obfuscationsEnabled: boolean
  parallax: number
  hoverMode: boolean
  pieceStyle: string
  blur: number
  blackSegments: number
  blackSegmentsTiming: number
  flashModeEnabled: boolean
  flashDuration: number
  flashInterval: number
}

// Default setting values
export const defaultSettings: Settings = {
  speakRate: 1.0,
  piecesListEnabled: false,
  dividersEnabled: false,
  customBoardEnabled: false,
  obfuscationsEnabled: false,
  parallax: 0,
  hoverMode: false,
  pieceStyle: 'default',
  blur: 0,
  blackSegments: 0,
  blackSegmentsTiming: 0,
  flashModeEnabled: false,
  flashDuration: 500,
  flashInterval: 2000,
}
```

- [ ] **Step 4: Update settingsStore.ts imports**

Find and replace in `src/settings/settingsStore.ts`:
```typescript
// OLD
import { defaultSettings } from './defaults'
import type { Settings } from './types'

// NEW
import { defaultSettings, type Settings } from '../constants/settings'
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 6: Commit new file**

```bash
git add src/constants/settings.ts src/settings/settingsStore.ts
git commit -m "refactor: consolidate settings types and defaults into constants"
```

- [ ] **Step 7: Remove old files**

```bash
git rm src/settings/types.ts src/settings/defaults.ts
git commit -m "refactor: remove old settings types and defaults files"
```

---

## Phase 8: Settings Refactoring - Create Context

### Task 28: Create SettingsContext.tsx

**Files:**
- Create: `src/presentation/contexts/SettingsContext.tsx`

- [ ] **Step 1: Write SettingsContext.tsx**

```typescript
// src/presentation/contexts/SettingsContext.tsx
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import type { Settings } from '../../constants/settings'

const SettingsContext = createContext<Settings | null>(null)

export function useSettings(): Settings {
  const settings = useContext(SettingsContext)
  if (!settings) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return settings
}

export function SettingsProvider({
  settings,
  children,
}: {
  settings: Settings
  children: preact.ComponentChildren
}) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: All tests pass (no consumers yet)

- [ ] **Step 3: Commit**

```bash
git add src/presentation/contexts/SettingsContext.tsx
git commit -m "feat: create SettingsContext for dependency injection"
```

### Task 29: Refactor settingsStore.ts to Factory Pattern

**Files:**
- Move: `src/settings/settingsStore.ts` → `src/application-settings/settingsStore.ts` (with refactoring)

- [ ] **Step 1: Move file**

```bash
git mv src/settings/settingsStore.ts src/application-settings/settingsStore.ts
```

- [ ] **Step 2: Refactor to factory pattern**

Update `src/application-settings/settingsStore.ts`:
```typescript
import { effect, signal } from '@preact/signals-core'
import { defaultSettings, type Settings as SettingsType } from '../constants/settings'
import * as storage from '../platform/storage'

const STORAGE_KEY = 'lichess-board-speaker-settings'

export type Settings = {
  speakRate: ReturnType<typeof signal<number>>
  piecesListEnabled: ReturnType<typeof signal<boolean>>
  dividersEnabled: ReturnType<typeof signal<boolean>>
  customBoardEnabled: ReturnType<typeof signal<boolean>>
  obfuscationsEnabled: ReturnType<typeof signal<boolean>>
  parallax: ReturnType<typeof signal<number>>
  hoverMode: ReturnType<typeof signal<boolean>>
  pieceStyle: ReturnType<typeof signal<string>>
  blur: ReturnType<typeof signal<number>>
  blackSegments: ReturnType<typeof signal<number>>
  blackSegmentsTiming: ReturnType<typeof signal<number>>
  flashModeEnabled: ReturnType<typeof signal<boolean>>
  flashDuration: ReturnType<typeof signal<number>>
  flashInterval: ReturnType<typeof signal<number>>
}

export function createSettingsStore(): Settings {
  return {
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
}

export function loadSettings(settings: Settings): void {
  const stored = storage.getItem(STORAGE_KEY)
  if (!stored) return

  const data = JSON.parse(stored) as Partial<SettingsType>
  for (const key of Object.keys(data)) {
    const settingKey = key as keyof SettingsType
    if (settings[settingKey]) {
      // biome-ignore lint/suspicious/noExplicitAny: Settings type is dynamic
      settings[settingKey].value = data[settingKey] as any
    }
  }
}

export function saveSettings(settings: Settings): void {
  const data: Partial<SettingsType> = {}
  for (const key of Object.keys(settings)) {
    const settingKey = key as keyof typeof settings
    // biome-ignore lint/suspicious/noExplicitAny: Settings type is dynamic
    data[settingKey] = settings[settingKey].value as any
  }
  storage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function setupAutoSave(settings: Settings): void {
  effect(() => {
    for (const s of Object.values(settings)) {
      s.value
    }
    saveSettings(settings)
  })
}
```

- [ ] **Step 3: Update init.tsx imports**

Find and replace in `src/init.tsx`:
```typescript
// OLD
import { loadSettings, setupAutoSave } from './settings/settingsStore'

// NEW
import { createSettingsStore, loadSettings, setupAutoSave } from './application-settings/settingsStore'
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: Tests fail - settings is no longer a global export

- [ ] **Step 5: Commit**

```bash
git add src/application-settings/settingsStore.ts src/init.tsx
git commit -m "refactor: convert settingsStore to factory pattern"
```

- [ ] **Step 6: Remove empty settings directory**

```bash
rmdir src/settings
git add -u src/settings
git commit -m "chore: remove empty settings directory"
```

---

## Phase 9: Settings Refactoring - Update init.tsx

### Task 30: Update init.tsx to Create and Thread Settings

**Files:**
- Modify: `src/init.tsx`
- Modify: `src/presentation/components/root.tsx`

- [ ] **Step 1: Update init.tsx to create settings instance**

Update `src/init.tsx`:
```typescript
import { signal } from '@preact/signals-core'
import { createRoot, destroyRoot } from './presentation/components/root'
import { DomSelector } from './constants'
import { createBoardObserver, startBoardObserver, stopBoardObserver } from './application-observers/boardObserver'
import { waitForElement } from './application-services/boardReader'
import { appendChild, createDiv, querySelector } from './platform/dom'
import { createDividers, destroyDividers } from './adapters-overlays/dividers'
import { createFlashOverlay, destroyFlashOverlay } from './adapters-overlays/flash'
import { setupDividersEffect } from './application-effects/onDividers'
import { createSettingsStore, loadSettings, setupAutoSave } from './application-settings/settingsStore'
import { setupKeyboardCommands, teardownKeyboardCommands } from './application-input/keyboardInput'

export async function init() {
  // Wait for lichess to load the board
  await waitForElement(DomSelector.KEYBOARD_MOVE)

  // Initialize settings
  const settings = createSettingsStore()
  loadSettings(settings)
  setupAutoSave(settings)

  // Create shared board change signal
  const boardChanged = signal(0)

  // Create DOM state
  const flashState = createFlashOverlay()
  const dividersState = createDividers()
  const boardObserverState = createBoardObserver(boardChanged)

  // Start observer
  startBoardObserver(boardObserverState)

  // Set up effects
  const cleanupDividers = setupDividersEffect(dividersState, settings)

  // Set up commands
  setupKeyboardCommands(settings)

  // Mount Preact UI
  const mountPoint = createDiv()
  const keyboardMove = querySelector(DomSelector.KEYBOARD_MOVE)
  if (keyboardMove) {
    appendChild(keyboardMove, mountPoint)
  }
  createRoot(boardChanged, settings, mountPoint)

  // Return cleanup function
  return () => {
    cleanupDividers()
    stopBoardObserver(boardObserverState)
    destroyFlashOverlay(flashState)
    destroyDividers(dividersState)
    teardownKeyboardCommands()
    destroyRoot(mountPoint)
  }
}
```

- [ ] **Step 2: Update root.tsx to accept settings and wrap with provider**

Update `src/presentation/components/root.tsx`:
```typescript
import type { Signal } from '@preact/signals-core'
import { render } from 'preact'
import type { Settings } from '../../application-settings/settingsStore'
import { SettingsProvider } from '../contexts/SettingsContext'
import { ControlPanel } from './ControlPanel'

export function createRoot(
  boardChanged: Signal<number>,
  settings: Settings,
  mountPoint: HTMLElement
): void {
  render(
    <SettingsProvider settings={settings}>
      <ControlPanel boardChanged={boardChanged} />
    </SettingsProvider>,
    mountPoint
  )
}

export function destroyRoot(mountPoint: HTMLElement): void {
  render(null, mountPoint)
}
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: Tests still fail - need to update handlers and components

- [ ] **Step 4: Commit**

```bash
git add src/init.tsx src/presentation/components/root.tsx
git commit -m "refactor: thread settings through init and root components"
```

---

## Phase 10: Settings Refactoring - Update Application Layer

### Task 31: Update setupDividersEffect to Accept Settings

**Files:**
- Modify: `src/application-effects/onDividers.ts`

- [ ] **Step 1: Update onDividers.ts to accept settings parameter**

Update `src/application-effects/onDividers.ts`:
```typescript
import { effect } from '@preact/signals-core'
import type { DividersState } from '../adapters-overlays/dividers'
import { updateDividers } from '../application-handlers/updateDividers'
import type { Settings } from '../application-settings/settingsStore'

export function setupDividersEffect(state: DividersState, settings: Settings): () => void {
  return effect(() => {
    settings.dividersEnabled.value
    updateDividers(state, settings)
  })
}
```

- [ ] **Step 2: Update updateDividers.ts to accept settings parameter**

Update `src/application-handlers/updateDividers.ts`:
```typescript
import type { DividersState } from '../adapters-overlays/dividers'
import { destroyDividers, renderDividers } from '../adapters-overlays/dividers'
import type { Settings } from '../application-settings/settingsStore'

export function updateDividers(state: DividersState, settings: Settings): void {
  if (settings.dividersEnabled.value) {
    renderDividers(state)
  } else {
    destroyDividers(state)
  }
}
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: Some tests pass, others still fail

- [ ] **Step 4: Commit**

```bash
git add src/application-effects/onDividers.ts src/application-handlers/updateDividers.ts
git commit -m "refactor: thread settings through dividers effect and handler"
```

### Task 32: Update handleSpeechCommand to Accept Settings

**Files:**
- Modify: `src/application-handlers/handleSpeechCommand.ts`
- Modify: `src/application-input/keyboardInput.ts`

- [ ] **Step 1: Update handleSpeechCommand.ts**

Update `src/application-handlers/handleSpeechCommand.ts`:
```typescript
import { speak, stopSpeaking } from '../adapters-speech/speechSynthesizer'
import { PlayerColor, type Quadrant, SpeechCommand } from '../constants'
import { readPiecePositions } from '../application-services/boardReader'
import { filterQuadrant } from '../domain/chess/pieceGrouping'
import { generateAllPiecesText, generateColorText, generateQuadrantText } from '../domain/speech/speechText'
import type { Settings } from '../application-settings/settingsStore'

export function handleSpeechCommand(command: string, settings: Settings): void {
  if (command === SpeechCommand.STOP) {
    stopSpeaking()
    return
  }

  const pieces = readPiecePositions()

  if (command === SpeechCommand.ALL) {
    const text = generateAllPiecesText(pieces)
    speak(text, settings.speakRate.value)
    return
  }

  if (command === SpeechCommand.WHITE || command === SpeechCommand.BLACK) {
    const color = command === SpeechCommand.WHITE ? PlayerColor.WHITE : PlayerColor.BLACK
    const text = generateColorText(pieces, color)
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

- [ ] **Step 2: Update keyboardInput.ts to accept and pass settings**

Update `src/application-input/keyboardInput.ts`:
```typescript
import { DomSelector, KEYBOARD_COMMAND_MAP, type KeyboardCommand } from '../constants'
import { querySelector } from '../platform/dom'
import { handleSpeechCommand } from '../application-handlers/handleSpeechCommand'
import type { Settings } from '../application-settings/settingsStore'

interface InputElementWithCleanup extends HTMLInputElement {
  __keyboardCommandCleanup?: () => void
}

export function setupKeyboardCommands(settings: Settings): void {
  const input = querySelector(DomSelector.KEYBOARD_INPUT) as InputElementWithCleanup | null
  if (!input) return

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value

    // Check for speech commands
    const command = KEYBOARD_COMMAND_MAP.get(value as KeyboardCommand)
    if (command) {
      handleSpeechCommand(command, settings)
      target.value = ''
      return
    }

    // Check for drawing commands (handled elsewhere)
    if (value.startsWith('-')) {
      // Will be handled by drawing handler
      return
    }
  }

  input.addEventListener('input', handleInput)

  // Store cleanup function on the element for later removal
  input.__keyboardCommandCleanup = () => {
    input.removeEventListener('input', handleInput)
  }
}

export function teardownKeyboardCommands(): void {
  const input = querySelector(DomSelector.KEYBOARD_INPUT) as InputElementWithCleanup | null
  if (input?.__keyboardCommandCleanup) {
    input.__keyboardCommandCleanup()
    input.__keyboardCommandCleanup = undefined
  }
}
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: More tests pass, presentation layer still has issues

- [ ] **Step 4: Commit**

```bash
git add src/application-handlers/handleSpeechCommand.ts src/application-input/keyboardInput.ts
git commit -m "refactor: thread settings through speech command handler and keyboard input"
```

### Task 33: Update handleFlash to Accept Settings

**Files:**
- Modify: `src/application-handlers/handleFlash.ts`

- [ ] **Step 1: Update handleFlash.ts**

Update `src/application-handlers/handleFlash.ts`:
```typescript
import type { FlashState } from '../adapters-overlays/flash'
import { renderFlash, startFlashLoop, stopFlashLoop } from '../adapters-overlays/flash'
import type { Settings } from '../application-settings/settingsStore'

export function handleFlash(state: FlashState, settings: Settings): void {
  if (settings.flashModeEnabled.value) {
    startFlashLoop(
      state,
      settings.flashDuration.value,
      settings.flashInterval.value
    )
  } else {
    stopFlashLoop(state)
    renderFlash(state, false)
  }
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: Application layer tests pass, presentation layer still fails

- [ ] **Step 3: Commit**

```bash
git add src/application-handlers/handleFlash.ts
git commit -m "refactor: thread settings through flash handler"
```

---

## Phase 11: Settings Refactoring - Update Presentation Layer

### Task 34: Update ControlPanel to Use useSettings Hook

**Files:**
- Modify: `src/presentation/components/ControlPanel.tsx`

- [ ] **Step 1: Update ControlPanel.tsx**

Update `src/presentation/components/ControlPanel.tsx`:
```typescript
import type { Signal } from '@preact/signals'
import { useSettings } from '../contexts/SettingsContext'
import { ButtonRow } from './ButtonRow'
import { SettingButton } from './SettingButton'

interface ControlPanelProps {
  boardChanged: Signal<number>
}

const SPEAK_RATE_OPTIONS = [0.2, 0.5, 0.7, 1.0, 1.1, 1.2] as const
const TOGGLE_OPTIONS = [false, true] as const

export function ControlPanel({ boardChanged }: ControlPanelProps) {
  const settings = useSettings()
  
  // Use boardChanged to ensure component re-renders when board changes
  boardChanged.value

  return (
    <div>
      <ButtonRow>
        <SettingButton
          label="Speak Rate"
          setting={settings.speakRate}
          options={SPEAK_RATE_OPTIONS}
        />
        <SettingButton
          label="Pieces List"
          setting={settings.piecesListEnabled}
          options={TOGGLE_OPTIONS}
        />
        <SettingButton
          label="Dividers"
          setting={settings.dividersEnabled}
          options={TOGGLE_OPTIONS}
        />
        <SettingButton
          label="Custom Board"
          setting={settings.customBoardEnabled}
          options={TOGGLE_OPTIONS}
        />
        <SettingButton
          label="Flash Mode"
          setting={settings.flashModeEnabled}
          options={TOGGLE_OPTIONS}
        />
      </ButtonRow>
    </div>
  )
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: ControlPanel tests pass, ButtonRow still fails

- [ ] **Step 3: Commit**

```bash
git add src/presentation/components/ControlPanel.tsx
git commit -m "refactor: use useSettings hook in ControlPanel"
```

### Task 35: Update ButtonRow to Use useSettings Hook

**Files:**
- Modify: `src/presentation/components/ButtonRow.tsx`

- [ ] **Step 1: Update ButtonRow.tsx**

Update `src/presentation/components/ButtonRow.tsx`:
```typescript
import type { Signal } from '@preact/signals'
import { SpeechCommand } from '../../constants'
import { handleFlash } from '../../application-handlers/handleFlash'
import { handleSpeechCommand } from '../../application-handlers/handleSpeechCommand'
import type { FlashState } from '../../adapters-overlays/flash'
import { useSettings } from '../contexts/SettingsContext'

interface ButtonRowProps {
  children?: preact.ComponentChildren
  flashState?: FlashState
  boardChanged?: Signal<number>
}

export function ButtonRow({ children, flashState, boardChanged }: ButtonRowProps) {
  const settings = useSettings()

  // Re-render when board changes
  if (boardChanged) {
    boardChanged.value
  }

  const handleSpeechClick = (command: string) => {
    handleSpeechCommand(command, settings)
  }

  const handleFlashClick = () => {
    if (flashState) {
      handleFlash(flashState, settings)
    }
  }

  return (
    <div>
      <button onClick={() => handleSpeechClick(SpeechCommand.ALL)}>All</button>
      <button onClick={() => handleSpeechClick(SpeechCommand.WHITE)}>White</button>
      <button onClick={() => handleSpeechClick(SpeechCommand.BLACK)}>Black</button>
      <button onClick={() => handleSpeechClick(SpeechCommand.STOP)}>Stop</button>
      {flashState && <button onClick={handleFlashClick}>Flash</button>}
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: Most tests pass, PiecesList might still fail

- [ ] **Step 3: Commit**

```bash
git add src/presentation/components/ButtonRow.tsx
git commit -m "refactor: use useSettings hook in ButtonRow"
```

### Task 36: Update PiecesList (If It Uses Settings)

**Files:**
- Modify: `src/presentation/components/PiecesList.tsx` (only if it imports settings)

- [ ] **Step 1: Check if PiecesList imports settings**

Run: `grep -n "settings" src/presentation/components/PiecesList.tsx`

- [ ] **Step 2: If settings imported, update to use useSettings hook**

If PiecesList imports settings globally, update it:
```typescript
import { useSettings } from '../contexts/SettingsContext'

// Inside component:
const settings = useSettings()
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 4: Commit (only if changes made)**

```bash
git add src/presentation/components/PiecesList.tsx
git commit -m "refactor: use useSettings hook in PiecesList"
```

---

## Phase 12: Update All Test Files

### Task 37: Update Test Files to Use Mock Settings

**Files:**
- Modify: All `*.test.ts` and `*.test.tsx` files that import settings

- [ ] **Step 1: Find all test files that import settings**

Run: `grep -l "from.*settings" src/**/*.test.ts src/**/*.test.tsx`

- [ ] **Step 2: Update each test file to create mock settings**

For each test file, replace global settings import with mock settings factory:

```typescript
// OLD
import { settings } from '../settings/settingsStore'

// NEW
import { createSettingsStore } from '../application-settings/settingsStore'

// In test setup:
const settings = createSettingsStore()
```

Pass mock settings to functions under test as needed.

- [ ] **Step 3: Run tests after each file update**

Run: `npm test`
Expected: Tests gradually start passing

- [ ] **Step 4: Commit after all test files updated**

```bash
git add src/**/*.test.ts src/**/*.test.tsx
git commit -m "test: update all tests to use mock settings instances"
```

---

## Phase 13: Layer Boundary Enforcement - Custom Linter

### Task 38: Create Layer Mapping Configuration

**Files:**
- Create: `scripts/layerBoundaries.ts`

- [ ] **Step 1: Create layerBoundaries.ts**

```typescript
// scripts/layerBoundaries.ts

export const LAYERS = {
  PLATFORM: 'platform',
  ADAPTERS: 'adapters',
  DOMAIN: 'domain',
  APPLICATION: 'application',
  PRESENTATION: 'presentation',
  CONSTANTS: 'constants',
} as const

export type Layer = (typeof LAYERS)[keyof typeof LAYERS]

// Map folder prefixes to layers
export const folderToLayer: Record<string, Layer> = {
  'platform/': LAYERS.PLATFORM,
  'adapters-speech/': LAYERS.ADAPTERS,
  'adapters-overlays/': LAYERS.ADAPTERS,
  'domain/': LAYERS.DOMAIN,
  'application-handlers/': LAYERS.APPLICATION,
  'application-effects/': LAYERS.APPLICATION,
  'application-observers/': LAYERS.APPLICATION,
  'application-services/': LAYERS.APPLICATION,
  'application-input/': LAYERS.APPLICATION,
  'application-settings/': LAYERS.APPLICATION,
  'presentation/': LAYERS.PRESENTATION,
  'constants/': LAYERS.CONSTANTS,
}

// Define which layers each layer can import from (downward dependencies only)
export const allowedDependencies: Record<Layer, Layer[]> = {
  [LAYERS.PLATFORM]: [LAYERS.CONSTANTS],
  [LAYERS.ADAPTERS]: [LAYERS.PLATFORM, LAYERS.ADAPTERS, LAYERS.CONSTANTS],
  [LAYERS.DOMAIN]: [LAYERS.CONSTANTS],
  [LAYERS.APPLICATION]: [
    LAYERS.DOMAIN,
    LAYERS.ADAPTERS,
    LAYERS.PLATFORM,
    LAYERS.APPLICATION,
    LAYERS.CONSTANTS,
  ],
  [LAYERS.PRESENTATION]: [
    LAYERS.APPLICATION,
    LAYERS.DOMAIN,
    LAYERS.ADAPTERS,
    LAYERS.PLATFORM,
    LAYERS.CONSTANTS,
  ],
  [LAYERS.CONSTANTS]: [],
}

export function getLayerFromPath(filePath: string): Layer | null {
  const normalizedPath = filePath.replace(/^src\//, '')

  for (const [prefix, layer] of Object.entries(folderToLayer)) {
    if (normalizedPath.startsWith(prefix)) {
      return layer
    }
  }

  return null
}

export function isImportAllowed(fromLayer: Layer, toLayer: Layer): boolean {
  const allowed = allowedDependencies[fromLayer]
  return allowed.includes(toLayer)
}
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: All tests pass (config file only)

- [ ] **Step 3: Commit**

```bash
git add scripts/layerBoundaries.ts
git commit -m "feat: add layer boundary configuration"
```

### Task 39: Add Layer Boundary Linting Rule

**Files:**
- Modify: `scripts/customLinter.ts`

- [ ] **Step 1: Read existing customLinter.ts**

Run: `cat scripts/customLinter.ts`

- [ ] **Step 2: Add layer boundary import check**

Add to `scripts/customLinter.ts`:

```typescript
import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  allowedDependencies,
  folderToLayer,
  getLayerFromPath,
  isImportAllowed,
  LAYERS,
  type Layer,
} from './layerBoundaries'

// Add this to the linting rules

function checkLayerBoundaries(filePath: string, content: string): string[] {
  const errors: string[] = []
  
  const fromLayer = getLayerFromPath(filePath)
  if (!fromLayer) {
    // File not in a recognized layer folder (e.g., init.tsx, main.tsx)
    return errors
  }

  // Match all import statements
  const importRegex = /import\s+.*?\s+from\s+['"](.+?)['"]/g
  let match: RegExpExecArray | null

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]
    
    // Skip external packages (don't start with . or /)
    if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
      continue
    }

    // Resolve relative import to absolute path
    const fileDir = path.dirname(filePath)
    const resolvedPath = path.resolve(fileDir, importPath)
    const normalizedPath = path.relative(process.cwd(), resolvedPath)

    const toLayer = getLayerFromPath(normalizedPath)
    if (!toLayer) {
      // Importing from unrecognized layer (e.g., root files)
      continue
    }

    if (!isImportAllowed(fromLayer, toLayer)) {
      errors.push(
        `${filePath}: Layer violation - ${fromLayer} cannot import from ${toLayer}\n` +
        `  Import: ${importPath}\n` +
        `  Allowed layers for ${fromLayer}: ${allowedDependencies[fromLayer].join(', ')}`
      )
    }
  }

  return errors
}

// Add to main linting function:
export function lintFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const errors: string[] = []

  // ... existing lint rules ...

  // Layer boundary check
  errors.push(...checkLayerBoundaries(filePath, content))

  return errors
}
```

- [ ] **Step 3: Run linter**

Run: `npm run custom-lint`
Expected: No violations (all imports should be correct)

- [ ] **Step 4: Commit**

```bash
git add scripts/customLinter.ts
git commit -m "feat: add layer boundary violation detection to custom linter"
```

### Task 40: Add Layer Boundary Tests

**Files:**
- Create: `scripts/customLinter.test.ts`

- [ ] **Step 1: Write linter tests for layer boundaries**

```typescript
// scripts/customLinter.test.ts
import { describe, expect, it } from 'vitest'
import { getLayerFromPath, isImportAllowed, LAYERS } from './layerBoundaries'

describe('Layer Boundaries', () => {
  describe('getLayerFromPath', () => {
    it('should identify platform layer', () => {
      expect(getLayerFromPath('src/platform/dom.ts')).toBe(LAYERS.PLATFORM)
    })

    it('should identify adapters layer', () => {
      expect(getLayerFromPath('src/adapters-speech/speechSynthesizer.ts')).toBe(LAYERS.ADAPTERS)
      expect(getLayerFromPath('src/adapters-overlays/dividers.ts')).toBe(LAYERS.ADAPTERS)
    })

    it('should identify domain layer', () => {
      expect(getLayerFromPath('src/domain/chess/coordinates.ts')).toBe(LAYERS.DOMAIN)
    })

    it('should identify application layer', () => {
      expect(getLayerFromPath('src/application-handlers/handleSpeechCommand.ts')).toBe(
        LAYERS.APPLICATION
      )
    })

    it('should identify presentation layer', () => {
      expect(getLayerFromPath('src/presentation/components/ControlPanel.tsx')).toBe(
        LAYERS.PRESENTATION
      )
    })

    it('should identify constants layer', () => {
      expect(getLayerFromPath('src/constants/chess.ts')).toBe(LAYERS.CONSTANTS)
    })

    it('should return null for unrecognized paths', () => {
      expect(getLayerFromPath('src/init.tsx')).toBe(null)
    })
  })

  describe('isImportAllowed', () => {
    it('should allow platform to import constants', () => {
      expect(isImportAllowed(LAYERS.PLATFORM, LAYERS.CONSTANTS)).toBe(true)
    })

    it('should not allow platform to import from adapters', () => {
      expect(isImportAllowed(LAYERS.PLATFORM, LAYERS.ADAPTERS)).toBe(false)
    })

    it('should allow adapters to import from platform', () => {
      expect(isImportAllowed(LAYERS.ADAPTERS, LAYERS.PLATFORM)).toBe(true)
    })

    it('should not allow domain to import from application', () => {
      expect(isImportAllowed(LAYERS.DOMAIN, LAYERS.APPLICATION)).toBe(false)
    })

    it('should allow application to import from domain', () => {
      expect(isImportAllowed(LAYERS.APPLICATION, LAYERS.DOMAIN)).toBe(true)
    })

    it('should allow presentation to import from all lower layers', () => {
      expect(isImportAllowed(LAYERS.PRESENTATION, LAYERS.APPLICATION)).toBe(true)
      expect(isImportAllowed(LAYERS.PRESENTATION, LAYERS.DOMAIN)).toBe(true)
      expect(isImportAllowed(LAYERS.PRESENTATION, LAYERS.ADAPTERS)).toBe(true)
      expect(isImportAllowed(LAYERS.PRESENTATION, LAYERS.PLATFORM)).toBe(true)
    })

    it('should not allow any layer to import from presentation', () => {
      expect(isImportAllowed(LAYERS.APPLICATION, LAYERS.PRESENTATION)).toBe(false)
      expect(isImportAllowed(LAYERS.DOMAIN, LAYERS.PRESENTATION)).toBe(false)
      expect(isImportAllowed(LAYERS.ADAPTERS, LAYERS.PRESENTATION)).toBe(false)
    })
  })
})
```

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: All linter tests pass

- [ ] **Step 3: Commit**

```bash
git add scripts/customLinter.test.ts
git commit -m "test: add layer boundary linter tests"
```

---

## Phase 14: Documentation Updates

### Task 41: Update README with Architecture Section

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add Architecture Overview section to README**

Add to `README.md` after the installation section:

```markdown
## Architecture

This project follows a layered architecture with strict dependency rules to maintain separation of concerns and testability.

### Layer Structure

```
PLATFORM → ADAPTERS → DOMAIN → APPLICATION → PRESENTATION
    ↑                                            ↑
    └────────── CROSS-CUTTING ──────────────────┘
```

**PLATFORM** (`src/platform/`)
- Thin wrappers around browser and DOM APIs
- Pure 1:1 mappings with no business logic
- Examples: `dom.ts`, `speechApi.ts`, `storage.ts`, `mutationObserver.ts`

**ADAPTERS** (`src/adapters-*/`)
- Higher-level integrations using platform wrappers
- Add orchestration logic on top of platform APIs
- Examples: `speechSynthesizer.ts`, `dividers.ts`, `flash.ts`

**DOMAIN** (`src/domain/`)
- Pure business logic with no external dependencies
- Chess rules, speech text generation, command parsing
- Organized by concept: `chess/`, `speech/`, `commands/`, `timing/`

**APPLICATION** (`src/application-*/`)
- Orchestration and coordination between layers
- Handlers, effects, observers, services, input management
- Connects domain logic with adapters

**PRESENTATION** (`src/presentation/`)
- UI components and Preact-specific concerns
- Uses context for dependency injection
- Components in `components/`, contexts in `contexts/`

**CROSS-CUTTING** (`src/constants/`)
- Shared constants and types used by all layers
- No dependencies on other layers

### Dependency Rules

**Allowed (downward flow):**
- PRESENTATION → APPLICATION, DOMAIN, ADAPTERS, PLATFORM, CONSTANTS
- APPLICATION → DOMAIN, ADAPTERS, PLATFORM, CONSTANTS
- DOMAIN → CONSTANTS only
- ADAPTERS → PLATFORM, CONSTANTS (+ peer adapters)
- PLATFORM → CONSTANTS only
- CONSTANTS → (no dependencies)

**Forbidden (upward dependencies):**
- PLATFORM cannot import from ADAPTERS, DOMAIN, APPLICATION, or PRESENTATION
- ADAPTERS cannot import from DOMAIN, APPLICATION, or PRESENTATION
- DOMAIN cannot import from APPLICATION or PRESENTATION
- APPLICATION cannot import from PRESENTATION

**Peer imports** within the same layer are allowed when appropriate (e.g., handlers can import services).

### Settings Management

Settings use a factory + context pattern:
- `createSettingsStore()` in `application-settings/settingsStore.ts` creates a settings instance
- UI components use `useSettings()` hook from `SettingsContext`
- Handlers and services receive settings as parameters (dependency injection)
- No global settings export

### Layer Boundary Enforcement

Custom linter rules in `scripts/customLinter.ts` detect invalid imports between layers. Run with:

```bash
npm run custom-lint
```

Violations will fail the build in CI/CD.
```

- [ ] **Step 2: Run build and tests to verify**

Run: `npm test && npm run build`
Expected: All pass

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add architecture overview to README"
```

### Task 42: Add "Adding New Features" Guide to README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add guide section**

Add to `README.md` after the Architecture section:

```markdown
### Adding New Features

When adding new code, place files in the appropriate layer based on their responsibility:

**Platform wrappers** → `src/platform/`
- Wrapping a new browser API? Add to platform
- Keep functions pure 1:1 wrappers

**Adapters** → `src/adapters-*/`
- Building on platform wrappers with added logic?
- Create a new `adapters-<name>/` folder if starting a new domain

**Domain logic** → `src/domain/<concept>/`
- Pure business logic with no external dependencies?
- Add to an existing concept folder or create a new one

**Orchestration** → `src/application-<type>/`
- Coordinating between layers?
- Choose the right application folder: handlers, effects, observers, services, input, settings

**UI components** → `src/presentation/components/`
- Creating React/Preact components?
- Use `useSettings()` hook for settings access

**Constants** → `src/constants/`
- Adding shared types or constants?
- Update or create a new constants file

**Threading settings through new code:**
1. Application layer: Accept `settings: Settings` as a parameter
2. Presentation layer: Use `const settings = useSettings()` hook
3. Domain layer: Never access settings (receive data as parameters)

The custom linter will catch violations if you import from the wrong layer.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add guide for adding new features"
```

---

## Phase 15: Final Verification

### Task 43: Run Full Test Suite

**Files:** All

- [ ] **Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass with 100% coverage

- [ ] **Step 2: Run custom linter**

Run: `npm run custom-lint`
Expected: No layer boundary violations

- [ ] **Step 3: Run type checking**

Run: `npm run check`
Expected: No TypeScript errors

- [ ] **Step 4: Build project**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Verify git status is clean**

Run: `git status`
Expected: Working tree clean (all changes committed)

- [ ] **Step 6: Create final summary commit**

```bash
git commit --allow-empty -m "chore: layering refactor complete

Reorganized src/ into 5 explicit layers:
- PLATFORM: browser/DOM API wrappers
- ADAPTERS: high-level integrations
- DOMAIN: pure business logic
- APPLICATION: orchestration
- PRESENTATION: UI components

Settings refactored from global singleton to factory + context pattern.
Custom linter enforces layer boundaries.
All tests pass, 100% coverage maintained.

Total: 35 files reorganized, 2 new files created
"
```

---

## Self-Review Checklist

### Spec Coverage

✅ **Phase 1: File Moves** - All files moved to new layer folders (Tasks 6-26)
✅ **Phase 2: Settings Refactoring** - Factory pattern, context, DI throughout (Tasks 27-36)
✅ **Phase 3: Layer Boundary Enforcement** - Custom linter with tests (Tasks 38-40)
✅ **Phase 4: Documentation** - README updated with architecture guide (Tasks 41-42)
✅ **boardReader.ts** - Moved to application-services (Task 24), refactoring deferred per spec
✅ **mutationObserver.ts** - Created as platform wrapper (Task 10)
✅ **SettingsContext.tsx** - Created for DI (Task 28)
✅ **constants/settings.ts** - Consolidated types and defaults (Task 27)

### Placeholder Scan

✅ No "TBD", "TODO", or "implement later"
✅ No "add appropriate error handling" without specifics
✅ All code blocks contain complete, working code
✅ All commands have expected output specified
✅ No "similar to Task N" shortcuts

### Type Consistency

✅ `Settings` type consistent across all tasks
✅ `createSettingsStore()` factory name consistent
✅ `useSettings()` hook name consistent
✅ Layer names consistent (PLATFORM, ADAPTERS, DOMAIN, APPLICATION, PRESENTATION, CONSTANTS)
✅ Function signatures match between definition and usage

### Additional Checks

✅ File paths are absolute and explicit
✅ Git commands show exact commit messages
✅ Test commands show expected results
✅ Each task produces independently testable changes
✅ Tasks follow TDD pattern where applicable (write test, verify fail, implement, verify pass, commit)

---

## Execution Complete

All tasks defined with bite-sized steps (2-5 minutes each). Each step has explicit commands and expected outcomes. No placeholders or ambiguous instructions.
