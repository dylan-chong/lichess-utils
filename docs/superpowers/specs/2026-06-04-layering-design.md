# Project Layering Architecture Design

**Date:** 2026-06-04  
**Status:** Approved

## Problem Statement

The current `src/` structure mixes architectural layers inconsistently:
- DOM interaction code (`speechApi.ts` in `browser/`, `dom.ts` in `dom/`) is separated despite serving the same purpose
- Files like `boardReader.ts` mix multiple layers (DOM access + business logic)
- Settings exported as a global singleton creates tight coupling across the codebase
- Folder organization doesn't clearly communicate architectural boundaries

## Goals

1. Establish clear layer boundaries that reflect the architecture
2. Separate platform wrappers from higher-level adapters
3. Isolate pure business logic (domain) from external dependencies
4. Eliminate global settings singleton in favor of dependency injection
5. Document and enforce layer dependencies via custom linting

## Solution Overview

Reorganize `src/` into five explicit layers with strict dependency rules:

```
PLATFORM → ADAPTERS → DOMAIN → APPLICATION → PRESENTATION
    ↑                                            ↑
    └────────── CROSS-CUTTING ──────────────────┘
```

## Layer Definitions

### 1. PLATFORM Layer (`platform/`)

**Purpose:** Thin wrappers around browser and DOM APIs. Pure 1:1 mappings with no business logic.

**Files:**
- `dom.ts` - wraps `document` methods (querySelector, createElement, appendChild, getBoundingClientRect)
- `mutationObserver.ts` - wraps MutationObserver creation, observe, disconnect
- `speechApi.ts` - wraps browser SpeechSynthesis API
- `storage.ts` - wraps localStorage get/set operations

**Dependencies:** None (only browser globals)

**Example:**
```typescript
// platform/dom.ts
export function querySelector(selector: string): Element | null {
  return document.querySelector(selector)
}
```

### 2. ADAPTERS Layer (`adapters-*/`)

**Purpose:** Higher-level integrations that use platform wrappers and add orchestration logic.

**Files:**
- `adapters-speech/speechSynthesizer.ts` - higher-level speech functions (speak, cancel, stopSpeaking)
- `adapters-overlays/dividers.ts` - creates/destroys SVG divider overlays
- `adapters-overlays/flash.ts` - creates/destroys flash overlay effects

**Dependencies:** Can import from PLATFORM, peer adapters, and CROSS-CUTTING

**Example:**
```typescript
// adapters-speech/speechSynthesizer.ts
import { getSpeechSynthesis, speak as platformSpeak } from '../platform/speechApi'

export function speak(text: string, rate: number): void {
  const synthesis = getSpeechSynthesis()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  platformSpeak(synthesis, utterance)
}
```

### 3. DOMAIN Layer (`domain/`)

**Purpose:** Pure business logic with no external dependencies. Contains chess rules, speech text generation, command parsing.

**Structure:**
```
domain/
├── chess/
│   ├── coordinates.ts - pixel ↔ chess square conversion
│   └── pieceGrouping.ts - group/filter pieces by color, quadrant
├── speech/
│   └── speechText.ts - generate speech text for pieces
├── commands/
│   └── commandParser.ts - parse draw commands
└── timing/
    └── flashTiming.ts - calculate flash timing
```

**Dependencies:** Only CROSS-CUTTING (constants). Never imports PLATFORM, ADAPTERS, APPLICATION, or PRESENTATION.

**Example:**
```typescript
// domain/chess/pieceGrouping.ts
export function filterQuadrant(pieces: PiecePosition[], quadrant: Quadrant): PiecePosition[] {
  // Pure logic, no DOM or external dependencies
}
```

### 4. APPLICATION Layer (`application-*/`)

**Purpose:** Orchestration and coordination. Connects domain logic with adapters, manages side effects.

**Structure:**
```
application-handlers/
├── handleSpeechCommand.ts - orchestrates speech commands
├── handleFlash.ts - orchestrates flash overlay behavior
└── updateDividers.ts - updates divider overlays

application-effects/
└── onDividers.ts - effect that runs updateDividers when settings change

application-observers/
├── observerState.ts - observer state types
└── boardObserver.ts - board-specific observation logic

application-services/
└── boardReader.ts - reads chess board state from DOM

application-input/
└── keyboardInput.ts - sets up keyboard command listeners

application-settings/
└── settingsStore.ts - settings store factory, load/save, auto-save effect
```

**Dependencies:** Can import from DOMAIN, ADAPTERS, PLATFORM, peer APPLICATION modules, and CROSS-CUTTING. Never imports PRESENTATION.

**Example:**
```typescript
// application-handlers/handleSpeechCommand.ts
import { speak } from '../adapters-speech/speechSynthesizer'
import { readPiecePositions } from '../application-services/boardReader'
import { generateAllPiecesText } from '../domain/speech/speechText'

export function handleSpeechCommand(command: string, settings: Settings): void {
  const pieces = readPiecePositions()
  const text = generateAllPiecesText(pieces)
  speak(text, settings.speakRate.value)
}
```

