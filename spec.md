# lichess-board-speaker Specification

**Version:** 4.0.1  
**Purpose:** Blindfold chess training tool for lichess.org  
**Platform:** Browser extension (Tampermonkey/Userscripts)

---

## 0. Userscript Header

The userscript includes the following metadata header that configures how it runs:

```javascript
// ==UserScript==
// @name        lichess-board-speaker
// @description Blindfold chess training tool for lichess.org
// @version     3.4.7
// @match       *://lichess.org/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
// @grant       none
// @inject-into content
// @updateURL   https://cdn.jsdelivr.net/gh/dylan-chong/lichess-utils@main/lichess-board-speaker.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/dylan-chong/lichess-utils@main/lichess-board-speaker.user.js
// ==/UserScript==
```

**Header Fields:**
- `@name` - Display name in userscript manager
- `@description` - Brief description of functionality
- `@version` - Current version number (semantic versioning)
- `@match` - URL pattern where script runs (all lichess.org pages)
- `@require` - External library dependency (Three.js for 3D rendering)
- `@grant` - Permissions requested (none = runs in page context)
- `@inject-into` - Injection mode (content = content script context)
- `@updateURL` - URL to check for script updates
- `@downloadURL` - URL to download script updates

**Auto-Update Configuration:**
- Script hosted on GitHub: `dylan-chong/lichess-utils`
- Updates served via jsDelivr CDN
- Userscript managers automatically check for updates
- Users can manually update via their userscript manager

---

## 1. Overview

lichess-board-speaker adds blindfold chess training features to lichess.org:
- **Speech synthesis** - Hear piece positions read aloud
- **3D board rendering** - View the board from different angles
- **Obfuscation modes** - Hide or obscure pieces for training
- **Flash mode** - Board appears briefly after each move (memory training)
- **Visual aids** - Dividers, piece lists, and annotations

---

## 2. Controls & Buttons

All keyboard commands are typed into the move input field and start with `p` (for buttons) or `-` (for drawings).

### 2.1 Speech Buttons (Grouped Row)

These are clickable buttons rendered in the UI, grouped into rows:

**Row 1 — Quadrant Speech:**
| Button | Command | What it speaks |
|--------|---------|----------------|
| 🔊 ♔ side | `pwk` | White's king-side pieces (files e-h, ranks 1-4) |
| 🔊 ♕ side | `pwq` | White's queen-side pieces (files a-d, ranks 1-4) |
| 🔊 ♚ side | `pbk` | Black's king-side pieces (files e-h, ranks 5-8) |
| 🔊 ♛ side | `pbq` | Black's queen-side pieces (files a-d, ranks 5-8) |

**Row 2 — All/Color Speech:**
| Button | Command | What it speaks |
|--------|---------|----------------|
| 🔊 all pieces | `pa` | All pieces on the board |
| 🔊 w's pieces | `pww` | All white pieces |
| 🔊 b's pieces | `pbb` | All black pieces |

**Row 3 — Speak Rate & Stop:**
| Element | Command | Description |
|---------|---------|-------------|
| 🔊 rate (dropdown) | `psr` | Speak rate: 0.2, 0.5, 0.7, 1.0, 1.1, 1.2 |
| 🔊 Stop (button) | `pss` | Stop speaking immediately |

### 2.2 Main Controls (Always Visible)

**Pieces List** (`pl`)
- Shows/hides a list of all pieces on the board
- Updates live as pieces move
- Shows which color you're playing and whose turn it is

**Annotate Board** (`p-annotate`)
- Opens annotation mode for drawing circles and arrows on the board
- See section 2.7 for drawing command syntax

**Dividers** (`pdiv`)
- Shows/hides lines that divide the board into four quadrants
- Helps visualize board sections

**Custom Board** (`pcb`)
- Enables/disables 3D board rendering
- When ON, unlocks parallax and hover mode controls
- When OFF, uses standard lichess board

**Flash Mode** (`pfm`)
- Enables/disables memory training mode
- When ON, board flashes briefly after each move
- Unlocks flash duration and interval controls

### 2.2 Custom Board Controls (Visible when Custom Board is ON)

**Obfuscations** (`pob`)
- Enables/disables obfuscation training features
- When ON, unlocks piece style, blur, and black segments controls

