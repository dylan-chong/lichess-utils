# lichess-utils

## lichess-board-speaker

Script to help you train blindfold chess.

- Speaks out the pieces on the board: "white pawns on a2 b2. a1 white rook".
- Supports text input to trigger these commands (desktop).
- Supports buttons to trigger the same commands (mobile, desktop).
- Supports blindfold game and puzzle training with various semi-blindfold settings

Mobile friendly (browser only of course)

![screenshot](./screenshot.png)

## Architecture Overview

This codebase follows a strict layered architecture with 5 main layers. Each layer has clear responsibilities and can only depend on layers at the same level or below. This ensures modularity, testability, and maintainability.

### Layer Hierarchy (top to bottom)

```
┌─────────────────────────────────────┐
│  Presentation (src/presentation)    │  UI components, rendering
├─────────────────────────────────────┤
│  Application (src/application-*)    │  Orchestration, services, handlers
├─────────────────────────────────────┤
│  Adapters (src/adapters-*)          │  Platform API wrappers
├─────────────────────────────────────┤
│  Domain (src/domain)                │  Pure business logic
├─────────────────────────────────────┤
│  Platform (src/platform)            │  Browser APIs (DOM, Storage, etc.)
│  Constants (src/constants)          │  Static configuration
└─────────────────────────────────────┘
```

### Layer Descriptions

#### 1. Platform Layer (src/platform)
- **Purpose**: Direct wrappers around browser APIs and external dependencies
- **Examples**: DOM manipulation, Web Storage API, Speech Synthesis API
- **Can import from**: Platform, Constants
- **Cannot import from**: Any higher layers

#### 2. Constants Layer (src/constants)
- **Purpose**: Static configuration, enums, and constant values
- **Examples**: CSS selectors, command names, chess notation
- **Can import from**: Constants only
- **Cannot import from**: Any other layer

#### 3. Domain Layer (src/domain)
- **Purpose**: Pure business logic with no external dependencies
- **Examples**: Chess coordinates, piece grouping, speech text generation
- **Can import from**: Domain, Constants
- **Cannot import from**: Platform, Adapters, Application, Presentation

#### 4. Adapters Layer (src/adapters-*)
- **Purpose**: Wraps platform APIs with application-specific interfaces
- **Examples**: Speech synthesizer, flash overlay, dividers
- **Can import from**: Adapters, Platform, Domain, Constants
- **Cannot import from**: Application, Presentation

#### 5. Application Layer (src/application-*)
- **Purpose**: Orchestrates domain logic and adapters
- **Examples**: Command handlers, board reader, keyboard input, observers
- **Can import from**: Application, Adapters, Domain, Platform, Constants
- **Cannot import from**: Presentation

#### 6. Presentation Layer (src/presentation)
- **Purpose**: UI components and rendering logic
- **Examples**: Preact components, settings context
- **Can import from**: Presentation, Application, Adapters, Domain, Constants
- **Cannot import from**: Root initialization files

### Dependency Rules

Layer boundaries are enforced by a custom linter (`npm run custom-lint`). The linter will fail if any file imports from a layer it's not allowed to depend on.

**Key principles:**
- Lower layers cannot depend on higher layers
- Constants can be used by all layers
- Domain layer is pure business logic (no platform dependencies)
- Root files (src/init.tsx, src/main.tsx) can import from any layer

### Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension (Chrome, Firefox) or Userscripts (Safari)
2. [Click here to install the script](https://raw.githubusercontent.com/dylan-chong/lichess-utils/main/lichess-board-speaker.user.js) — Tampermonkey will prompt you to install it. For Safari, copy the script to your Userscripts directory instead.
3. The script auto-updates when a new version is pushed to this repo
4. On lichess.org:
    - enable keyboard move input
    - you'll probably want to enable move narration
    - go to a puzzle
    - turn on blindfold mode
- type into the move input box `pwk` to read out pieces on the white-kingside quadrant
    - (the 'invalid input' sound plays when you type, but just ignore that sound)
- profit from blindfold chess puzzle practice!