### 5. PRESENTATION Layer (`presentation/`)

**Purpose:** UI components and React-specific concerns.

**Structure:**
```
presentation/
├── components/
│   ├── ButtonRow.tsx
│   ├── ControlPanel.tsx
│   ├── PiecesList.tsx
│   ├── root.tsx
│   └── SettingButton.tsx
└── contexts/
    └── SettingsContext.tsx - Preact context provider, useSettings hook
```

**Dependencies:** Can import from APPLICATION, DOMAIN, ADAPTERS, PLATFORM, and CROSS-CUTTING.

**Example:**
```typescript
// presentation/contexts/SettingsContext.tsx
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

const SettingsContext = createContext<Settings | null>(null)

export function useSettings(): Settings {
  const settings = useContext(SettingsContext)
  if (!settings) throw new Error('useSettings must be used within SettingsProvider')
  return settings
}
```

### 6. CROSS-CUTTING Layer

**Purpose:** Shared constants and types used by all layers.

**Structure:**
```
constants/
├── annotations.ts - annotation type constants
├── chess.ts - chess constants (piece types, colors, quadrants)
├── commands.ts - speech command constants
├── dom.ts - DOM selector constants and CSS class names
├── settings.ts - settings type definitions and defaults
└── index.ts - re-exports all constants
```

**Dependencies:** None (leaf nodes in dependency graph)

## Dependency Rules

### Allowed Dependencies (Downward Flow)

```
PRESENTATION
    ↓
APPLICATION
    ↓
DOMAIN
    ↓
ADAPTERS
    ↓
PLATFORM
```

Cross-cutting concerns (constants) can be imported by any layer.

### Peer Imports (Same Layer)

Allowed when it makes sense:
- APPLICATION: handlers can import services, observers
- DOMAIN: chess logic can import speech logic
- ADAPTERS: speech adapter can import overlay adapters
- PLATFORM: dom.ts can import mutationObserver.ts

### Strictly Forbidden (Upward Dependencies)

- PLATFORM cannot import from ADAPTERS, DOMAIN, APPLICATION, or PRESENTATION
- ADAPTERS cannot import from DOMAIN, APPLICATION, or PRESENTATION
- DOMAIN cannot import from APPLICATION or PRESENTATION
- APPLICATION cannot import from PRESENTATION

### Special Case: Settings

Settings never exported as global singleton:
- `application-settings/settingsStore.ts` exports `createSettingsStore()` factory only
- `presentation/contexts/SettingsContext.tsx` provides context/hooks for UI layer
- APPLICATION and DOMAIN receive settings as parameters (dependency injection)
- PLATFORM never touches settings

## Settings Refactoring

### Current State (Global Singleton)

```typescript
// settings/settingsStore.ts
export const settings = {
  speakRate: signal(1.0),
  dividersEnabled: signal(false),
  // ... 12 signals total
}

// Any file
import { settings } from '../settings/settingsStore'
settings.speakRate.value = 2.0  // Direct global access
```

**Problem:** 13+ files import global settings, creating tight coupling.

### New State (Factory + Context)

```typescript
// application-settings/settingsStore.ts
export function createSettingsStore() {
  return {
    speakRate: signal(1.0),
    dividersEnabled: signal(false),
    // ... signals
  }
}
// NO global export

export function loadSettings(settings: Settings): void { /* ... */ }
export function saveSettings(settings: Settings): void { /* ... */ }
export function setupAutoSave(settings: Settings): void { /* ... */ }

// presentation/contexts/SettingsContext.tsx
const SettingsContext = createContext<Settings | null>(null)

export function useSettings(): Settings {
  const settings = useContext(SettingsContext)
  if (!settings) throw new Error('useSettings must be used within SettingsProvider')
  return settings
}

export function SettingsProvider({ settings, children }) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}

// init.tsx
const settings = createSettingsStore()  // Create once
loadSettings(settings)
setupAutoSave(settings)

// Pass to UI via context
createRoot(boardChanged, settings, mountPoint)

// Pass to handlers as parameters
setupKeyboardCommands(settings)
setupDividersEffect(dividersState, settings)

// presentation/components/ControlPanel.tsx
function ControlPanel() {
  const settings = useSettings()  // From context
  return <div>{settings.speakRate.value}</div>
}

// application-handlers/handleSpeechCommand.ts
export function handleSpeechCommand(command: string, settings: Settings) {
  speak(text, settings.speakRate.value)  // Passed as parameter
}
```

**Key Points:**
- Signals remain mutable (reactivity unchanged)
- Context only changes injection mechanism (not behavior)
- PRESENTATION uses `useSettings()` hook (no prop drilling)
- APPLICATION receives `settings: Settings` as parameters
- DOMAIN never accesses settings

## Complete File Tree