**Parallax** (`ppx`)
- Changes the viewing angle of the 3D board
- Options: 0°, 20°, 30°, 40°, 50°, 60°, 65°, 70°, 80°
- 0° = overhead view (like normal chess board)
- Higher angles = more perspective/tilt
- Default: 0°

**Hover Mode** (`phv`)
- Makes the board gently rotate/oscillate
- Options: off, small, large, super
- Creates a floating/animated effect
- Default: off

### 2.3 Obfuscation Controls (Visible when Obfuscations is ON)

**Piece Style** (`pps`)
- Changes how pieces look
- Options:
  - **icons** - Standard chess piece symbols (default)
  - **3d** - Custom 3D modeled pieces
  - **checker** - Checkerboard pattern (light/dark)
  - **checker-grey** - Grey checkerboard pattern
  - **blindfold** - Pieces invisible (true blindfold)

**Blur** (`pblur`)
- Blurs the entire board
- Options: 0px, 1px, 2px, 3px, 4px, 6px, 8px
- 0px = no blur (default)
- Higher values = more blur

**Black Segments** (`pbs`)
- Covers portions of the board with dark overlays
- Options:
  - **None** - No coverage (default)
  - **1/4** - Covers 1 quadrant
  - **1/2** - Covers 2 quadrants
  - **3/4** - Covers 3 quadrants
  - **4/4** - Covers all 4 quadrants
- When set to anything except None, unlocks timing control

### 2.4 Black Segments Timing (Visible when Black Segments is not None)

**Timing** (`pbst`)
- Controls how the covered quadrants rotate
- Options:
  - **Rotate every 10s** - Changes which quadrants are covered every 10 seconds (default)
  - **Rotate every 30s** - Rotates every 30 seconds
  - **Rotate every 60s** - Rotates every 60 seconds
  - **Don't rotate** - Coverage stays fixed

### 2.5 Flash Mode Controls (Visible when Flash Mode is ON)

**Flash Duration** (`pfd`)
- How long the board stays visible after a move
- Options: 100ms, 300ms, 500ms, 1000ms, 2000ms
- Default: 1000ms

**Flash Interval** (`pfi`)
- Time between automatic flashes
- Options: 0.3s, 0.5s, 1s, 3s, 5s, 10s, 30s, 60s
- Default: 3s
- Board will flash at this interval even if no moves are made

### 2.6 Speech Commands

These commands speak piece positions aloud. They can be triggered by typing the command into the move input field OR by clicking the corresponding button in the UI (see section 2.1).

| Command | What it speaks |
|---------|----------------|
| `pwk` | White's king-side pieces (files e-h, ranks 1-4) |
| `pwq` | White's queen-side pieces (files a-d, ranks 1-4) |
| `pbk` | Black's king-side pieces (files e-h, ranks 5-8) |
| `pbq` | Black's queen-side pieces (files a-d, ranks 5-8) |
| `pa` | All pieces on the board |
| `pww` | All white pieces |
| `pbb` | All black pieces |
| `pss` | Stop speaking immediately |

### 2.7 Drawing Commands (Keyboard Only)

Draw circles and arrows on the board:

| Command | Effect | Example |
|---------|--------|---------|
| `-<square>` | Circle on a square | `-a1` draws circle on a1 |
| `-<from><to>` | Arrow between squares | `-a1b2` draws arrow from a1 to b2 |
| `-<sq1>,<sq2>,...` | Multiple annotations | `-a1,b2c3` draws circle on a1, arrow from b2 to c3 |

**Examples:**
- `-e4` - Circle on e4
- `-e2e4` - Arrow from e2 to e4
- `-d4,e4f6,g5` - Circle on d4, arrow from e4 to f6, circle on g5

To clear drawings, type any new drawing command.

---

## 3. UI Organization

The controls appear in a nested hierarchy - some controls only show up when their parent feature is enabled:

```
Speech Buttons (always visible)
├─ Row: 🔊 ♔ side, 🔊 ♕ side, 🔊 ♚ side, 🔊 ♛ side
├─ Row: 🔊 all pieces, 🔊 w's pieces, 🔊 b's pieces
├─ Row: 🔊 rate (dropdown), 🔊 Stop (button)

Main Controls (always visible)
├─ Pieces List
├─ Annotate Board
├─ Dividers
├─ Custom Board
│  └─ When Custom Board is ON:
│     ├─ Obfuscations
│     │  └─ When Obfuscations is ON:
│     │     ├─ Piece Style
│     │     ├─ Blur
│     │     └─ Black Segments
│     │        └─ When Black Segments is not None:
│     │           └─ Timing
│     ├─ Parallax
│     └─ Hover Mode
└─ Flash Mode
   └─ When Flash Mode is ON:
      ├─ Flash Duration
      └─ Flash Interval
```

---

## 4. Feature Descriptions

### 4.1 Custom Board (3D Mode)

When enabled, the board switches from lichess's standard 2D board to a custom 3D rendered version.

**What changes:**
- Board rendered in 3D with depth and shadows
- Can adjust viewing angle with Parallax
- Can enable gentle rotation with Hover Mode
- Pieces can have different visual styles
- Drag-and-drop still works normally

**When to use:**
- Want a different visual perspective
- Training with angled views
- Using obfuscation features (requires Custom Board)

### 4.2 Obfuscations

Training features that hide or obscure the board to increase difficulty.

#### Piece Styles
Change how pieces appear:
- **icons** - Normal chess piece symbols (clearest)
- **3d** - Three-dimensional chess pieces
- **checker** - Black/white checkered cylinders (harder to distinguish)
- **checker-grey** - Grey checkered cylinders (very hard to distinguish)
- **blindfold** - Pieces completely invisible (hardest)

#### Blur
Blurs the entire board making pieces harder to see. Ranges from no blur (0px) to heavy blur (8px).

#### Black Segments
Covers portions of the board with dark overlays. The board is divided into 4 quadrants:
- **Top-left** (a-d files, ranks 5-8)
- **Top-right** (e-h files, ranks 5-8)
- **Bottom-left** (a-d files, ranks 1-4)
- **Bottom-right** (e-h files, ranks 1-4)

**Coverage patterns:**
- **1/4** - Only 1 quadrant visible, rotates to show different quadrants
- **1/2** - Only 2 quadrants visible (diagonal or adjacent), rotates through patterns
- **3/4** - Only 1 quadrant hidden, rotates which one is visible
- **4/4** - Entire board covered (extreme challenge)

The rotation timing determines how often the pattern changes.

### 4.3 Flash Mode

Memory training mode where the board is mostly hidden.

**How it works:**
1. After each move, the board appears briefly (flash duration)
2. Then the board hides behind a black overlay
3. Board also flashes automatically at the flash interval, even without moves
4. Forces you to remember piece positions between flashes

**Training progression:**
- Start with longer duration (2s) and shorter interval (1s)
- Progress to shorter duration (0.3s) and longer interval (60s)

### 4.4 Dividers

Visual lines that split the board into four equal quadrants. Helps with:
- Visualizing king-side vs queen-side
- Remembering which section pieces are in
- Using the board quadrant commands (`pwk`, `pwq`, `pbk`, `pbq`)

Works in both standard 2D mode and Custom Board 3D mode.

### 4.5 Pieces List

Shows a live list of all pieces and their positions below the controls.

**Display format:**
```
You are: WHITE
Turn: white

WHITE:
pawn: a2, b2, c2, d2, e2, f2, g2, h2
knight: b1, g1
bishop: c1, f1
rook: a1, h1
queen: d1
king: e1

BLACK:
pawn: a7, b7, c7, d7, e7, f7, g7, h7
knight: b8, g8
bishop: c8, f8
rook: a8, h8
queen: d8
king: e8
```

Updates automatically as pieces move.

### 4.6 Parallax

Changes the viewing angle of the 3D board. Only works when Custom Board is enabled.

**Angles:**
- **0°** - Overhead view (looks like a normal flat board)
- **20°-50°** - Slight tilt, easier to see depth
- **60°-80°** - Strong perspective, more challenging

Higher angles make the board harder to read but give better 3D effect.

### 4.7 Hover Mode

Makes the 3D board gently oscillate and rotate. Only works when Custom Board is enabled.

**Modes:**
- **off** - Board stays still
- **small** - Gentle floating motion
- **large** - More noticeable movement
- **super** - Strong oscillation

Purely aesthetic - doesn't affect gameplay.

### 4.8 Speech Synthesis

