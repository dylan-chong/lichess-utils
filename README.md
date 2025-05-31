# lichess-utils

## lichess-board-speaker

Script to make it easy to make the site speak the pieces on the board, or within a specific quadrant.

Supports text input to trigger these commands (desktop).

Supports buttons to trigger the same commands (mobile, desktop).

![screenshot](./screenshot.png)

### Installation

- add this script using using tampermonkey (chrome, firefox) or userscripts (safari)
- on lichess.org
    - enable keyboard move input
    - you'll probably want to enable move narration
    - go to a puzzle
    - turn on blindfold mode
- type into the move input box `pcs wk` to read out pieces on the white-kingside quadrant
    - (the 'invalid input' sound plays when you type, but just ignore that sound)
- profit from blindfold chess puzzle practice!
