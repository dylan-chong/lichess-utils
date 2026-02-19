# lichess-utils

## lichess-board-speaker

Script to help you train blindfold chess.

- Speaks out the pieces on the board: "white pawns on a2 b2. a1 white rook".
- Supports text input to trigger these commands (desktop).
- Supports buttons to trigger the same commands (mobile, desktop).
- Supports blindfold game and puzzle training with various semi-blindfold settings

Mobile friendly (browser only of course)

![screenshot](./screenshot.png)

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