The speech commands read piece positions aloud:

**Example spoken output:**
- `pa` (all pieces): "a2 white pawn ... b2 white pawn ... b1 white knight..."
- Multiple same-type pieces: "white pawns on a2, b2, c2, d2, e2, f2, g2, h2"

Adjust speaking speed with the Speak Rate control. Stop speaking anytime with `pss`.

### 4.9 Annotations

Draw temporary visual aids on the board:
- **Circles** highlight important squares
- **Arrows** show threats, plans, or piece movement

Drawings appear in red and overlay the board. They persist until you draw something new.

Works in both 2D and 3D modes.

---

## 5. Page Interaction & DOM Elements

This section describes how the userscript interacts with the lichess page.

### 5.1 Command Input

**Input Element:** `.keyboard-move input`
- All keyboard commands are typed into lichess's move input field
- Commands starting with `p` execute immediately when fully typed
- Commands starting with `-` execute immediately when fully typed
- Input field clears automatically after command executes
- Normal chess moves (e.g., `e2e4`) still work as expected

### 5.2 Board Elements

**Board Container:** `cg-container`
- Main container for the chessboard
- Flash mode overlays are appended here
- Drawing SVGs are appended here

**Board Element:** `cg-board`
- Contains the chess board and pieces
- Not marked with `.userscript-custom-board` class
- Dividers (2D mode) are appended as SVG children

**Piece Elements:** `piece`
- Individual chess pieces on the board
- Class format: `{color} {type}` (e.g., `white pawn`, `black knight`)
- Position read from `style.transform` property (e.g., `translate(39px, 58.5px)`)

**Coordinates Element:** `coords`
- Shows file/rank labels around board
- Class `black` indicates board is flipped (user playing black)
- No `black` class means user playing white

### 5.3 Reading Piece Positions

To get piece positions from the DOM:

1. **Find all pieces:** `document.querySelectorAll('cg-board:not(.userscript-custom-board) piece')`

2. **Extract piece type and color from class:**
   - Pattern: `{color} {type}` or `{color} {type} anim` (during animation)
   - Example: `"white pawn"` → color: `"white"`, type: `"pawn"`

3. **Extract pixel position from transform:**
   - Read `piece.style.transform` property
   - Pattern: `translate(Xpx, Ypx)` or `translate(Xpx)`
   - Example: `"translate(39px, 58.5px)"` → x: 39, y: 58.5

4. **Calculate square size:**
   - Get board width: `document.querySelector('cg-board:not(.userscript-custom-board)').offsetWidth`
   - Divide by 8: `squareSize = boardWidth / 8`

5. **Convert pixels to column/row (0-7):**
   - `col = Math.round(xPixels / squareSize)`
   - `row = Math.round(yPixels / squareSize)`

6. **Flip coordinates based on player color:**
   - If playing white: `row = 7 - row` (flip vertically)
   - If playing black: `col = 7 - col` (flip horizontally)

7. **Convert to chess notation:**
   - Column: `'abcdefgh'[col]`
   - Row: `row + 1` (1-8)
   - Result: e.g., `"e2"`

### 5.4 UI Button Container

**Parent Element:** `.keyboard-move`
- The userscript's button container is inserted after the move input field
- All control buttons are rendered inside this container

**Container Structure:**
```
.keyboard-move
├─ input (lichess move input)
└─ (button container created by userscript)
    ├─ Command buttons
    ├─ Custom board buttons (nested)
    ├─ Board modification buttons (nested)
    ├─ Obfuscation buttons (nested)
    ├─ Black segments buttons (nested)
    └─ Flash mode buttons (nested)
```

**Underboard Element:** `.analyse__underboard`
- If this element exists, it's moved inside the button container
- Ensures userscript controls appear above analysis board controls

### 5.5 3D Canvas Placement

When Custom Board is enabled:

**Canvas Element:** `<canvas>` (no specific class)
- Created dynamically when Custom Board is enabled
- Positioned absolutely to overlay `cg-board`
- Same dimensions as the board element
- Z-index allows interaction (pieces can be clicked/dragged)

**Canvas Parent:** Appended to `cg-container`
- Sits alongside `cg-board` in the container
- Positioned to exactly cover the board

### 5.6 Visual Effects Elements