```
src/
├── platform/
│   ├── dom.ts
│   ├── mutationObserver.ts
│   ├── speechApi.ts
│   └── storage.ts
│
├── adapters-speech/
│   └── speechSynthesizer.ts
│
├── adapters-overlays/
│   ├── dividers.ts
│   └── flash.ts
│
├── domain/
│   ├── chess/
│   │   ├── coordinates.ts
│   │   └── pieceGrouping.ts
│   ├── speech/
│   │   └── speechText.ts
│   ├── commands/
│   │   └── commandParser.ts
│   └── timing/
│       └── flashTiming.ts
│
├── application-handlers/
│   ├── handleSpeechCommand.ts
│   ├── handleFlash.ts
│   └── updateDividers.ts
│
├── application-effects/
│   └── onDividers.ts
│
├── application-observers/
│   ├── observerState.ts
│   └── boardObserver.ts
│
├── application-services/
│   └── boardReader.ts
│
├── application-input/
│   └── keyboardInput.ts
│
├── application-settings/
│   └── settingsStore.ts
│
├── presentation/
│   ├── components/
│   │   ├── ButtonRow.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── PiecesList.tsx
│   │   ├── root.tsx
│   │   └── SettingButton.tsx
│   └── contexts/
│       └── SettingsContext.tsx
│
├── constants/
│   ├── annotations.ts
│   ├── chess.ts
│   ├── commands.ts
│   ├── dom.ts
│   ├── settings.ts
│   └── index.ts
│
├── init.tsx
└── main.tsx
```

**Total: 35 files**
- 33 moved from existing locations
- 2 new files: `SettingsContext.tsx`, `mutationObserver.ts`

## Migration Strategy

### Phase 1: File Moves (No Logic Changes)

1. Create new folder structure
2. Move files to new locations
3. Update all import paths
4. Verify tests still pass

### Phase 2: Settings Refactoring

1. Create `presentation/contexts/SettingsContext.tsx`
2. Change `settingsStore.ts` to export factory (remove global)
3. Update `init.tsx` to create settings instance
4. Update all components to use `useSettings()` hook
5. Update all handlers/effects to receive `settings: Settings` parameter
6. Thread settings through the call chain (13+ files)
7. Verify tests still pass

### Phase 3: Layer Boundary Enforcement

1. Create custom linter rules to detect invalid imports:
   - PLATFORM importing from ADAPTERS/DOMAIN/APPLICATION/PRESENTATION
   - ADAPTERS importing from DOMAIN/APPLICATION/PRESENTATION
   - DOMAIN importing from APPLICATION/PRESENTATION
   - APPLICATION importing from PRESENTATION
2. Add linter to CI/CD pipeline
3. Document layer rules in README

### Phase 4: boardReader.ts Refactoring

Current `boardReader.ts` mixes layers:
- Uses DOM wrappers (PLATFORM concerns)
- Contains business logic (parsing CSS transforms → chess positions)

Split into:
- Keep platform/DOM interaction in `application-services/boardReader.ts`
- Extract pure parsing logic if it grows complex (move to DOMAIN)

## Documentation Updates

Update README.md to include:

1. **Architecture Overview** section explaining the 5 layers
2. **Layer Dependency Rules** with visual diagram
3. **Adding New Features** guide:
   - Where to add new files based on responsibilities
   - How to thread settings through new code
   - How to maintain layer boundaries
4. **Linting** section explaining custom layer boundary rules

## Testing Considerations

- All existing tests should pass after Phase 1 (file moves)
- Settings-dependent tests need updates in Phase 2:
  - Replace `import { settings }` with mock settings instances
  - Pass mock settings to functions under test
- No new tests required for Phase 1-2 (behavior unchanged)
- Phase 3 linter rules need integration tests to verify detection

## Success Criteria

1. ✅ All files organized into clear layer folders
2. ✅ No global settings export (only factory function)
3. ✅ Settings injected via context (UI) or parameters (handlers)
4. ✅ Custom linter rules enforce layer boundaries
5. ✅ All tests pass
6. ✅ README documents the layering architecture
7. ✅ No upward dependencies (verified by linter)

## Non-Goals

- Changing business logic behavior
- Refactoring individual file implementations (except settings)
- Adding new features
- Changing test coverage
- Modifying build configuration

## Risks & Mitigations

**Risk:** Breaking changes due to import path updates  
**Mitigation:** Move files first, verify tests pass before refactoring

**Risk:** Threading settings through 13+ files introduces bugs  
**Mitigation:** Change one file at a time, run tests after each change

**Risk:** Custom linter rules don't catch all violations  
**Mitigation:** Manual code review + comprehensive linter test cases

**Risk:** Signals stop working after context refactoring  
**Mitigation:** Signal behavior is unchanged, only injection mechanism changes. Test reactivity explicitly.

## Future Improvements (Out of Scope)

- Further split `boardReader.ts` if business logic grows
- Extract more granular domain modules (e.g., `domain/pieces/`)
- Add integration tests for full command flow
- Consider immutable settings updates (separate read/write interfaces)
