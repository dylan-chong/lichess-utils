// DOM selectors enum
export enum DomSelector {
  BOARD = 'cg-board',
  BOARD_NO_CUSTOM = 'cg-board:not(.userscript-custom-board)',
  COORDS = 'coords',
  PIECE = 'piece',
  CONTAINER = 'cg-container',
  KEYBOARD_MOVE = '.keyboard-move',
  KEYBOARD_INPUT = '.keyboard-move input',
}

// CSS classes enum
export enum CssClass {
  BLACK = 'black',
  USERSCRIPT_DIVIDERS = 'userscript-dividers',
  USERSCRIPT_DRAWINGS = 'userscript-drawings',
  USERSCRIPT_FLASH = 'userscript-flash-overlay',
}

// CSS display values enum
export enum CssDisplay {
  BLOCK = 'block',
  NONE = 'none',
}