**2D Dividers:** `cg-board svg.userscript-dividers`
- SVG element appended to `cg-board`
- Contains horizontal and vertical line elements
- Removed when Custom Board is enabled (replaced with 3D dividers)

**Drawings:** `cg-container svg.userscript-drawings`
- SVG element appended to `cg-container`
- Contains circles and arrows from drawing commands
- Cleared when new drawing command is issued

**Flash Overlay:** `.userscript-flash-overlay`
- Div appended to `cg-container`
- Black background, 100% width/height
- High z-index (1000) to cover everything
- Toggled between visible/hidden for flash effect

**Pieces List Box:** `.pieces-list-box`
- Div inserted after the Pieces List button
- Contains formatted text of all piece positions
- Visible only when Pieces List is enabled

### 5.7 Detecting Player Color

**Method:** Check for `black` class on `coords` element
```
coords = document.querySelector('coords')
isPlayingWhite = !coords.classList.contains('black')
```

If `black` class present → user is playing black  
If `black` class absent → user is playing white

### 5.8 Detecting Board Changes

The userscript uses `MutationObserver` to detect when pieces move:

**Observed Element:** `cg-board`
**Observed Changes:**
- `childList: true` - Pieces added/removed
- `attributes: true` - Piece styles changed (position changes)
- `subtree: true` - All descendants monitored

**What triggers updates:**
- Piece position changes (style.transform modified)
- Pieces added to board (promotion, setup)
- Pieces removed from board (capture)
- Board replaced entirely (page navigation)

---

## 6. Settings Persistence

All your settings are saved automatically:
- Saved to browser storage after every change
- Restored when you reload the page
- Persists across different lichess pages
- Separate from lichess's own settings

**Storage Location:** `localStorage`  
**Storage Key:** `lichess-board-speaker-settings`  
**Storage Format:** JSON object with 14 setting values

---

## 7. Training Workflows

### Beginner Blindfold Training
1. Enable **Pieces List** to see all positions
2. Enable **Dividers** to understand board sections
3. Practice with speech commands: `pwk`, `pwq`, `pbk`, `pbq`
4. Try to visualize the board while hearing positions

### Intermediate Training
1. Enable **Custom Board** + **Obfuscations**
2. Set **Piece Style** to `checker` (pieces harder to identify)
3. Add **Blur** at 2-3px
4. Use speech commands to verify positions

### Advanced Training
1. Enable **Flash Mode**
2. Set **Flash Duration** to 0.5s
3. Set **Flash Interval** to 10s
4. Between flashes, rely on memory

### Extreme Challenge
1. Enable **Custom Board** + **Obfuscations**
2. Set **Piece Style** to `blindfold` (invisible)
3. Enable **Black Segments** at `3/4` with `Don't rotate`
4. Enable **Flash Mode** with 0.3s duration, 60s interval
5. Play entirely from memory with occasional glimpses

### Custom Angle Practice
1. Enable **Custom Board**
2. Set **Parallax** to 60°-80°
3. Practice reading positions from non-standard angles
4. Builds mental rotation skills

---

## 8. Tips & Tricks

### Speech Commands
- Use quadrant commands (`pwk`, `pwq`, etc.) to check specific board areas quickly
- `pss` stops lengthy speech if you want to interrupt

### Flash Mode
- Start with longer durations and work down gradually
- The automatic interval helps you practice periodic position refresh
- Combine with Pieces List initially to verify your memory

### Black Segments
- `1/4` rotating is good for practicing one quadrant at a time
- `3/4` is harder than `1/4` because you need to remember the hidden area
- `Don't rotate` helps focus on specific board sections

### Custom Board + Parallax
- 40°-50° gives good depth perception without being too extreme
- Higher angles (65°+) are challenging but good for advanced training
- Hover Mode is mostly aesthetic but can make positions slightly harder to read

### Obfuscations
- Start with `checker` pieces before moving to `blindfold`
- Blur can be combined with other obfuscations for extra difficulty
- `checker-grey` is harder than regular `checker` because pieces look identical

### Pieces List
- Keep it open while learning speech commands
- Use it to verify what you think you heard
- Eventually practice without it to build visualization

---

## 9. Known Behaviors

### Navigation Between Pages
- Settings persist when navigating between puzzles, analysis, games
- Board re-initializes automatically when page changes
- Slight delay (< 1 second) when switching pages with Custom Board enabled

### Flash Mode Timing
- Flash duration countdown resets on each move
- If you move before duration expires, board shows again
- Automatic flash interval also resets after each move

### Black Segments Rotation
- Rotation counter continues even if you change settings
- Pattern doesn't reset when you change timing
- Refreshing the page resets the rotation counter

### Custom Board Performance
- 3D rendering may lag slightly on older devices
- Hover Mode uses more resources than static view
- Turning off Hover Mode improves performance

### Blur + Piece Styles
- Blur affects the entire board, not just pieces
- Works with all piece styles including blindfold (though less useful)
- High blur (6-8px) can make piece colors hard to distinguish

### Speech + Move Input
- Commands typed into move input don't interfere with normal moves
- Commands execute immediately when fully typed
- Move input clears after command executes

---

## 10. Browser Compatibility

**Fully Supported:**
- Chrome + Tampermonkey
- Firefox + Tampermonkey/Violentmonkey
- Edge + Tampermonkey

**Requirements:**
- Userscript extension installed
- WebGL support (for Custom Board feature)
- Web Speech API support (for speech commands)

**Not supported:**
- Mobile browsers (userscripts not available)
- Safari (limited userscript support)

---

## 11. Summary of All Controls

| Feature | Command | Type | UI Element | Visible When | Purpose |
|---------|---------|------|------------|--------------|---------|
| Speak Quadrants | `pwk`, `pwq`, `pbk`, `pbq` | Action | Buttons (row) | Always | Speaks aloud piece positions in one quadrant of the board (king-side or queen-side for white or black) |
| Speak All/Color | `pa`, `pww`, `pbb` | Action | Buttons (row) | Always | Speaks aloud all pieces, or all pieces of one color |
| Speak Rate | `psr` | Setting | Dropdown (inline) | Always | Controls how fast piece positions are spoken (0.2x to 1.2x) |
| Stop Speech | `pss` | Action | Button (inline) | Always | Immediately stops any in-progress speech |
| Pieces List | `pl` | Toggle | Button | Always | Shows/hides a text list of all pieces and their positions below the controls |
| Annotate Board | `p-annotate` | Action | Button | Always | Draws circles and arrows on the board to mark squares and show relationships |
| Dividers | `pdiv` | Toggle | Button | Always | Shows/hides lines dividing the board into four quadrants for visualization |
| Custom Board | `pcb` | Toggle | Button | Always | Replaces the standard 2D board with a 3D rendered version using Three.js |
| Obfuscations | `pob` | Toggle | Button (nested) | Custom Board ON | Enables piece style, blur, and black segment controls for blindfold training |
| Piece Style | `pps` | Setting | Dropdown (nested) | Obfuscations ON | Changes piece appearance: icons, 3d, checker, checker-grey, or blindfold (invisible) |
| Blur | `pblur` | Setting | Dropdown (nested) | Obfuscations ON | Applies gaussian blur to the entire board (0px to 8px) |
| Black Segments | `pbs` | Setting | Dropdown (nested) | Obfuscations ON | Covers 1-4 quadrants of the board with dark overlays to hide portions |
| BS Timing | `pbst` | Setting | Dropdown (nested) | Black Segments ≠ None | Controls how often covered quadrants rotate (10s, 30s, 60s, or fixed) |
| Parallax | `ppx` | Setting | Dropdown (nested) | Custom Board ON | Tilts the 3D board viewing angle from 0° (overhead) to 80° (steep perspective) |
| Hover Mode | `phv` | Setting | Dropdown (nested) | Custom Board ON | Makes the 3D board gently oscillate/rotate (off, small, large, super) |
| Flash Mode | `pfm` | Toggle | Button | Always | Hides the board behind a black overlay, briefly revealing it after each move |
| Flash Duration | `pfd` | Setting | Dropdown (nested) | Flash Mode ON | How long the board stays visible during a flash (100ms to 2000ms) |
| Flash Interval | `pfi` | Setting | Dropdown (nested) | Flash Mode ON | Time between automatic flashes even when no moves are made (0.3s to 60s) |
| Draw | `-<squares>` | Action | Keyboard only | Always | Draws circles on squares and arrows between squares using `-e4` or `-e2e4` syntax |

---

**End of Specification**
